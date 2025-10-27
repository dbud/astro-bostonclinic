declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          'sitekey': string
          'callback'?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any
        },
      ) => string
      remove: (widgetId: string) => void
      reset: (widgetId?: string) => void
    }
    onloadTurnstile?: () => void
  }
}

let readyPromise: Promise<typeof window.turnstile>

export function waitForTurnstile(): Promise<typeof window.turnstile> {
  if (readyPromise) return readyPromise

  readyPromise = new Promise((resolve) => {
    if (window.turnstile) {
      resolve(window.turnstile)
      return
    }

    window.onloadTurnstile = () => resolve(window.turnstile!)
  })

  return readyPromise
}
