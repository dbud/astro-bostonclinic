import type { APIContext } from 'astro'
import { Resend } from 'resend'

import renderFormEmail from '@/components/form-email/render'
import getForm from '@/lib/forms-provider'
import { verifyToken } from '@/lib/verify-turnstile'
import type { FormSubmitRequest } from '@/types/form'
export const prerender = false

export async function POST({ request, locals }: APIContext): Promise<Response> {
  const env = locals.runtime.env
  const json = await request.json()
  const { token, data, formId } = json as FormSubmitRequest

  console.log({ type: 'form-submit', data, formId })

  const result = await verifyToken(token)
  if (!result.success) {
    return new Response(
      JSON.stringify({ error: result.reason }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  const form = getForm(formId)
  const html = await renderFormEmail({ form, data })

  console.log({ html })

  const recipients = ((env.EMAIL_LIST_KV
    ? await env.EMAIL_LIST_KV.get('form-recipients')
    : import.meta.env.EMAIL_LIST_RECIPIENTS) ?? '')
    .split(',')

  const resend = new Resend(import.meta.env.RESEND_API_KEY ?? env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: form.from,
    to: recipients,
    subject: form.subject,
    html,
  })
  if (error) {
    console.log({ error })
    return new Response(
      JSON.stringify({ ok: false, error: error.message }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
