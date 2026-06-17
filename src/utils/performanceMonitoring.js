const GOOD = 'good'
const NEEDS_IMPROVEMENT = 'needs-improvement'
const POOR = 'poor'

function getRating(name, value) {
  const thresholds = {
    LCP: [2500, 4000],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    JS: [250, 500],
    LONG_TASK: [200, 600],
  }
  const [good, poor] = thresholds[name] ?? [0, 0]

  if (value <= good) {
    return GOOD
  }

  return value <= poor ? NEEDS_IMPROVEMENT : POOR
}

function scheduleIdle(callback) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 2500 })
    return
  }

  window.setTimeout(callback, 1200)
}

function createMetricReporter() {
  window.__TMG_WEB_VITALS__ = window.__TMG_WEB_VITALS__ ?? []

  return function reportMetric(name, value, detail = {}) {
    const metric = {
      name,
      value: Number(value.toFixed(name === 'CLS' ? 4 : 0)),
      rating: getRating(name, value),
      path: window.location.pathname,
      timestamp: Math.round(performance.now()),
      ...detail,
    }

    window.__TMG_WEB_VITALS__.push(metric)
    window.dispatchEvent(new CustomEvent('tmg:web-vital', { detail: metric }))

    if (import.meta.env.DEV) {
      console.info('[TMG performance]', metric)
    }
  }
}

function observePerformanceEntry(type, callback, options = {}) {
  if (
    typeof PerformanceObserver === 'undefined' ||
    !PerformanceObserver.supportedEntryTypes?.includes(type)
  ) {
    return null
  }

  try {
    const observer = new PerformanceObserver(callback)
    observer.observe({ type, buffered: true, ...options })
    return observer
  } catch {
    return null
  }
}

function reportJavaScriptWeight(reportMetric) {
  const scripts = performance
    .getEntriesByType('resource')
    .filter((entry) => entry.initiatorType === 'script' || entry.name.endsWith('.js'))

  const transferSize = scripts.reduce((total, entry) => total + (entry.transferSize || 0), 0)
  const encodedSize = scripts.reduce((total, entry) => total + (entry.encodedBodySize || 0), 0)
  const sizeInKb = (transferSize || encodedSize) / 1024

  if (sizeInKb > 0) {
    reportMetric('JS', sizeInKb, {
      files: scripts.length,
      unit: 'KB',
    })
  }
}

export function initPerformanceMonitoring() {
  if (typeof window === 'undefined' || window.__TMG_PERFORMANCE_MONITORING__) {
    return
  }

  window.__TMG_PERFORMANCE_MONITORING__ = true
  const reportMetric = createMetricReporter()
  let clsValue = 0
  let inpValue = 0
  let longestTask = 0

  observePerformanceEntry('largest-contentful-paint', (list) => {
    const entries = list.getEntries()
    const lastEntry = entries.at(-1)

    if (lastEntry) {
      reportMetric('LCP', lastEntry.startTime, {
        element: lastEntry.element?.tagName?.toLowerCase(),
      })
    }
  })

  observePerformanceEntry('layout-shift', (list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    }

    reportMetric('CLS', clsValue)
  })

  observePerformanceEntry(
    'event',
    (list) => {
      for (const entry of list.getEntries()) {
        inpValue = Math.max(inpValue, entry.duration || 0)
      }

      if (inpValue > 0) {
        reportMetric('INP', inpValue)
      }
    },
    { durationThreshold: 40 },
  )

  observePerformanceEntry('longtask', (list) => {
    for (const entry of list.getEntries()) {
      longestTask = Math.max(longestTask, entry.duration || 0)
    }

    if (longestTask > 0) {
      reportMetric('LONG_TASK', longestTask)
    }
  })

  if (document.readyState === 'complete') {
    scheduleIdle(() => reportJavaScriptWeight(reportMetric))
  } else {
    window.addEventListener(
      'load',
      () => scheduleIdle(() => reportJavaScriptWeight(reportMetric)),
      { once: true },
    )
  }
}
