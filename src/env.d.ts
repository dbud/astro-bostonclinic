type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare const PUBLIC_TURNSTILE_SITE_KEY: string
declare const TURNSTILE_SECRET_KEY: string

declare namespace App {
  type Locals = Runtime
}

declare module '*/consultation-form.yaml' {
  import { type Form } from '@types/form'
  const value: Form
  export default value
}

declare module '*/business.yaml' {
  interface BusinessData {
    name: string
    phones: string[]
    address: {
      street: string
      postcode: string
    }
    openingHours: string[]
  }

  const value: BusinessData
  export default value
}

declare module '*/treatments.yaml' {
  interface Option {
    name: string
    price: number
  }

  interface Treatment {
    name: string
    description: string
    options: Option[]
  }

  const value: Treatment[]
  export default value
}
