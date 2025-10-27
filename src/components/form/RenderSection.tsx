import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { type Section } from '@/types/form'

import RenderField from './RenderField'
import Required from './Required'

export default function RenderSection({
  section,
  first,
}: {
  section: Section
  first: boolean
}) {
  switch (section.type) {
    case 'separator':
      return <Separator />
    case 'fields': {
      const rows = section.fields.map(field => (
        <div
          className={cn(
            'flex-1 flex flex-col gap-2',
            !first && section.fields.find(field => field.label) && 'mt-6',
          )}
          key={field.id}
        >
          <Required field={field}>
            {field.label && <Label htmlFor={field.id}>{field.label}</Label>}
          </Required>
          {field.sublabel && <Label className="font-normal text-slate-600 leading-snug mb-1" htmlFor={field.id}>{field.sublabel}</Label>}
          <RenderField field={field} />
        </div>
      ))
      return (
        <div className="flex flex-col gap-2 md:flex-row md:gap-6 md:items-end">
          {rows}
        </div>
      )
    }
  }
}
