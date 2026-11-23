const gaId = process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || ''

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      titleTemplate: '%s · Northstar',
      meta: [
        { name: 'theme-color', content: '#f7f6f2' },
        { name: 'description', content: 'Northstar membantu tim kecil tumbuh dengan strategi, eksperimen, dan insight yang jelas.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap' },
      ],
      script: gaId ? [
        { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}` },
        { innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied'});gtag('js',new Date());gtag('config','${gaId.replace(/[^A-Z0-9-]/gi, '')}',{send_page_view:false});` },
      ] : [],
    },
  },
  runtimeConfig: {
    leadWebhookUrl: process.env.LEAD_WEBHOOK_URL || '',
    leadWebhookToken: process.env.LEAD_WEBHOOK_TOKEN || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://northstar.example',
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || '',
      leadCaptureConnected: Boolean(process.env.LEAD_WEBHOOK_URL),
    },
  },
})
