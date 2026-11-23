type EventPayload = Record<string, string | number | boolean | null>

/** Consent-aware event boundary for GA4, GTM, and first-party listeners. */
export function useAnalytics() {
  function track(event: string, payload: EventPayload = {}) {
    if (import.meta.server) return
    const consent = localStorage.getItem('northstar_analytics_consent') === 'granted'
    const detail = { event, ...payload, timestamp: new Date().toISOString() }

    // First-party events contain only non-identifying context and remain useful in dev.
    window.dispatchEvent(new CustomEvent('northstar:analytics', { detail }))
    if (!consent) return

    const analyticsWindow = window as Window & { dataLayer?: Array<Record<string, unknown>>; gtag?: (...args: unknown[]) => void }
    if (analyticsWindow.gtag) {
      analyticsWindow.gtag('consent', 'update', { analytics_storage: 'granted' })
      analyticsWindow.gtag('event', event, payload)
    }
    else analyticsWindow.dataLayer?.push(detail)
    if (import.meta.dev) console.info('[analytics]', detail)
  }

  return { track }
}
