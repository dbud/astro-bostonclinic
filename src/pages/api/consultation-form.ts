import { verifyToken } from '@/lib/verify-turnstile'

export const prerender = false

export async function POST({ request }: { request: Request }): Promise<Response> {
  const json = await request.json()
  const { token } = json as { token: string }

  const result = await verifyToken(token)
  if (!result.success) {
    return new Response(
      JSON.stringify({ error: result.reason }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
