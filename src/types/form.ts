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

export type WeightField = {
  type: 'weight'
  label?: string
  id: string
  optional?: boolean
}

export type HeightField = {
  type: 'height'
  label?: string
  id: string
  optional?: boolean
}

export type Field = TextField | DatePickerField | SelectField | WeightField | HeightField

export type Section
  = | { type: 'fields', fields: Field[] } | { type: 'separator' }

export type Page = {
  page: string
  description?: string
  sections: Section[]
}

export type Form = {
  pages: Page[]
}
