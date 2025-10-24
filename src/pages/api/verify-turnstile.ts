export const prerender = false

export async function POST({ request }) {
  console.log(request)
  const json = await request.json()
  console.log(json)
  const { token } = json

  if (!token) {
    return new Response(JSON.stringify({ ok: false, reason: 'no_token' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const secret = import.meta.env.TURNSTILE_SECRET_KEY ?? TURNSTILE_SECRET_KEY
  console.log(secret)

  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ secret, response: token }),
    },
  )

  const resjson = await verifyRes.json() as { success?: boolean }
  console.log(resjson)

  return new Response(
    JSON.stringify({ ok: resjson.success ?? false }),
    { headers: { 'Content-Type': 'application/json' } },
  )
}
