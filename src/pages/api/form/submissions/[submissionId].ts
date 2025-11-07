import type { APIContext } from 'astro'

export const prerender = false

export async function GET({ params, locals }: APIContext): Promise<Response> {
  const env = locals.runtime.env
  const { submissionId } = params as { submissionId: string }
  const stored = await env.FORM_SUBMISSIONS_KV.get(submissionId)
  if (!stored) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })

  return new Response(stored, { headers: { 'Content-Type': 'application/json' } })
}
