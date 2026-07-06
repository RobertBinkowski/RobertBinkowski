/*
 * Post-build smoke test.
 *
 * Serves the production build (dist/) with `vite preview`, loads it in a real
 * headless browser, and fails if the page does not load correctly. It focuses
 * on the class of bug that previously slipped into production: the compiled
 * SCSS not being applied (missing/empty stylesheets, 404'd CSS, or the theme
 * variables never reaching the DOM).
 *
 * The deploy workflow runs this between `build` and the Pages upload, so a
 * broken build is never published.
 */
import { preview } from 'vite'
import { chromium } from 'playwright'

// Values that only exist once the compiled SCSS theme (src/style/_theme.scss)
// has loaded and applied. If SCSS is missing these will not match.
const EXPECTED_BODY_BACKGROUND = 'rgb(235, 235, 235)' // --color-bg: #ebebeb
const EXPECTED_SECONDARY = '#005b90' // --color-secondary

const failures = []
const fail = (message) => failures.push(message)

let server
let browser

try {
  server = await preview({
    logLevel: 'warn',
    preview: { host: '127.0.0.1', strictPort: false },
  })

  const url = server.resolvedUrls?.local?.[0]
  if (!url) {
    throw new Error('Could not determine the vite preview URL.')
  }
  console.log(`Serving build at ${url}`)

  browser = await chromium.launch()
  const page = await browser.newPage()

  const failedResponses = []
  page.on('response', (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${response.status()} ${response.url()}`)
    }
  })

  const requestFailures = []
  page.on('requestfailed', (request) => {
    requestFailures.push(`${request.failure()?.errorText ?? 'failed'} ${request.url()}`)
  })

  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })

  if (!response || !response.ok()) {
    throw new Error(`Document did not load (status ${response?.status() ?? 'no response'}).`)
  }

  const styleInfo = await page.evaluate(() => {
    let ruleCount = 0
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        ruleCount += sheet.cssRules.length
      } catch {
        // Cross-origin stylesheet — can't inspect rules, ignore.
      }
    }

    return {
      sheetCount: document.styleSheets.length,
      ruleCount,
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      secondary: getComputedStyle(document.documentElement)
        .getPropertyValue('--color-secondary')
        .trim(),
    }
  })

  const failedAssets = [...failedResponses, ...requestFailures]
  const failedStylesheets = failedAssets.filter((entry) => entry.includes('.css'))

  if (failedStylesheets.length) {
    fail(`Stylesheet request(s) failed:\n    ${failedStylesheets.join('\n    ')}`)
  }
  if (failedAssets.length) {
    fail(`Asset request(s) failed:\n    ${failedAssets.join('\n    ')}`)
  }
  if (styleInfo.sheetCount === 0 || styleInfo.ruleCount === 0) {
    fail(
      `No CSS was applied (stylesheets=${styleInfo.sheetCount}, rules=${styleInfo.ruleCount}). ` +
        'The compiled SCSS did not load.',
    )
  }
  if (!styleInfo.secondary) {
    fail('SCSS theme variable --color-secondary is missing — compiled SCSS did not load.')
  } else if (styleInfo.secondary.toLowerCase() !== EXPECTED_SECONDARY) {
    fail(`--color-secondary was "${styleInfo.secondary}", expected "${EXPECTED_SECONDARY}".`)
  }
  if (styleInfo.bodyBackground !== EXPECTED_BODY_BACKGROUND) {
    fail(
      `Body background was "${styleInfo.bodyBackground}", expected "${EXPECTED_BODY_BACKGROUND}" ` +
        '— SCSS styles were not applied.',
    )
  }
  if (pageErrors.length) {
    fail(`Uncaught page error(s):\n    ${pageErrors.join('\n    ')}`)
  }

  if (failures.length) {
    console.error('\n✗ Smoke test failed:')
    for (const message of failures) {
      console.error(`  - ${message}`)
    }
    console.error(`\n  Diagnostics: ${JSON.stringify(styleInfo)}`)
    process.exitCode = 1
  } else {
    console.log('✓ Smoke test passed — site loads and compiled SCSS is applied.')
    console.log(
      `  stylesheets=${styleInfo.sheetCount}, rules=${styleInfo.ruleCount}, ` +
        `body background=${styleInfo.bodyBackground}, --color-secondary=${styleInfo.secondary}`,
    )
  }
} catch (error) {
  console.error(`\n✗ Smoke test errored: ${error.message}`)
  process.exitCode = 1
} finally {
  await browser?.close()
  await server?.httpServer?.close()
}
