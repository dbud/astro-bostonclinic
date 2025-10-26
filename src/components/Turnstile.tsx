import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { waitForTurnstile } from '@/lib/turnstile-ready'

type Props = {
  siteKey: string
  onVerify?: (token: string) => void
  options?: Record<string, unknown>
}

export function Turnstile({ siteKey, onVerify, options }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let widgetId: string | undefined

    waitForTurnstile().then((turnstile) => {
      if (ref.current && turnstile) {
        setLoading(false)
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

  const spinner = (
    <div className="text-sm text-slate-500 flex items-center gap-2">
      <Loader2 className="animate-spin" />
      <span>Verifying you’re human...</span>
    </div>
  )

  return (
    <>
      {loading && spinner}
      <div ref={ref} className="cf-turnstile" data-theme="light" />
    </>
  )
}

export function TurnstileScript() {
  return <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer />
}
