export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  const config = useRuntimeConfig()
  const lastmod = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${config.public.siteUrl}/</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>`
})
