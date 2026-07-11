/**
 * Serves the production build (dist/) with `vite preview`, loads it in a real
 * browser, and verifies the Vue app mounted with the sections defined in
 * src/data/page.js.
 *
 * Run after `npm run build`. Exits non-zero on failure so CI can block deploy.
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'
import { preview } from 'vite'

import { contacts, getHomePageContext, shell } from '../src/data/page.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pageContext = getHomePageContext()

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

async function runChecks(page) {
  const consoleErrors = []
  page.on('pageerror', (error) => consoleErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })

  await page.goto(page.baseURL, { waitUntil: 'load', timeout: 30_000 })

  assert(!(await page.$('#static-shell')), 'Static shell still present — Vue app did not mount.')

  const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily)
  assert(
    bodyFont.toLowerCase().includes('nunito'),
    `Compiled styles not applied (expected Nunito on body, got: ${bodyFont}).`,
  )

  const stylesheetCount = await page.locator('link[rel="stylesheet"]').count()
  assert(stylesheetCount > 0, 'No stylesheets loaded.')

  await assertVisible(page, shell.appRoot, 'App shell')
  await assertVisible(page, shell.navigation, 'Navigation')
  await assertVisible(page, shell.footer, 'Footer')

  if (pageContext.portfolio.ContactSection) {
    for (const contact of contacts) {
      const link = page.locator(`a[href="${contact.link}"]`).first()
      assert(await link.count(), `${contact.name} contact link missing (${contact.link}).`)
    }
  }

  assert(consoleErrors.length === 0, `Browser console errors:\n${consoleErrors.join('\n')}`)
}

async function main() {
  let previewServer

  try {
    const { previewServer: server, url } = await startPreview()
    previewServer = server

    console.log(`Smoke test running against ${url}`)

    const browser = await chromium.launch()
    try {
      const page = await browser.newPage()
      page.setDefaultTimeout(15_000)
      await runChecks(Object.assign(page, { baseURL: url }))
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
})
