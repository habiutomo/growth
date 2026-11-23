import { createError, readBody } from 'h3'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: unknown; consent?: unknown }>(event)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  if (email.length > 254 || !emailPattern.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Masukkan alamat email yang valid.' })
  }
  if (body?.consent !== true) throw createError({ statusCode: 400, statusMessage: 'Persetujuan newsletter diperlukan.' })

  const config = useRuntimeConfig(event)
  if (!config.leadWebhookUrl) return { ok: true, mode: 'demo' as const }

  try {
    await $fetch(config.leadWebhookUrl, {
      method: 'POST',
      timeout: 8000,
      headers: config.leadWebhookToken ? { Authorization: `Bearer ${config.leadWebhookToken}` } : undefined,
      body: { email, consent: true, type: 'newsletter', source: 'website', receivedAt: new Date().toISOString() },
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Pendaftaran belum berhasil. Silakan coba lagi.' })
  }

  return { ok: true, mode: 'connected' as const }
})
