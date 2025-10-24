import type { Form, SelectableField } from '@/types/form'

function sanitize(label: string | undefined) {
  if (!label) return label // throw?
  return label.toLocaleLowerCase().replaceAll(/\W+/g, ' ').trim().replaceAll(' ', '-').slice(0, 80)
}

export function deriveFollowupId(field: SelectableField, key: unknown | undefined) {
  return `${field.id}.${sanitize(key as string | undefined)}`
}

export default function deriveIds(form: Form): Form {
  return {
    pages: form.pages.map(page => ({
      ...page,
      sections: page.sections.map((section) => {
        if (section.type !== 'fields') return section
        return {
          ...section,
          fields: section.fields.map((field) => {
            const fixed = { ...field, id: field.id ?? sanitize(field.label) }
            return fixed
          }),
        }
      }),
    })),
  }
}
