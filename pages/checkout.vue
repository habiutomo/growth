<script setup lang="ts">
const { track } = useAnalytics()
const config = useRuntimeConfig()
const form = reactive({ name: '', email: '', company: '', challenge: '' })
const error = ref('')
const success = ref(false)
const busy = ref(false)
const captureMode = ref<'demo' | 'connected'>('demo')

useSeoMeta({ title: 'Jadwalkan sesi gratis', description: 'Ceritakan tantangan pertumbuhan Anda dan jadwalkan sesi eksplorasi gratis dengan Northstar.', robots: 'noindex, nofollow' })
useHead({ link: [{ rel: 'canonical', href: `${config.public.siteUrl}/checkout` }] })

onMounted(() => track('page_view', { page_location: window.location.pathname, page_title: document.title }))

async function submit() {
  error.value = ''
  busy.value = true
  track('form_submit', { form_name: 'consultation', form_step: 'request' })
  try {
    const response = await $fetch<{ mode: 'demo' | 'connected' }>('/api/checkout', { method: 'POST', body: form })
    captureMode.value = response.mode
    success.value = true
    if (response.mode === 'connected') track('generate_lead', { method: 'consultation_form', lead_type: 'free_session' })
  } catch (cause: unknown) {
    error.value = cause && typeof cause === 'object' && 'data' in cause ? String((cause as { data?: { message?: string } }).data?.message || 'Gagal mengirim. Coba lagi sebentar.') : 'Gagal mengirim. Coba lagi sebentar.'
    track('form_error', { form_name: 'consultation' })
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <main class="checkout-page">
    <header class="checkout-header"><NuxtLink class="brand" to="/"><span class="brand-mark">✳</span> northstar<span class="brand-period">.</span></NuxtLink><NuxtLink class="back-link" to="/">← Kembali ke beranda</NuxtLink></header>
    <div class="checkout-layout">
      <section class="checkout-form-panel"><div class="eyebrow"><span class="live-dot" /> LANGKAH PERTAMA, TANPA BIAYA</div><h1>Yuk, cari tahu<br><span class="serif-accent">apa berikutnya.</span></h1><p class="checkout-intro">{{ config.public.leadCaptureConnected ? 'Ceritakan tantangan Anda. Tim kami akan menghubungi Anda untuk memilih waktu yang cocok.' : 'Isi formulir untuk mencoba alur permintaan sesi. Mode demo tidak menghubungi atau menyimpan data Anda.' }}</p>
        <div v-if="success" class="success-card" role="status"><span class="success-icon">✓</span><h2>{{ captureMode === 'connected' ? `Terima kasih, ${form.name.split(' ')[0]}.` : 'Simulasi berhasil.' }}</h2><p v-if="captureMode === 'connected'">Pesan Anda sudah kami terima. Kami akan menghubungi <strong>{{ form.email }}</strong> untuk menjadwalkan sesi.</p><p v-else>Mode demo: permintaan ini tidak disimpan atau dikirim. Hubungkan webhook CRM untuk menerima lead sungguhan.</p><NuxtLink class="button button-dark" to="/">Kembali ke beranda ↗</NuxtLink></div>
        <p v-if="!config.public.leadCaptureConnected && !success" class="demo-notice">Mode demo: permintaan tidak akan disimpan atau dikirim.</p>
        <form v-if="!success" class="contact-form" @submit.prevent="submit">
          <div class="field-row"><label>Nama lengkap<input v-model="form.name" name="name" autocomplete="name" placeholder="Nama Anda" required minlength="2"></label><label>Email kerja<input v-model="form.email" name="email" type="email" autocomplete="email" placeholder="nama@perusahaan.com" required></label></div>
          <label>Nama perusahaan <span class="optional">OPSIONAL</span><input v-model="form.company" name="company" autocomplete="organization" placeholder="Perusahaan Anda"></label>
          <label>Apa tantangan terbesar Anda saat ini?<select v-model="form.challenge" name="challenge" required><option value="" disabled>Pilih yang paling mendekati</option><option>Menarik lebih banyak pelanggan</option><option>Meningkatkan konversi</option><option>Memahami data dan peluang</option><option>Mencari arah pertumbuhan</option><option>Lainnya</option></select></label>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="button button-dark button-large submit-button" type="submit" :disabled="busy">{{ busy ? 'Mengirim…' : 'Minta sesi gratis' }} <span>↗</span></button><p class="privacy-note">{{ config.public.leadCaptureConnected ? 'Dengan mengirim formulir, Anda meminta kami menghubungi Anda tentang sesi ini.' : 'Mode demo: data hanya divalidasi dan tidak dikirim ke CRM.' }}</p>
        </form>
      </section>
      <aside class="checkout-aside"><div class="aside-top"><span class="aside-kicker">NORTHSTAR / CLARITY SESSION</span><div class="aside-illustration"><span class="aside-orbit orbit-a"/><span class="aside-orbit orbit-b"/><span class="aside-sun">✳</span><span class="aside-arrow">↗</span><span class="aside-caption">YOUR NEXT<br>CHAPTER</span></div><blockquote>“Kadang yang kita butuhkan bukan jawaban yang sempurna, tapi pertanyaan yang tepat.”</blockquote><span class="quote-author">— CARA KAMI MEMULAI</span></div><div class="included"><span>YANG AKAN ANDA DAPATKAN</span><p><b>✓</b> Percakapan 30 menit, fokus pada Anda</p><p><b>✓</b> Satu peluang yang bisa langsung dicoba</p><p><b>✓</b> Tidak ada biaya atau kewajiban</p></div></aside>
    </div>
  </main>
</template>
