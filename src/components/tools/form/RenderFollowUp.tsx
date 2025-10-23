import { Label } from '@/components/ui/label'
import type { Field } from '@/types/form'

import RenderField from './RenderField'
import Required from './Required'

export default function RenderFollowUp({ followup, id }: { id: string, followup: Field | undefined | null }) {
  if (!followup) return null
  const field = { ...followup, id }
  return (
    <div className="ml-6">
      <Required field={field}>
        {field.label && <Label className="my-3" htmlFor={field.id}>{field.label}</Label>}
      </Required>
      <RenderField field={field} />
    </div>
  )
}
