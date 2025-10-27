import { Resend } from 'resend'

import renderFormEmail from '@/components/form-email/render'
import getForm from '@/lib/forms-provider'
import { verifyToken } from '@/lib/verify-turnstile'
import type { FormSubmitRequest } from '@/types/form'
export const prerender = false

export async function POST({ request }: { request: Request }): Promise<Response> {
  const json = await request.json()
  const { token, data, formId } = json as FormSubmitRequest

  const result = await verifyToken(token)
  if (!result.success) {
    return new Response(
      JSON.stringify({ error: result.reason }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  const form = getForm(formId)
  const html = await renderFormEmail({ form, data })

  const recipients = (await EMAIL_LIST_KV.get('form-recipients') ?? '').split(',')

  const resend = new Resend(import.meta.env.RESEND_API_KEY ?? RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: form.subject,
    to: recipients,
    subject: form.subject,
    html,
  })
  if (error) {
    return new Response(
      JSON.stringify({ ok: false, reason: error.message }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
