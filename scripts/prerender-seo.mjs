import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_LOCATION,
  SITE_NAME,
  SITE_REGION,
  getSeoForPath,
  getStructuredData,
  seoPages,
} from '../src/data/seo.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(currentDir, '..')
const distDir = path.join(projectRoot, 'dist')
const templatePath = path.join(distDir, 'index.html')
const distAdminConfigPath = path.join(distDir, 'api', 'admin-config.php')
const distPartnerStorePath = path.join(distDir, 'api', 'private', 'partners.json')
const distSiteContentPath = path.join(distDir, 'content', 'site-content.json')

function escapeAttribute(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeJsonForScript(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

function replaceOrInsertHeadTag(html, pattern, tag) {
  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }

  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function setMetaName(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeAttribute(content)}" />`
  const pattern = new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'i')

  return replaceOrInsertHeadTag(html, pattern, tag)
}

function setMetaProperty(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeAttribute(content)}" />`
  const pattern = new RegExp(`<meta\\s+property="${property}"[^>]*>`, 'i')

  return replaceOrInsertHeadTag(html, pattern, tag)
}

function setCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeAttribute(href)}" />`

  return replaceOrInsertHeadTag(html, /<link\s+rel="canonical"[^>]*>/i, tag)
}

function setJsonLd(html, routePath, seo) {
  const structuredData = getStructuredData(routePath, seo)
  const tag = `<script type="application/ld+json" id="tmg-structured-data">${escapeJsonForScript(structuredData)}</script>`

  return replaceOrInsertHeadTag(
    html,
    /<script\s+type="application\/ld\+json"\s+id="tmg-structured-data"[^>]*>[\s\S]*?<\/script>/i,
    tag,
  )
}

function applySeo(html, routePath) {
  const seo = getSeoForPath(routePath)
  const keywords = seo.keywords?.join(', ') || ''

  let nextHtml = html
    .replace(/<html\s+lang="[^"]*">/i, `<html lang="${SITE_LANGUAGE}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(seo.title)}</title>`)

  nextHtml = setCanonical(nextHtml, seo.canonicalUrl)
  nextHtml = setMetaName(nextHtml, 'description', seo.description)
  nextHtml = setMetaName(nextHtml, 'keywords', keywords)
  nextHtml = setMetaName(nextHtml, 'robots', seo.robots)
  nextHtml = setMetaName(nextHtml, 'author', SITE_NAME)
  nextHtml = setMetaName(nextHtml, 'geo.region', SITE_REGION)
  nextHtml = setMetaName(nextHtml, 'geo.placename', SITE_LOCATION)
  nextHtml = setMetaProperty(nextHtml, 'og:locale', SITE_LOCALE)
  nextHtml = setMetaProperty(nextHtml, 'og:type', 'website')
  nextHtml = setMetaProperty(nextHtml, 'og:site_name', SITE_NAME)
  nextHtml = setMetaProperty(nextHtml, 'og:title', seo.title)
  nextHtml = setMetaProperty(nextHtml, 'og:description', seo.description)
  nextHtml = setMetaProperty(nextHtml, 'og:url', seo.canonicalUrl)
  nextHtml = setMetaProperty(nextHtml, 'og:image', seo.ogImage)
  nextHtml = setMetaProperty(nextHtml, 'og:image:secure_url', seo.ogImage)
  nextHtml = setMetaProperty(nextHtml, 'og:image:alt', `${SITE_NAME} - sites web et marketing`)
  nextHtml = setMetaName(nextHtml, 'twitter:card', 'summary_large_image')
  nextHtml = setMetaName(nextHtml, 'twitter:title', seo.title)
  nextHtml = setMetaName(nextHtml, 'twitter:description', seo.description)
  nextHtml = setMetaName(nextHtml, 'twitter:image', seo.ogImage)
  nextHtml = setMetaName(nextHtml, 'twitter:image:alt', `${SITE_NAME} - sites web et marketing`)

  return setJsonLd(nextHtml, routePath, seo)
}

function routeOutputPath(routePath) {
  if (routePath === '/') {
    return templatePath
  }

  return path.join(distDir, ...routePath.slice(1).split('/'), 'index.html')
}

const templateHtml = await readFile(templatePath, 'utf8')
const routes = Object.keys(seoPages)

await Promise.all(
  routes.map(async (routePath) => {
    const outputPath = routeOutputPath(routePath)

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, applySeo(templateHtml, routePath))
  }),
)

await rm(distAdminConfigPath, { force: true })
await rm(distPartnerStorePath, { force: true })
await rm(distSiteContentPath, { force: true })

console.log(`SEO prerender complete: ${routes.length} routes generated.`)
