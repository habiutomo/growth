export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  const config = useRuntimeConfig()
  const lastmod = new Date().toISOString().slice(0, 10)
  const siteUrl = String(config.public.siteUrl).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/layanan', priority: '0.8', changefreq: 'monthly' },
  ]
  const urls = pages.map(page => `<url><loc>${siteUrl}${page.path}</loc><lastmod>${lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
})
