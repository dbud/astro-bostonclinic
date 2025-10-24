import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import allEntries from '@/lib/all-entries'
import { deriveFollowupId } from '@/lib/derive-ids'
import { type MultiSelectField } from '@/types/form'

import RenderFollowUp from './RenderFollowUp'
import { useFormFieldState } from './useFormState'

const NONE_KEY = 'none'

export default function RenderMultiSelectField({ field }: { field: MultiSelectField }) {
  const { value, setValue } = useFormFieldState<Set<string>>(field)
  const entries = allEntries(field.options)
  if (field.none) entries.push([NONE_KEY, 'None of the above'])

  return (
    <div className="flex flex-col gap-3 py-2">
      {entries.map(([key, text]) => {
        const checked = value?.has(key) ?? false
        const followup = checked ? (field.followup ?? {})[key] : null
        return (
          <div key={key} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id={key}
                checked={checked}
                onCheckedChange={checked =>
                  setValue((prev) => {
                    if (key == NONE_KEY)
                      return new Set([NONE_KEY])
                    const next = new Set(prev)
                    next.delete(NONE_KEY)
                    if (checked)
                      next.add(key)
                    else
                      next.delete(key)
                    return next
                  })}
              />
              <Label htmlFor={key} className="font-normal">{text}</Label>
            </div>
            <RenderFollowUp followup={followup} id={deriveFollowupId(field, key)} />
          </div>
        )
      })}
    </div>
  )
}
