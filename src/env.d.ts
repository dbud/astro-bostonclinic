type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare namespace App {
  type Locals = Runtime
}

declare module '*/consultation-form.yaml' {
  export type TextField = {
    type: 'text'
    id: string
    placeholder: string
    label?: string
    optional?: boolean
    lines?: number
  }

  export type DatePickerField = {
    type: 'date-picker'
    id: string
    label?: string
    optional?: boolean
  }

  export type SelectField = {
    type: 'select'
    placeholder: string
    label?: string
    id: string
    options: { [key: string]: string }
    optional?: boolean
    followup: { [key: string]: Field }
  }

  export type Field = TextField | DatePickerField | SelectField

  export type Section
    = | { type: 'fields', fields: Field[] }
      | { type: 'separator' }

  export type Page = {
    page: string
    description?: string
    sections: Section[]
  }

  export type Form = {
    pages: Page[]
  }

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
