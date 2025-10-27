import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import allEntries from '@/lib/all-entries'
import { deriveFollowupId } from '@/lib/derive-ids'
import { type SelectField } from '@/types/form'

import RenderFollowUp from './RenderFollowUp'
import { useFormFieldState } from './useFormState'

export default function RenderSelectField({ field }: { field: SelectField }) {
  const { value } = useFormFieldState<string>(field)
  const followup = (field.followup ?? {})[value]
  return (
    <>
      {field.radio
        ? <RenderRadioField field={field} />
        : <RenderDropDownField field={field} />}
      <RenderFollowUp followup={followup} id={deriveFollowupId(field, value)} />
    </>
  )
}

export function RenderDropDownField({ field }: { field: SelectField }) {
  const { value, setValue } = useFormFieldState<string>(field)
  return (
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
        {allEntries(field.options).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function RenderRadioField({ field }: { field: SelectField }) {
  const { value, setValue } = useFormFieldState<string>(field)
  return (
    <RadioGroup
      onValueChange={value => setValue(value)}
      value={value ?? ''}
      className="my-2"
    >
      {allEntries(field.options).map(([key, value]) => (
        <div className="flex items-center gap-3" key={key}>
          <RadioGroupItem value={key} id={key} />
          <Label className="font-normal" htmlFor={key}>{value}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
