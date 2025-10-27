import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import allEntries from '@/lib/all-entries'
import { deriveFollowupId } from '@/lib/derive-ids'
import { type MultiSelectField } from '@/types/form'

import RenderFollowUp from './RenderFollowUp'
import { useFormFieldState } from './useFormState'

const NONE_KEY = 'None'

export default function RenderMultiSelectField({ field }: { field: MultiSelectField }) {
  const { value, setValue } = useFormFieldState<string[]>(field)
  const entries = allEntries(field.options)
  if (field.none) entries.push([NONE_KEY, 'None of the above'])
  return (
    <div className="flex flex-col gap-3 py-2">
      {entries.map(([key, text]) => {
        const checked = value?.includes(key) ?? false
        const followup = checked ? (field.followup ?? {})[key] : null
        const followupId = deriveFollowupId(field, key)
        return (
          <div key={key} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id={followupId}
                checked={checked}
                onCheckedChange={checked =>
                  setValue((prev) => {
                    if (key == NONE_KEY)
                      return [NONE_KEY]
                    let next = (prev || []).filter(a => a !== NONE_KEY)
                    if (checked)
                      next = next.includes(key) ? next : [...next, key]
                    else
                      next = next.filter(a => a !== key)
                    return next
                  })}
              />
              <Label htmlFor={followupId} className="font-normal">{text}</Label>
            </div>
            <RenderFollowUp followup={followup} id={followupId} />
          </div>
        )
      })}
    </div>
  )
}
