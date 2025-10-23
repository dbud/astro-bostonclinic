import type { ChangeEvent } from 'react'

import DatePicker from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type Field } from '@/types/form'

import RenderHeightField from './RenderHeightField'
import RenderSelectField from './RenderSelectField'
import RenderWeightField from './RenderWeightField'
import Required from './Required'
import useFormState from './useFormState'

export default function RenderField({ field }: { field: Field }) {
  const { state, setState } = useFormState()
  switch (field.type) {
    case 'text': {
      const props = {
        id: field.id,
        placeholder: field.placeholder,
        value: state[field.id] as string | undefined,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setState({ ...state, [field.id]: e.target.value }),
      }
      return (
        <Required field={field}>
          {(field.lines ?? 1) > 1
            ? <Textarea rows={field.lines} {...props} />
            : <Input type="text" {...props} />}
        </Required>
      )
    }
    case 'select':
      return <RenderSelectField field={field} />
    case 'date-picker':
      return (
        <Required field={field}>
          <DatePicker
            value={state[field.id] as Date | undefined}
            onChange={date => setState({ ...state, [field.id]: date })}
          />
        </Required>
      )
    case 'weight': return <RenderWeightField field={field} />
    case 'height': return <RenderHeightField field={field} />
  }
}
