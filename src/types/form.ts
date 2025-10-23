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

export type SelectField = BaseField & {
  type: 'select'
  placeholder: string
  options: { [key: string]: string }
  followup: { [key: string]: Field }
}

export type MultiSelectField = BaseField & {
  type: 'multi-select'
  placeholder: string
  options: { [key: string]: string }
  none?: boolean
  followup: { [key: string]: Field }
}

export type WeightField = BaseField & {
  type: 'weight'
}

export type HeightField = BaseField & {
  type: 'height'
}

export type Field = TextField | DatePickerField | SelectField | WeightField | HeightField | MultiSelectField

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
