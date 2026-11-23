export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  const config = useRuntimeConfig()
  return `User-agent: *\nAllow: /\nDisallow: /checkout\nDisallow: /api/\nSitemap: ${config.public.siteUrl}/sitemap.xml\n`
})
