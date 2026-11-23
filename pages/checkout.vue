<script setup lang="ts">
const { track } = useAnalytics()
const config = useRuntimeConfig()
const form = reactive({ name: '', email: '', company: '', challenge: '' })
const error = ref('')
const success = ref(false)
const busy = ref(false)

useSeoMeta({ title: 'Jadwalkan sesi gratis', description: 'Ceritakan tantangan pertumbuhan Anda dan jadwalkan sesi eksplorasi gratis dengan Northstar.', robots: 'noindex, nofollow' })
useHead({ link: [{ rel: 'canonical', href: `${config.public.siteUrl}/checkout` }] })

onMounted(() => track('begin_checkout', { currency: 'IDR', value: 0, item_name: 'Growth clarity session' }))

async function submit() {
  error.value = ''
  busy.value = true
  track('add_shipping_info', { method: 'consultation_form' })
  try {
    await $fetch('/api/checkout', { method: 'POST', body: form })
    success.value = true
    track('purchase', { transaction_id: `NS-${Date.now()}`, currency: 'IDR', value: 0, item_name: 'Growth clarity session' })
  } catch (cause: unknown) {
    error.value = cause && typeof cause === 'object' && 'data' in cause ? String((cause as { data?: { message?: string } }).data?.message || 'Gagal mengirim. Coba lagi sebentar.') : 'Gagal mengirim. Coba lagi sebentar.'
    track('checkout_error', { error: error.value })
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <main class="checkout-page">
    <header class="checkout-header"><NuxtLink class="brand" to="/"><span class="brand-mark">✳</span> northstar<span class="brand-period">.</span></NuxtLink><NuxtLink class="back-link" to="/">← Kembali ke beranda</NuxtLink></header>
    <div class="checkout-layout">
      <section class="checkout-form-panel"><div class="eyebrow"><span class="live-dot" /> LANGKAH PERTAMA, TANPA BIAYA</div><h1>Yuk, cari tahu<br><span class="serif-accent">apa berikutnya.</span></h1><p class="checkout-intro">Isi beberapa detail di bawah. Tim kami akan menghubungi Anda dalam satu hari kerja untuk memilih waktu yang cocok.</p>
        <div v-if="success" class="success-card" role="status"><span class="success-icon">✓</span><h2>Terima kasih, {{ form.name.split(' ')[0] }}.</h2><p>Pesan Anda sudah kami terima. Kami akan segera menghubungi <strong>{{ form.email }}</strong> untuk menjadwalkan sesi.</p><NuxtLink class="button button-dark" to="/">Kembali ke beranda ↗</NuxtLink></div>
        <form v-else class="contact-form" @submit.prevent="submit">
          <div class="field-row"><label>Nama lengkap<input v-model="form.name" name="name" autocomplete="name" placeholder="Nama Anda" required minlength="2"></label><label>Email kerja<input v-model="form.email" name="email" type="email" autocomplete="email" placeholder="nama@perusahaan.com" required></label></div>
          <label>Nama perusahaan <span class="optional">OPSIONAL</span><input v-model="form.company" name="company" autocomplete="organization" placeholder="Perusahaan Anda"></label>
          <label>Apa tantangan terbesar Anda saat ini?<select v-model="form.challenge" name="challenge" required><option value="" disabled>Pilih yang paling mendekati</option><option>Menarik lebih banyak pelanggan</option><option>Meningkatkan konversi</option><option>Memahami data dan peluang</option><option>Mencari arah pertumbuhan</option><option>Lainnya</option></select></label>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="button button-dark button-large submit-button" type="submit" :disabled="busy">{{ busy ? 'Mengirim…' : 'Minta sesi gratis' }} <span>↗</span></button><p class="privacy-note">Dengan mengirim formulir ini, Anda setuju kami menghubungi Anda tentang sesi ini. Data Anda aman bersama kami.</p>
        </form>
      </section>
      <aside class="checkout-aside"><div class="aside-top"><span class="aside-kicker">NORTHSTAR / CLARITY SESSION</span><div class="aside-illustration"><span class="aside-orbit orbit-a"/><span class="aside-orbit orbit-b"/><span class="aside-sun">✳</span><span class="aside-arrow">↗</span><span class="aside-caption">YOUR NEXT<br>CHAPTER</span></div><blockquote>“Kadang yang kita butuhkan bukan jawaban yang sempurna, tapi pertanyaan yang tepat.”</blockquote><span class="quote-author">— CARA KAMI MEMULAI</span></div><div class="included"><span>YANG AKAN ANDA DAPATKAN</span><p><b>✓</b> Percakapan 30 menit, fokus pada Anda</p><p><b>✓</b> Satu peluang yang bisa langsung dicoba</p><p><b>✓</b> Tidak ada biaya atau kewajiban</p></div></aside>
    </div>
  </main>
</template>
