import { verifyToken } from '@/lib/verify-turnstile'

export const prerender = false

export async function POST({ request }: { request: Request }): Promise<Response> {
  const json = await request.json()
  const { token } = json as { token: string }

  const success = await verifyToken(token)

  return new Response(
    JSON.stringify({ ok: success }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
