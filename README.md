# Northstar Growth Storefront

Demo Nuxt 3 untuk memetakan praktik Front-End / Growth Web Developer pada brief PDF: SEO teknis, funnel dan CRO, eksperimen, pengukuran performa, validasi server, dan integrasi backend. Ini bukan sistem produksi atau implementasi layanan bisnis sungguhan.

## Menjalankan

```bash
npm install
npm run dev
```

Salin `.env.example` ke `.env` untuk mengaktifkan integrasi. Untuk produksi, jalankan `npm run build` lalu `npm run preview`.

## Cakupan yang didemokan

- **Nuxt dan SEO:** SSR, metadata per halaman, Open Graph, canonical, JSON-LD untuk organisasi dan layanan, `robots.txt`, serta sitemap yang berisi halaman publik.
- **Landing page dan funnel:** halaman beranda, daftar layanan `/layanan`, CTA ke sesi konsultasi, dan newsletter. Alur konsultasi memiliki validasi client/server, status loading/error/sukses, dan event funnel yang tidak menyertakan data formulir.
- **Eksperimen CRO:** eksperimen CTA `hero-cta` membagi browser ke varian control/challenger dan menyimpan assignment di local storage agar konsisten. Event exposure dan CTA membawa nama eksperimen/varian untuk analisis setelah consent.
- **Analytics:** skema event first-party `northstar:analytics`; dukungan GA4 melalui Measurement ID atau `dataLayer` untuk GTM. Pengiriman ke GA/GTM hanya setelah consent analytics diberikan, dan izin dapat dicabut di footer beranda. Field email, nama, perusahaan, dan tantangan tidak dikirim ke analytics. Newsletter memerlukan persetujuan terpisah.
- **Web Vitals:** observer browser melaporkan TTFB, LCP, CLS, dan kandidat INP melalui event `web_vital`. Nilainya perlu dikumpulkan pada trafik nyata dan dianalisis per perangkat/koneksi sebelum menarik kesimpulan.
- **Integrasi backend:** `/api/checkout` dan `/api/newsletter` memvalidasi payload. Jika webhook dikonfigurasi, data dikirim server ke CRM/backend dengan token opsional dan timeout; kegagalan upstream dikembalikan sebagai error.
- **Aksesibilitas dasar:** HTML semantik, label form, status/error diumumkan, focus state, dan preferensi reduced-motion.

## Konfigurasi

```dotenv
NUXT_PUBLIC_SITE_URL=https://domain-anda.example
NUXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
LEAD_WEBHOOK_URL=https://api-anda.example/leads
LEAD_WEBHOOK_TOKEN=token-rahasia-server
```

`LEAD_WEBHOOK_URL` menerima POST JSON. Konsultasi mengirim `name`, `email`, `company`, `challenge`, `source`, dan `receivedAt`; newsletter mengirim `email`, `type`, `source`, dan `receivedAt`. Token disimpan di konfigurasi server dan dikirim sebagai Bearer token. Tanpa webhook, aplikasi menyatakan mode demo dan tidak menyimpan atau mengirim data.

## Batas demo terhadap PDF

PDF adalah deskripsi tanggung jawab dan kualifikasi sebuah pekerjaan, bukan spesifikasi produk. Repo ini sekarang menunjukkan pola implementasi yang relevan, tetapi tidak membuktikan pengalaman mengelola codebase produksi, riset pasar/keyword nyata, kerja bersama backend, ataupun interpretasi data bisnis. Belum ada database/CRM konkret, payment gateway, autentikasi, webhook pembayaran, heatmap/session recording, atau backend GA4 Measurement Protocol.

Halaman checkout di demo ini menjadwalkan sesi konsultasi gratis, bukan menjual produk. Karena tidak ada transaksi berbayar, event `purchase` sengaja tidak digunakan. Hubungkan kontrak API dan provider yang disetujui tim sebelum menerima lead atau pembayaran sungguhan. Jangan mengirim PII ke analytics.

## Pekerjaan lanjutan sebelum produksi

- Hubungkan webhook ke CRM resmi, tambahkan penyimpanan persisten, proteksi spam/rate limit, kebijakan privasi dan retensi data.
- Tetapkan consent manager sesuai kebijakan wilayah, lalu validasi GA4/GTM dan deduplikasi event di lingkungan staging.
- Jalankan audit Lighthouse/PageSpeed pada domain produksi, tinjau LCP/INP/CLS dan TTFB untuk perangkat serta jaringan yang relevan, lalu optimalkan aset, caching, dan rendering berdasarkan hasil.
- Lakukan riset keyword/kompetitor dan eksperimen terkontrol dengan volume sampel serta metrik sukses yang disepakati. Assignment lokal demo bukan platform eksperimen statistik.
- Jika alur berbayar dibutuhkan, rancang kontrak checkout dengan backend/payment provider, verifikasi status melalui webhook bertanda tangan, idempotensi, dan rekonsiliasi sebelum melaporkan transaksi.
