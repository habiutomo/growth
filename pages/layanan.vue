<script setup lang="ts">
const config = useRuntimeConfig()
const { track } = useAnalytics()

useSeoMeta({
  title: 'Layanan strategi pertumbuhan',
  description: 'Riset peluang, eksperimen konversi, dan pengukuran pertumbuhan untuk tim kecil.',
  ogTitle: 'Layanan Northstar — strategi menjadi momentum',
  ogDescription: 'Pilih dukungan pertumbuhan yang sesuai dengan tantangan tim Anda.',
  ogImage: `${config.public.siteUrl}/og-image.svg`,
  ogType: 'website',
})
useHead({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/layanan` }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Layanan Northstar',
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Riset dan pemetaan peluang', provider: { '@type': 'Organization', name: 'Northstar' } } },
      { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'Eksperimen dan optimasi konversi', provider: { '@type': 'Organization', name: 'Northstar' } } },
      { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'Analitik dan pengukuran', provider: { '@type': 'Organization', name: 'Northstar' } } },
    ],
  }) }],
})
onMounted(() => track('page_view', { page_location: window.location.pathname, page_title: document.title }))

const services = [
  { number: '01', name: 'Riset dan pemetaan peluang', description: 'Pahami niat pencarian, pertanyaan pelanggan, dan perjalanan pengguna untuk menemukan peluang dengan dampak terbesar.', includes: 'Riset intent · peta perjalanan · prioritas peluang' },
  { number: '02', name: 'Eksperimen dan optimasi konversi', description: 'Ubah hambatan funnel menjadi hipotesis, eksperimen terukur, dan perbaikan UX yang dapat dipelajari.', includes: 'Audit funnel · hipotesis · eksperimen A/B' },
  { number: '03', name: 'Analitik dan pengukuran', description: 'Susun skema event yang konsisten untuk menghubungkan perilaku pengguna dengan hasil bisnis.', includes: 'Taksonomi event · validasi data · dashboard brief' },
]
</script>

<template>
  <main class="services-page">
    <header class="checkout-header"><NuxtLink class="brand" to="/"><span class="brand-mark">✳</span> northstar<span class="brand-period">.</span></NuxtLink><NuxtLink class="back-link" to="/">← Kembali ke beranda</NuxtLink></header>
    <section class="services-intro section-wrap"><div class="eyebrow">RISET · EKSPERIMEN · PENGUKURAN</div><h1>Temukan tuas<br><span class="serif-accent">pertumbuhan Anda.</span></h1><p>Pilih satu titik awal. Kami bekerja bersama tim Anda untuk memahami masalah, menguji langkah, dan belajar dari hasilnya.</p></section>
    <section class="services-list section-wrap" aria-label="Daftar layanan">
      <article v-for="service in services" :key="service.number" class="service-item"><span class="service-number">{{ service.number }} / NORTHSTAR</span><div><h2>{{ service.name }}</h2><p>{{ service.description }}</p><small>{{ service.includes }}</small></div><NuxtLink class="button button-dark" to="/checkout" :aria-label="`Diskusikan ${service.name}`" @click="track('begin_checkout', { source: 'service_listing', item_name: service.name })">Diskusikan ↗</NuxtLink></article>
    </section>
    <section class="services-cta"><div class="section-wrap"><h2>Belum yakin harus mulai dari mana?</h2><p>Mulai dari percakapan 30 menit untuk memetakan satu peluang yang bisa dicoba.</p><NuxtLink class="button button-dark" to="/checkout" @click="track('begin_checkout', { source: 'services_cta' })">Jadwalkan sesi gratis ↗</NuxtLink></div></section>
    <footer class="site-footer"><div class="footer-top"><NuxtLink class="brand footer-brand" to="/"><span class="brand-mark">✳</span> northstar<span class="brand-period">.</span></NuxtLink><span>Strategi pertumbuhan untuk bisnis yang bergerak.</span><NuxtLink to="/">Beranda ↗</NuxtLink></div><div class="footer-bottom"><span>© 2025 NORTHSTAR STUDIO</span><NuxtLink to="/">KEMBALI KE BERANDA ↑</NuxtLink></div></footer>
  </main>
</template>
