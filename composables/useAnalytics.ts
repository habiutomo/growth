type EventPayload = Record<string, string | number | boolean | null>

/** One event boundary for GA4, GTM dataLayer, and first-party integrations. */
export function useAnalytics() {
  function track(event: string, payload: EventPayload = {}) {
    if (import.meta.server) return
    const detail = { event, ...payload, timestamp: new Date().toISOString() }
    window.dispatchEvent(new CustomEvent('northstar:analytics', { detail }))
    const dataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer
    dataLayer?.push(detail)
    if (import.meta.dev) console.info('[analytics]', detail)
  }

  return { track }
}
