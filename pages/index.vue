<script setup lang="ts">
const { track } = useAnalytics()
const email = ref('')
const submitted = ref(false)

useSeoMeta({
  title: 'Tumbuh dengan arah yang jelas',
  description: 'Strategi pertumbuhan dan eksperimen praktis untuk tim kecil yang ingin maju dengan percaya diri.',
  ogTitle: 'Northstar — temukan arah tumbuh berikutnya',
  ogDescription: 'Strategi pertumbuhan, eksperimen, dan insight yang jelas untuk tim kecil.',
  ogImage: `${useRuntimeConfig().public.siteUrl}/og-image.svg`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: `${useRuntimeConfig().public.siteUrl}/og-image.svg`,
})

useHead({
  link: [{ rel: 'canonical', href: `${useRuntimeConfig().public.siteUrl}/` }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Northstar', url: useRuntimeConfig().public.siteUrl,
    description: 'Partner pertumbuhan untuk tim kecil.',
  }) }],
})

onMounted(() => track('page_view', { page_location: window.location.href, page_title: document.title }))

function subscribe() {
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return
  track('generate_lead', { method: 'newsletter', placement: 'footer' })
  submitted.value = true
}
</script>

<template>
  <div>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Northstar, ke beranda"><span class="brand-mark">✳</span> northstar<span class="brand-period">.</span></a>
      <nav class="desktop-nav" aria-label="Navigasi utama"><a href="#cara-kerja">Cara kerja</a><a href="#cerita">Cerita klien</a><a href="#harga">Harga</a></nav>
      <NuxtLink class="button button-dark header-cta" to="/checkout" @click="track('select_promotion', { placement: 'header' })">Mulai sekarang <span>↗</span></NuxtLink>
    </header>

    <main id="top">
      <section class="hero section-wrap">
        <div class="hero-copy">
          <div class="eyebrow"><span class="live-dot" /> PARTNER PERTUMBUHAN UNTUK TIM KECIL</div>
          <h1>Tumbuh itu<br>nggak harus <span class="serif-accent">menebak.</span></h1>
          <p class="hero-lede">Temukan langkah berikutnya dengan strategi yang jernih, eksperimen yang terukur, dan tim yang ikut peduli.</p>
          <div class="hero-actions"><NuxtLink class="button button-dark button-large" to="/checkout" @click="track('begin_checkout', { source: 'hero' })">Temukan arah tumbuh <span>↗</span></NuxtLink><a class="text-link" href="#cara-kerja">Lihat cara kerja <span>↓</span></a></div>
          <div class="social-proof"><div class="avatar-stack"><span>AR</span><span>DN</span><span>SK</span><span>+</span></div><div><strong>Dipercaya 120+ tim</strong><small>yang memilih tumbuh dengan sadar</small></div><div class="proof-stars">★★★★★</div></div>
        </div>
        <div class="hero-art" aria-label="Ilustrasi pertumbuhan bisnis yang terukur" role="img">
          <div class="art-sun" /><div class="art-label label-top">YOUR NEXT CHAPTER <span>✳</span></div>
          <div class="growth-chart"><span class="chart-line" /><span class="chart-dot dot-one" /><span class="chart-dot dot-two" /><span class="chart-dot dot-three" /><span class="chart-dot dot-four" /><div class="chart-axis">+38% <small>Q3 GROWTH</small></div></div>
          <div class="art-card"><span class="card-icon">↗</span><div><small>THE NORTHSTAR NOTE</small><strong>Kejelasan adalah strategi.</strong></div></div>
          <div class="art-label label-bottom">IDEAS INTO MOMENTUM · EST. 2021</div><span class="art-sparkle">✳</span>
        </div>
        <div class="hero-footnote"><span>01 — 03</span><span>STRATEGI · EKSPERIMEN · PERTUMBUHAN</span><span>SCROLL UNTUK MENJELAJAH ↓</span></div>
      </section>

      <section class="ticker" aria-label="Keahlian Northstar"><div class="ticker-track"><span>STRATEGI YANG JERNIH</span><b>✳</b><span>EKSPERIMEN YANG BERANI</span><b>✳</b><span>PERTUMBUHAN YANG TERUKUR</span><b>✳</b><span>STRATEGI YANG JERNIH</span><b>✳</b><span>EKSPERIMEN YANG BERANI</span><b>✳</b></div></section>

      <section id="cara-kerja" class="section-wrap approach-section">
        <div class="section-heading"><div><div class="eyebrow">BUKAN SEKADAR KONSULTASI</div><h2>Jernihkan arah.<br><span class="serif-accent">Gerakkan hasil.</span></h2></div><p>Kami menemukan titik ungkit yang tepat, lalu membantu tim Anda mengubah insight menjadi langkah yang terasa.</p></div>
        <div class="approach-grid"><article class="approach-card"><div class="approach-number">01 / LIHAT</div><div class="approach-icon icon-compass">◎</div><h3>Temukan peluang</h3><p>Kami mulai dari riset, perjalanan pengguna, dan data yang sudah Anda punya. Bukan asumsi.</p><a href="#harga" aria-label="Pelajari tentang menemukan peluang">↗</a></article><article class="approach-card"><div class="approach-number">02 / COBA</div><div class="approach-icon icon-flash">ϟ</div><h3>Uji ide terbaik</h3><p>Ubah hipotesis menjadi eksperimen sederhana. Belajar lebih cepat, tanpa berjudi pada satu jawaban.</p><a href="#harga" aria-label="Pelajari tentang menguji ide">↗</a></article><article class="approach-card card-featured"><div class="approach-number">03 / TUMBUH</div><div class="approach-icon icon-star">✳</div><h3>Bangun momentum</h3><p>Fokus pada yang bekerja. Ukur hasilnya. Jadikan kemajuan sebagai kebiasaan, bukan kebetulan.</p><a href="#harga" aria-label="Pelajari tentang membangun momentum">↗</a></article></div>
      </section>

      <section id="cerita" class="results-section"><div class="section-wrap results-inner"><div><div class="eyebrow">BUKTI KECIL. DAMPAK NYATA.</div><h2>Kemajuan yang<br><span class="serif-accent">bisa dirasakan.</span></h2><p>Kami percaya pertumbuhan sehat dimulai dari memahami apa yang benar-benar penting.</p><a class="text-link light-link" href="#harga">Temukan pendekatan Anda <span>↗</span></a></div><div class="metrics-grid"><div class="metric"><strong>+38<span>%</span></strong><span>konversi setelah<br>perjalanan disederhanakan</span></div><div class="metric"><strong>2.4<span>×</span></strong><span>lebih banyak insight<br>dari eksperimen terarah</span></div><div class="metric"><strong>6<span>wk</span></strong><span>dari kickoff ke<br>momentum pertama</span></div><div class="metric metric-note">*Hasil beragam untuk setiap tim. Kami mulai dengan mendengarkan.</div></div></div></section>

      <section id="harga" class="section-wrap offer-section"><div class="offer-stamp">✳<small>SMALL STEPS.<br>REAL GROWTH.</small></div><div class="offer-copy"><div class="eyebrow">MULAI DARI SINI</div><h2>Satu percakapan.<br><span class="serif-accent">Banyak kemungkinan.</span></h2><p>Ceritakan tantangan Anda. Dalam 30 menit, kita petakan satu peluang nyata yang bisa mulai dikerjakan minggu ini.</p><NuxtLink class="button button-dark button-large" to="/checkout" @click="track('begin_checkout', { source: 'offer_section', item_name: 'Growth clarity session' })">Jadwalkan sesi gratis <span>↗</span></NuxtLink><span class="offer-caption">TANPA BIAYA · TANPA TEKANAN · HANYA LANGKAH BERIKUTNYA</span></div></section>

      <section class="newsletter-section"><div class="section-wrap newsletter-inner"><div><div class="eyebrow">CATATAN KECIL, IDE BESAR</div><h2>Ruang untuk <span class="serif-accent">bertumbuh.</span></h2><p>Satu insight praktis tiap dua minggu. Tanpa basa-basi.</p></div><form class="newsletter-form" @submit.prevent="subscribe"><label for="newsletter-email" class="sr-only">Alamat email</label><input id="newsletter-email" v-model="email" type="email" placeholder="Email kerja Anda" autocomplete="email" required><button aria-label="Daftar newsletter" :disabled="submitted">{{ submitted ? 'Terdaftar ✓' : 'Ikut membaca ↗' }}</button><small v-if="submitted" role="status">Terima kasih. Sampai jumpa di inbox!</small></form></div></section>
    </main>

    <footer class="site-footer"><div class="footer-top"><a class="brand footer-brand" href="#top"><span class="brand-mark">✳</span> northstar<span class="brand-period">.</span></a><span>Strategi pertumbuhan untuk bisnis yang bergerak.</span><a href="mailto:halo@northstar.id">Halo, kami di sini ↗</a></div><div class="footer-bottom"><span>© 2025 NORTHSTAR STUDIO</span><span>DIBUAT DENGAN NIAT BAIK DI INDONESIA</span><a href="#top">KEMBALI KE ATAS ↑</a></div></footer>
  </div>
</template>
