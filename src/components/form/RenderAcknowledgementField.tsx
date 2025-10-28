import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { AcknowledgementField } from '@/types/form'

import { useFormFieldState } from './useFormState'

export default function RenderAcknowledgementField({ field }: { field: AcknowledgementField }) {
  const { value, setValue } = useFormFieldState<boolean>(field)
  const { id, points, tick } = field
  return (
    <>
      <ul className="list-disc ml-8">
        {points.map((point, i) => <li className="mb-2" key={i}>{point}</li>)}
      </ul>
      <Label className={`hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3
        has-aria-checked=true:border-blue-600 has-aria-checked=true:bg-blue-50`}
      >
        <Checkbox
          id={id}
          checked={value ?? false}
          onCheckedChange={checked => setValue(checked ? true : false)}
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="leading-none font-medium">{tick}</p>
        </div>
      </Label>
    </>
  )
}
