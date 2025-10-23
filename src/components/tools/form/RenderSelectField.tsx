import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type SelectField } from '@/types/form'

import RenderField from './RenderField'
import Required from './Required'
import { useFormFieldState } from './useFormState'

export default function RenderSelectField({ field }: { field: SelectField }) {
  const { value, setValue } = useFormFieldState<string>(field)
  const followup = (field.followup ?? {})[value]
  return (
    <>
      <Select
        onValueChange={value => setValue(value)}
        value={value ?? ''}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={field.placeholder || 'Select an option'}
          />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(field.options).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {followup && (
        <Required field={followup}>
          <RenderField field={followup} />
        </Required>
      )}
    </>
  )
}
