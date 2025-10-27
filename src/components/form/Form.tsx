import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import FormSubmitted from '@/components/form/FormSubmitted'
import { Turnstile } from '@/components/Turnstile'
import { Toaster } from '@/components/ui/sonner'
import sampleData from '@/data/sample-data'
import deriveIds, { deriveFollowupId } from '@/lib/derive-ids'
import {
  type Field,
  type Form,
  type FormSubmitRequest,
  type SelectableField,
} from '@/types/form'

import Page from './Page'
import { type State, StateContext } from './useFormState'

export function Form(props: { form: Form, endpoint: string }) {
  const form = deriveIds(props.form)

  const [state, setState] = useState<State>(sampleData)
  const [index, setIndex] = useState(2)

  function validateFollowup(field: SelectableField, key: unknown) {
    const followup = (field.followup ?? {})[key as string]
    if (!followup) return true
    return validate({ ...followup, id: deriveFollowupId(field, key) })
  }

  function validate(field: Field | undefined): boolean {
    if (!field) return true
    if (field.optional) return true
    const value = state[field.id]
    if (value === undefined || value === null || value === '') return false
    if (field.type === 'select') {
      return validateFollowup(field, value)
    }
    if (field.type === 'multi-select') {
      if (!(value instanceof Array)) return false
      if (value.length === 0) return false
      return Array.from(value).every(option => validateFollowup(field, option))
    }
    if (field.type === 'weight' || field.type === 'height') return value as number > 0
    return true
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [index])

  const [token, setToken] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      const res = await fetch(props.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, data: state, formId: form.id } as FormSubmitRequest),
      })
      const json = await res.json() as { ok: boolean, reason?: string }

      if (json.ok) {
        toast('Form submitted successfully.')
        setSubmitted(true)
      }
      else {
        throw new Error(json.reason)
      }
    }
    catch (e) {
      toast.error('Something went wrong, please try again.', { description: (e as Error).message })
      setSubmitting(false)
    }
  }, [token, form])

  const lastPage = index === form.pages.length - 1
  const turnstile = (
    <Turnstile
      siteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? PUBLIC_TURNSTILE_SITE_KEY}
      onVerify={setToken}
    />
  )

  if (submitted) return <FormSubmitted />

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
        onNext={index < form.pages.length - 1 ? () => setIndex(index + 1) : undefined}
        onSubmit={token && lastPage ? onSubmit : undefined}
        submitPlaceholder={!submitting && lastPage && turnstile}
        submitting={submitting}
      />
      <Toaster position="top-center" />
    </StateContext.Provider>
  )
}
