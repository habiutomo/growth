import { createError, readBody } from 'h3'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const company = typeof body?.company === 'string' ? body.company.trim() : ''
  const challenge = typeof body?.challenge === 'string' ? body.challenge.trim() : ''

  if (name.length < 2 || name.length > 100) throw createError({ statusCode: 400, statusMessage: 'Nama harus terdiri dari 2 sampai 100 karakter.' })
  if (email.length > 254 || !emailPattern.test(email)) throw createError({ statusCode: 400, statusMessage: 'Masukkan alamat email yang valid.' })
  if (company.length > 120) throw createError({ statusCode: 400, statusMessage: 'Nama perusahaan terlalu panjang.' })
  if (!challenge || challenge.length > 300) throw createError({ statusCode: 400, statusMessage: 'Pilih tantangan yang paling mendekati.' })

  const config = useRuntimeConfig(event)
  if (config.leadWebhookUrl) {
    try {
      await $fetch(config.leadWebhookUrl, {
        method: 'POST',
        timeout: 8000,
        headers: config.leadWebhookToken ? { Authorization: `Bearer ${config.leadWebhookToken}` } : undefined,
        body: { name, email, company, challenge, source: 'website', receivedAt: new Date().toISOString() },
      })
    } catch {
      throw createError({ statusCode: 502, statusMessage: 'Sistem penerimaan sedang bermasalah. Silakan coba lagi.' })
    }
  } else {
    // Explicit demo mode: no lead is persisted or sent to a third party.
    console.info('[checkout demo] Configure LEAD_WEBHOOK_URL to deliver leads to a CRM.')
  }
  return { ok: true, mode: config.leadWebhookUrl ? 'connected' : 'demo' }
})
