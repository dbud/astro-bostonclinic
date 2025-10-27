import { CornerDownRight } from 'lucide-react'

import { type State } from '@/components/form/useFormState'
import { deriveFollowupId } from '@/lib/derive-ids'
import { type Field, type Form, type Page, type SelectableField } from '@/types/form'

export default function FormEmail({ form, data }: { form: Form, data: State }) {
  const pages = form.pages.flat()
  return (
    <div className="flex flex-col gap-4 max-w-4xl bg-white p-8" style={{ fontFamily: 'sans-serif' }}>
      {pages.map((page, i) => <RenderPage page={page} key={i} data={data} />)}
    </div>
  )
}

function RenderPage({ page, data }: { page: Page, data: State }) {
  const fieldsArr = page.sections.filter(section => section.type === 'fields').map(({ fields }) => fields)
  return (
    <div>
      <h1 className="text-2xl bg-black text-white px-2 py-1 inline-block mb-4">{page.page}</h1>
      {fieldsArr.map((fields, i) => <RenderFields fields={fields} key={i} data={data} />)}
    </div>
  )
}

function RenderFields({ fields, data }: { fields: Field[], data: State }) {
  return <div>{fields.map((field, i) => <RenderField field={field} key={i} data={data} />)}</div>
}

function RenderField({ field, data }: { field: Field, data: State }) {
  return (
    <div className="flex mb-4 items-center" style={{ borderBottom: '1px solid #000' }}>
      <div className="w-64 px-2 shrink-0">
        <RenderLabel field={field} />
      </div>
      <div className="ml-8"><RenderValue field={field} data={data} /></div>
    </div>
  )
}

function RenderLabel({ field }: { field: Field }) {
  const { label, type } = field
  const hasPlaceholder = (type === 'text' || type === 'select' || type === 'multi-select') && field.placeholder
  return (
    <div>
      {label && !hasPlaceholder && <div className="leading-tight">{label}</div>}
      {hasPlaceholder && <div className="leading-tight">{field.placeholder}</div>}
    </div>
  )
}

function RenderValue({ field, data }: { field: Field, data: State }) {
  const { type, id } = field
  const value = data[id]
  const className = 'bg-amber-200 px-2 pt-1'
  switch (type) {
    case 'text': return <div className={className}>{value as string}</div>
    case 'date-picker': {
      const date = new Date(value as string)
      return <div className={className}>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    }
    case 'weight': return (
      <div className={className}>
        {value as string}
        &nbsp;kg
      </div>
    )
    case 'height': return (
      <div className={className}>
        {value as string}
        &nbsp;cm
      </div>
    )
    case 'select': return (
      <div>
        <span className={className}><RenderSelectedOption field={field} option={value as string} /></span>
        <RenderFollowup field={field} option={value as string} data={data} />
      </div>
    )
    case 'multi-select': return (
      <div>
        <ul className="list-disc">
          {(value as string[]).map((option, i) => (
            <li key={i}>
              <span className={className}><RenderSelectedOption field={field} option={option} /></span>
              <RenderFollowup field={field} option={option} data={data} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function RenderSelectedOption({ field, option }: { field: SelectableField, option: string }) {
  const { options } = field
  if (options instanceof Array)
    return option
  else
    return options[option]
}

function RenderFollowup({ field, option, data }: { field: SelectableField, option: string, data: State }) {
  const { followup } = field
  if (!followup) return null
  if (!followup[option]) return null
  const next = { ...followup[option], id: deriveFollowupId(field, option) }
  return (
    <div className="flex ml-4">
      <CornerDownRight className="text-slate-500 shrink-0" />
      <div className="mt-2">
        <RenderLabel field={next} />
        <RenderValue field={next} data={data} />
      </div>
    </div>
  )
}
