export async function verifyToken(token: string | undefined, timeout = 10000): Promise<{ success: true } | { success: false, reason: string }> {
  if (!token) return { success: false, reason: 'Missing token' }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: import.meta.env.TURNSTILE_SECRET_KEY ?? TURNSTILE_SECRET_KEY,
          response: token,
        }),
        signal: controller.signal,
      },
    )
    const json = await response.json() as { success: true } | { 'success': false, 'error-codes': string[] }
    return json.success
      ? { success: true }
      : { success: false, reason: json['error-codes'].join(', ') }
  }
  catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.name === 'AbortError') {
      return { success: false, reason: 'Validation timeout' }
    }
    return { success: false, reason: 'Internal error' }
  }
  finally {
    clearTimeout(timeoutId)
    controller.abort()
  }
}
