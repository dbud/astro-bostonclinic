export async function verifyToken(token: string | undefined) {
  if (!token) return false
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: import.meta.env.TURNSTILE_SECRET_KEY ?? TURNSTILE_SECRET_KEY,
        response: token,
      }),
    },
  )
  const json = await response.json() as { success?: boolean }
  return json.success ?? false
}
