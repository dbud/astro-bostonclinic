import type { ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { TextField } from '@/types/form'

import { useFormFieldState } from './useFormState'

export const RenderTextField = ({ field }: { field: TextField }) => {
  const { value, setValue } = useFormFieldState<string>(field)
  const props = {
    id: field.id,
    placeholder: field.placeholder,
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
  }
  return (field.lines ?? 1) > 1
    ? <Textarea rows={field.lines} {...props} />
    : <Input type="text" {...props} />
}
