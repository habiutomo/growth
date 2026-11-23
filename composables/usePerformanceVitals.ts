/** Report browser Web Vitals to the same consent-aware analytics boundary. */
export function usePerformanceVitals() {
  const { track } = useAnalytics()

  onMounted(() => {
    const report = (name: string, value: number, rating: string) => {
      track('web_vital', { metric_name: name, metric_value: Math.round(value * 100) / 100, metric_rating: rating })
    }
    const observe = (type: string, callback: (entries: PerformanceEntry[]) => void, options?: PerformanceObserverInit) => {
      try {
        const observer = new PerformanceObserver(list => callback(list.getEntries()))
        observer.observe({ type, buffered: true, ...options })
      } catch { /* Metric is unavailable in this browser. */ }
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navigation) report('TTFB', navigation.responseStart, navigation.responseStart <= 800 ? 'good' : navigation.responseStart <= 1800 ? 'needs_improvement' : 'poor')

    let lcp = 0
    observe('largest-contentful-paint', entries => {
      lcp = entries.at(-1)?.startTime || lcp
      report('LCP', lcp, lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs_improvement' : 'poor')
    })

    let cls = 0
    observe('layout-shift', entries => {
      for (const entry of entries as PerformanceEntry[] & { value?: number; hadRecentInput?: boolean }[]) {
        if (!entry.hadRecentInput) cls += entry.value || 0
      }
      report('CLS', cls, cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs_improvement' : 'poor')
    })

    let inp = 0
    observe('event', entries => {
      for (const entry of entries) inp = Math.max(inp, (entry as PerformanceEventTiming).duration)
      report('INP_candidate', inp, inp <= 200 ? 'good' : inp <= 500 ? 'needs_improvement' : 'poor')
    }, { durationThreshold: 40 })
  })
}
