# Northstar Growth Storefront

Demo Nuxt 3 untuk menunjukkan praktik front-end dan growth engineering dari brief PDF: SEO teknis, landing page akuisisi, alur konversi, tracking analytics, dan validasi client/server.

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Nuxt. Produksi: `npm run build` lalu `npm run preview`.

## Fitur

- Nuxt SSR dengan metadata SEO, Open Graph, canonical, JSON-LD, `robots.txt`, dan sitemap dinamis.
- Landing page responsif dengan CTA terukur, section produk, bukti sosial, dan formulir newsletter.
- Form sesi gratis dengan validasi HTML dan server, loading/error/success states, dan data pribadi yang tidak dikirim ke analytics.
- `useAnalytics()` mengirim event ke `northstar:analytics` dan `dataLayer` bila tersedia. Di development, event tampil di console.
- Preferensi reduced-motion dan navigasi semantik/aksesibel.

## Catatan integrasi produksi

`POST /api/checkout` saat ini adalah endpoint demo: validasi input lalu mencatat lead ke log server. Hubungkan ke CRM atau backend resmi sebelum menerima lead sungguhan. Ganti `NUXT_PUBLIC_SITE_URL` dengan domain publik agar canonical dan sitemap benar. Set GA4/GTM melalui integrasi resmi perusahaan; jangan memasukkan email atau data formulir ke event analytics.
