import type { State } from '@/components/form/useFormState'
import type { FormId } from '@/lib/forms-provider'

type BaseField = {
  type: string
  id: string
  label?: string
  sublabel?: string
  optional?: boolean
}

export type TextField = BaseField & {
  type: 'text'
  placeholder: string
  lines?: number
}

export type DatePickerField = BaseField & {
  type: 'date-picker'
}

export type SelectableField = BaseField & {
  options: string[] | { [key: string]: string }
  followup: { [key: string]: Field }
}

export type SelectField = SelectableField & {
  type: 'select'
  radio?: boolean
  placeholder: string
}

export type MultiSelectField = SelectableField & {
  type: 'multi-select'
  placeholder: string
  none?: boolean
}

export type WeightField = BaseField & {
  type: 'weight'
}

export type HeightField = BaseField & {
  type: 'height'
}

export type AcknowledgementField = BaseField & {
  type: 'acknowledgement'
  points: string[]
  tick: string
}

export type Field = TextField | DatePickerField | SelectField | WeightField | HeightField | MultiSelectField | AcknowledgementField

export type Section
  = | { type: 'fields', fields: Field[] } | { type: 'separator' }

export type Page = {
  page: string
  description?: string
  sections: Section[]
}

export type Form = {
  id: FormId
  pages: Page[]
  subject: string
  from: string
}

export type FormSubmitRequest = {
  token: string
  data: State
  formId: FormId
}
