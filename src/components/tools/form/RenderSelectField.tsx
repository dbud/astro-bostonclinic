import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type SelectField } from '@/types/form'

import RenderField from './RenderField'
import Required from './Required'
import useFormState from './useFormState'

export default function RenderSelectField({ field }: { field: SelectField }) {
  const { state, setState } = useFormState()
  const followup = (field.followup ?? {})[state[field.id] as string]
  return (
    <>
      <Select
        onValueChange={value => setState({ ...state, [field.id]: value })}
        value={state[field.id] as string ?? ''}
      >
        <Required field={field}>
          <SelectTrigger>
            <SelectValue
              placeholder={field.placeholder || 'Select an option'}
            />
          </SelectTrigger>
        </Required>
        <SelectContent>
          {Object.entries(field.options).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {followup && <RenderField field={followup} />}
    </>
  )
}
