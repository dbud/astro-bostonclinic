import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { type MultiSelectField } from '@/types/form'

import RenderField from './RenderField'
import Required from './Required'
import { useFormFieldState } from './useFormState'

export default function RenderMultiSelectField({ field }: { field: MultiSelectField }) {
  const { value, setValue } = useFormFieldState<Set<string>>(field)

  return (
    <div className="flex flex-col gap-3 py-2">
      {Object.entries(field.options).map(([key, text]) => {
        const checked = value?.has(key) ?? false
        const followup = checked && (field.followup ?? {})[key]
        return (
          <>
            <div key={key} className="flex items-center gap-3">
              <Checkbox
                id={key}
                checked={checked}
                onCheckedChange={checked =>
                  setValue((prev) => {
                    const next = new Set(prev)
                    if (checked)
                      next.add(key)
                    else
                      next.delete(key)
                    return next
                  })}
              />
              <Label htmlFor={key} className="font-normal">{text}</Label>
            </div>
            {followup && (
              <Required field={followup}>
                <RenderField field={followup} />
              </Required>
            )}
          </>
        )
      })}
    </div>
  )
}
