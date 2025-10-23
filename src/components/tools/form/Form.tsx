import { useState } from 'react'

import {
  type Field,
  type Form,
} from '@/types/form'

import Page from './Page'
import { type State, StateContext } from './useFormState'

export function Form({ form }: { form: Form }) {
  const [state, setState] = useState<State>({})
  const [index, setIndex] = useState(1)

  function validate(field: Field | undefined): boolean {
    if (!field) return true
    if (field.optional) return true
    const value = state[field.id]
    if (value === undefined || value === null || value === '') return false
    if (field.type === 'select') {
      return validate((field.followup ?? {})[value as string])
    }
    if (field.type === 'multi-select') {
      if (!(value instanceof Set)) return false
      if (value.size === 0) return false
      return Array.from(value).every(option => validate((field.followup ?? {})[option as string]))
    }
    if (field.type === 'weight' || field.type === 'height') return value as number > 0
    return true
  }

  return (
    <StateContext.Provider value={{
      state, setState,
      validate,
      currentPage: index, pages: form.pages.length,
    }}
    >
      <Page
        page={form.pages[index]}
        onBack={index > 0 ? () => setIndex(index - 1) : undefined}
        onNext={
          index < form.pages.length - 1 ? () => setIndex(index + 1) : undefined
        }
        onSubmit={
          index === form.pages.length - 1
            ? () => alert('Form submitted!')
            : undefined
        }
      />
      <pre className="text-sm p-6">
        {JSON.stringify(
          state,
          (_key, value) => (value instanceof Set ? [...value] : value),
          2,
        )}
      </pre>
    </StateContext.Provider>
  )
}
