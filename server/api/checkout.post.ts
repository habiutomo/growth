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

  // Demo endpoint: replace this log with a CRM/API integration in production.
  console.info('[checkout lead received]', { name, email, company, challenge, receivedAt: new Date().toISOString() })
  return { ok: true, message: 'Permintaan sesi berhasil dikirim.' }
})
