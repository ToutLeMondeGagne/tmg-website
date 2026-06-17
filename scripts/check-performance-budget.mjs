import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { basename } from 'node:path'
import { gzipSync } from 'node:zlib'

const distUrl = new URL('../dist/', import.meta.url)
const assetsUrl = new URL('assets/', distUrl)
const indexUrl = new URL('index.html', distUrl)

const budgets = {
  initialGzipKb: 175,
  totalGzipKb: 260,
  largestChunkGzipKb: 95,
}

function toKb(bytes) {
  return bytes / 1024
}

function formatKb(bytes) {
  return `${toKb(bytes).toFixed(1)} KB`
}

function readInitialScriptPaths() {
  const html = readFileSync(indexUrl, 'utf8')
  const scriptPaths = new Set()
  const assetPattern = /(?:src|href)="\/?(assets\/[^"]+\.js)"/g

  for (const match of html.matchAll(assetPattern)) {
    scriptPaths.add(match[1])
  }

  return scriptPaths
}

if (!existsSync(distUrl) || !existsSync(assetsUrl) || !existsSync(indexUrl)) {
  console.error('Build output missing. Run `npm run build` before `npm run perf:budget`.')
  process.exit(1)
}

const initialScriptPaths = readInitialScriptPaths()
const chunks = readdirSync(assetsUrl)
  .filter((file) => file.endsWith('.js'))
  .map((file) => {
    const fileUrl = new URL(file, assetsUrl)
    const raw = readFileSync(fileUrl)
    const gzipBytes = gzipSync(raw).byteLength
    const rawBytes = statSync(fileUrl).size

    return {
      file,
      assetPath: `assets/${file}`,
      rawBytes,
      gzipBytes,
      isInitial: initialScriptPaths.has(`assets/${file}`),
    }
  })

const initialGzipBytes = chunks
  .filter((chunk) => chunk.isInitial)
  .reduce((total, chunk) => total + chunk.gzipBytes, 0)
const totalGzipBytes = chunks.reduce((total, chunk) => total + chunk.gzipBytes, 0)
const largestChunk = chunks.reduce(
  (largest, chunk) => (chunk.gzipBytes > largest.gzipBytes ? chunk : largest),
  { file: 'none', gzipBytes: 0, rawBytes: 0 },
)

console.log('Performance budget')
console.log(`- Initial JS gzip: ${formatKb(initialGzipBytes)} / ${budgets.initialGzipKb} KB`)
console.log(`- Total JS gzip: ${formatKb(totalGzipBytes)} / ${budgets.totalGzipKb} KB`)
console.log(
  `- Largest JS chunk: ${basename(largestChunk.file)} ${formatKb(largestChunk.gzipBytes)} / ${budgets.largestChunkGzipKb} KB`,
)

const failures = []

if (toKb(initialGzipBytes) > budgets.initialGzipKb) {
  failures.push('initial JS gzip budget exceeded')
}

if (toKb(totalGzipBytes) > budgets.totalGzipKb) {
  failures.push('total JS gzip budget exceeded')
}

if (toKb(largestChunk.gzipBytes) > budgets.largestChunkGzipKb) {
  failures.push('largest JS chunk budget exceeded')
}

if (failures.length > 0) {
  console.error(`Performance budget failed: ${failures.join(', ')}.`)
  process.exit(1)
}

console.log('Performance budget OK.')
