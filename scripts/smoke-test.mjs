/**
 * Serves the production build (dist/) with `vite preview`, loads it in a real
 * browser (desktop + mobile), and verifies the Vue app against live content
 * data from src/configurations + src/data.
 *
 * Run after `npm run build`. Exits non-zero on failure so CI can block deploy.
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'
import { createServer, preview } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Matches `$compact-size` in src/style/_variables.scss (hamburger breakpoint). */
const COMPACT_BREAKPOINT = 1024

const VIEWPORTS = {
  desktop: { name: 'desktop', width: 1280, height: 720 },
  mobile: { name: 'mobile', width: 390, height: 844 },
}

async function loadExpectations() {
  // timeline.js (and friends) use Vite path aliases + SVG imports — load via SSR.
  const viteServer = await createServer({
    root,
    configFile: resolve(root, 'vite.config.js'),
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const { getSmokeExpectations } = await viteServer.ssrLoadModule('/src/configurations/smoke.js')
    return getSmokeExpectations()
  } finally {
    await viteServer.close()
  }
}

async function startPreview() {
  const previewServer = await preview({
    root,
    preview: {
      port: 4173,
      strictPort: false,
    },
  })

  const httpServer = previewServer.httpServer
  if (httpServer && !httpServer.listening) {
    await new Promise((resolvePromise, rejectPromise) => {
      httpServer.once('listening', resolvePromise)
      httpServer.once('error', rejectPromise)
    })
  }

  const url = previewServer.resolvedUrls?.local?.[0]
  if (!url) {
    throw new Error('Could not determine the vite preview URL.')
  }

  return { previewServer, url }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function assertVisible(page, selector, label) {
  const element = page.locator(selector).first()
  await element.waitFor({ state: 'visible', timeout: 15_000 })
  assert(await element.isVisible(), `${label} (${selector}) is not visible.`)
}

async function assertHidden(page, selector, label) {
  const count = await page.locator(selector).count()
  assert(count === 0, `${label} (${selector}) should not be rendered.`)
}

async function assertNoHorizontalOverflow(page, viewportName) {
  const overflowed = await page.evaluate(() => {
    const doc = document.documentElement
    return doc.scrollWidth > doc.clientWidth + 1
  })
  assert(!overflowed, `Horizontal overflow detected on ${viewportName}.`)
}

async function assertExternalLink(page, locator, contact, scopeLabel) {
  const label = `${scopeLabel} → ${contact.name}`
  await locator.waitFor({ state: 'visible', timeout: 15_000 })

  const href = await locator.getAttribute('href')
  assert(href === contact.link, `${label}: href should be "${contact.link}", got "${href}".`)

  const target = await locator.getAttribute('target')
  assert(target === '_blank', `${label}: expected target="_blank", got "${target}".`)

  const rel = (await locator.getAttribute('rel')) || ''
  assert(rel.includes('noopener'), `${label}: rel should include noopener, got "${rel}".`)

  // Confirm the control is interactive without navigating off-site (flaky in CI).
  assert(await locator.isEnabled(), `${label}: link should be enabled.`)
}

async function assertWelcomeContent(page, section, welcome) {
  await assertVisible(page, `${section.selector} h1`, 'Welcome heading')

  const heading = await page.textContent(`${section.selector} h1`)
  assert(
    heading?.includes(welcome.name),
    `Welcome heading should include "${welcome.name}". Got: ${heading ?? '(empty)'}`,
  )

  if (welcome.title) {
    const titleText = await page.textContent(`${section.selector} .pill`)
    assert(
      titleText?.includes(welcome.title),
      `Welcome title should include "${welcome.title}". Got: ${titleText ?? '(empty)'}`,
    )
  }
}

async function assertSkillsContent(page, section, featuredSkillNames) {
  assert(featuredSkillNames.length > 0, 'featuredSkills is empty — nothing to assert.')

  for (const skillName of featuredSkillNames) {
    const pill = page
      .locator(`${section.selector} .skill-pill-label`, { hasText: skillName })
      .first()
    await pill.waitFor({ state: 'attached', timeout: 15_000 })
    assert((await pill.count()) > 0, `Skills section should include featured skill "${skillName}".`)
  }

  // Marquee duplicates pills; require at least one rendered pill per featured skill.
  const pillCount = await page.locator(`${section.selector} .skill-pill`).count()
  assert(
    pillCount >= featuredSkillNames.length,
    `Skills section should render at least ${featuredSkillNames.length} pills, found ${pillCount}.`,
  )
}

async function assertTimelineContent(page, section, timelineEntries) {
  assert(timelineEntries.length > 0, 'timeline entries are empty — nothing to assert.')

  const cards = page.locator(`${section.selector} .timelineObject`)
  await cards.first().waitFor({ state: 'visible', timeout: 15_000 })

  const cardCount = await cards.count()
  assert(
    cardCount === timelineEntries.length,
    `Timeline should render ${timelineEntries.length} cards, found ${cardCount}.`,
  )

  for (const entry of timelineEntries) {
    const card = page.locator(`${section.selector} .timelineObject`, {
      has: page.locator('.entry-name', { hasText: entry.organization }),
    })
    await card.first().waitFor({ state: 'visible', timeout: 15_000 })

    const nameText = await card.locator('.entry-name').first().textContent()
    assert(
      nameText?.includes(entry.organization),
      `Timeline should show organization "${entry.organization}". Got: ${nameText ?? '(empty)'}`,
    )

    if (entry.tagline) {
      const taglineText = await card.locator('.entry-tagline').first().textContent()
      assert(
        taglineText?.includes(entry.tagline),
        `Timeline card "${entry.organization}" should show tagline "${entry.tagline}".`,
      )
    }

    if (entry.website) {
      const siteLink = card.locator(`a[href="${entry.website}"]`).first()
      assert(
        (await siteLink.count()) > 0,
        `Timeline card "${entry.organization}" missing website link (${entry.website}).`,
      )
    }

    if (entry.hasLogo) {
      const logo = card.locator('.brand-logo img').first()
      await logo.waitFor({ state: 'visible', timeout: 15_000 })
      const loaded = await logo.evaluate((img) => img.complete && img.naturalWidth > 0)
      assert(loaded, `Logo for "${entry.organization}" failed to load.`)
    }

    for (const role of entry.roles) {
      const roleCard = card.locator(`[data-role-id="${role.id}"]`)
      await roleCard.waitFor({ state: 'visible', timeout: 15_000 })
      const roleTitle = await roleCard.locator('.role-title').textContent()
      assert(
        roleTitle?.includes(role.title),
        `Role "${role.id}" should show title "${role.title}". Got: ${roleTitle ?? '(empty)'}`,
      )
    }
  }
}

async function assertContactSection(page, section, contacts) {
  for (const contact of contacts) {
    const link = page.locator(`${section.selector} a[href="${contact.link}"]`).first()
    await assertExternalLink(page, link, contact, 'Contact section')

    const label = await link.getAttribute('aria-label')
    assert(
      label === contact.name,
      `Contact section link aria-label should be "${contact.name}", got "${label}".`,
    )
  }
}

async function assertNavAndFooterContacts(page, contacts, shell) {
  for (const contact of contacts) {
    const navLink = page.locator(`${shell.navigation} a[href="${contact.link}"]`).first()
    await assertExternalLink(page, navLink, contact, 'Navigation')

    const footerLink = page.locator(`${shell.footer} a[href="${contact.link}"]`).first()
    await assertExternalLink(page, footerLink, contact, 'Footer')
  }
}

async function assertHomeNavigation(page, shell, baseURL) {
  const homeLink = page.locator(`${shell.navigation} a[aria-label="Home"]`).first()
  await assertVisible(page, `${shell.navigation} a[aria-label="Home"]`, 'Home logo link')

  await page
    .locator('#timelineSection')
    .scrollIntoViewIfNeeded()
    .catch(() => {})
  await homeLink.click()
  await page.waitForLoadState('domcontentloaded')

  const url = page.url()
  assert(
    url === baseURL ||
      url === `${baseURL}` ||
      url.replace(/\/$/, '') === baseURL.replace(/\/$/, ''),
    `Home logo should navigate to site root. Got: ${url}`,
  )
}

async function assertMobileMenu(page, shell) {
  const toggle = page.locator(`${shell.navigation} #expand-notification`)
  await toggle.waitFor({ state: 'visible', timeout: 15_000 })

  const nav = page.locator(`${shell.navigation} nav`)
  assert(
    await nav.evaluate((el) => el.classList.contains('nav-closed')),
    'Mobile nav should start closed.',
  )

  await toggle.click()
  await page.waitForFunction(
    () => document.querySelector('#navigation-bar nav')?.classList.contains('nav-open'),
    null,
    { timeout: 5_000 },
  )

  await toggle.click()
  await page.waitForFunction(
    () => document.querySelector('#navigation-bar nav')?.classList.contains('nav-closed'),
    null,
    { timeout: 5_000 },
  )
}

async function assertScrollAndHover(page, expectations) {
  if (!expectations.context.portfolio.TimelineSection) {
    return
  }

  const progress = page.locator(`${expectations.shell.navigation} .progress-bar`)
  const before = await progress.evaluate((el) => el.style.width || '0%')

  await page.locator('#timelineSection').scrollIntoViewIfNeeded()
  await page.waitForFunction(
    (previous) => {
      const width = document.querySelector('#navigation-bar .progress-bar')?.style.width || '0%'
      return width !== '0%' && width !== previous
    },
    before,
    { timeout: 5_000 },
  )

  const row = page.locator('#timelineSection .experience-row').first()
  await row.hover()
  assert(
    await row.evaluate((el) => el.classList.contains('experience-row--active')),
    'Hovering a timeline row should apply the active highlight class.',
  )
}

async function runChecks(page, expectations, viewport) {
  const consoleErrors = []
  const failedRequests = []

  page.on('pageerror', (error) => consoleErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })
  page.on('requestfailed', (request) => {
    const url = request.url()
    if (
      url.startsWith(page.baseURL) ||
      url.startsWith('http://127.0.0.1') ||
      url.startsWith('http://localhost')
    ) {
      failedRequests.push(`${request.failure()?.errorText || 'failed'}: ${url}`)
    }
  })

  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(page.baseURL, { waitUntil: 'load', timeout: 30_000 })

  assert(!(await page.$('#static-shell')), 'Static shell still present — Vue app did not mount.')

  const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily)
  assert(
    bodyFont.toLowerCase().includes('nunito'),
    `Compiled styles not applied (expected Nunito on body, got: ${bodyFont}).`,
  )

  const stylesheetCount = await page.locator('link[rel="stylesheet"]').count()
  assert(stylesheetCount > 0, 'No stylesheets loaded.')

  await assertVisible(page, expectations.shell.appRoot, 'App shell')
  await assertVisible(page, expectations.shell.navigation, 'Navigation')
  await assertVisible(page, expectations.shell.footer, 'Footer')

  for (const section of expectations.expectedSections) {
    await assertVisible(page, section.selector, `${section.key} section`)

    if (section.key === 'welcome') {
      await assertWelcomeContent(page, section, expectations.welcome)
    }

    if (section.key === 'skills') {
      await assertSkillsContent(page, section, expectations.featuredSkillNames)
    }

    if (section.key === 'timeline') {
      await assertTimelineContent(page, section, expectations.timelineEntries)
    }

    if (section.key === 'contact') {
      await assertContactSection(page, section, expectations.contacts)
    }

    for (const rule of section.minCount ?? []) {
      const count = await page.locator(`${section.selector} ${rule.selector}`).count()
      assert(
        count >= rule.count,
        `${section.key} section should have at least ${rule.count} "${rule.selector}" element(s). Found ${count}.`,
      )
    }
  }

  for (const section of expectations.hiddenSections) {
    await assertHidden(page, section.selector, `${section.key} section`)
  }

  await assertNavAndFooterContacts(page, expectations.contacts, expectations.shell)
  await assertNoHorizontalOverflow(page, viewport.name)

  if (viewport.width < COMPACT_BREAKPOINT) {
    await assertMobileMenu(page, expectations.shell)
  } else {
    await assertScrollAndHover(page, expectations)
    await assertHomeNavigation(page, expectations.shell, page.baseURL)
  }

  assert(failedRequests.length === 0, `Failed local asset requests:\n${failedRequests.join('\n')}`)
  assert(consoleErrors.length === 0, `Browser console errors:\n${consoleErrors.join('\n')}`)
}

async function main() {
  let previewServer

  try {
    const expectations = await loadExpectations()
    const { previewServer: server, url } = await startPreview()
    previewServer = server

    console.log(`Smoke test running against ${url}`)
    console.log(
      `Expecting sections: ${expectations.expectedSections.map((section) => section.key).join(', ') || '(none)'}`,
    )
    console.log(
      `Content: ${expectations.featuredSkillNames.length} skills, ${expectations.timelineEntries.length} timeline cards, ${expectations.contacts.length} contacts`,
    )

    const browser = await chromium.launch()
    try {
      for (const viewport of Object.values(VIEWPORTS)) {
        console.log(`— ${viewport.name} (${viewport.width}x${viewport.height})`)
        const page = await browser.newPage()
        page.setDefaultTimeout(15_000)
        try {
          await runChecks(Object.assign(page, { baseURL: url }), expectations, viewport)
        } finally {
          await page.close()
        }
      }
    } finally {
      await browser.close()
    }

    console.log('Smoke test passed.')
  } finally {
    await previewServer?.close()
  }
}

main().catch((error) => {
  console.error('Smoke test failed.')
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
