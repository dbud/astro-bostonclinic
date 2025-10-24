import { useEffect, useRef } from 'react'

import { waitForTurnstile } from '@/lib/turnstile-ready'

type Props = {
  siteKey: string
  onVerify?: (token: string) => void
  options?: Record<string, unknown>
}

export function Turnstile({ siteKey, onVerify, options }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let widgetId: string | undefined

    waitForTurnstile().then((turnstile) => {
      if (ref.current && turnstile) {
        widgetId = turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: onVerify,
          ...options,
        })
      }
    })

    return () => {
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [siteKey])

  return (
    <>
      <pre>
        siteKey =
        {siteKey}
      </pre>
      <div ref={ref} className="cf-turnstile" />
    </>
  )
}

export function TurnstileScript() {
  return <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer />
}
