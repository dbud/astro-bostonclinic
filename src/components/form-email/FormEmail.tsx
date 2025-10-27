import { CornerDownRight } from 'lucide-react'

import useFormState, { type State, StateContext } from '@/components/form/useFormState'
import { deriveFollowupId } from '@/lib/derive-ids'
import { type Field, type Form, type Page, type SelectableField } from '@/types/form'

export default function FormEmail({ form, data }: { form: Form, data: State }) {
  const pages = form.pages.flat()
  return (
    <StateContext.Provider value={{ state: data, setState: () => { }, validate: () => true, currentPage: 0, pages: 0 }}>
      <div className="flex flex-col gap-4 max-w-4xl bg-white p-8" style={{ fontFamily: 'sans-serif' }}>
        {pages.map((page, i) => <RenderPage page={page} key={i} />)}
      </div>
    </StateContext.Provider>
  )
}

function RenderPage({ page }: { page: Page }) {
  const fieldsArr = page.sections.filter(section => section.type === 'fields').map(({ fields }) => fields)
  return (
    <div>
      <h1 className="text-2xl bg-black text-white px-2 py-1 inline-block mb-4">{page.page}</h1>
      {fieldsArr.map((fields, i) => <RenderFields fields={fields} key={i} />)}
    </div>
  )
}

function RenderFields({ fields }: { fields: Field[] }) {
  return <>{fields.map((field, i) => <RenderField field={field} key={i} />)}</>
}

function RenderField({ field }: { field: Field }) {
  return (
    <div className="flex border-b border-black mb-4 items-center">
      <div className="w-3xs px-2 shrink-0">
        <RenderLabel field={field} />
      </div>
      <div className="ml-8"><RenderValue field={field} /></div>
    </div>
  )
}

function RenderLabel({ field }: { field: Field }) {
  const { label, type } = field
  const hasPlaceholder = (type === 'text' || type === 'select' || type === 'multi-select') && field.placeholder
  return (
    <div>
      {label && !hasPlaceholder && <p className="leading-tight">{label}</p>}
      {hasPlaceholder && <p className="leading-tight">{field.placeholder}</p>}
    </div>
  )
}

function RenderValue({ field }: { field: Field }) {
  const { type, id } = field
  const { state } = useFormState()
  const value = state[id]
  const className = 'bg-amber-200 px-2 pt-1'
  switch (type) {
    case 'text': return <p className={className}>{value as string}</p>
    case 'date-picker': {
      const date = new Date(value as string)
      return <p className={className}>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    }
    case 'weight': return (
      <p className={className}>
        {value as string}
        &nbsp;kg
      </p>
    )
    case 'height': return (
      <p className={className}>
        {value as string}
        &nbsp;cm
      </p>
    )
    case 'select': return (
      <>
        <span className={className}><RenderSelectedOption field={field} option={value as string} /></span>
        <RenderFollowup field={field} option={value as string} />
      </>
    )
    case 'multi-select': return (
      <>
        <ul className="list-disc">
          {(value as string[]).map((option, i) => (
            <li key={i}>
              <span className={className}><RenderSelectedOption field={field} option={option} /></span>
              <RenderFollowup field={field} option={option} />
            </li>
          ))}
        </ul>
      </>
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

function RenderFollowup({ field, option }: { field: SelectableField, option: string }) {
  const { followup } = field
  if (!followup) return null
  if (!followup[option]) return null
  const next = { ...followup[option], id: deriveFollowupId(field, option) }
  return (
    <div className="flex ml-4">
      <CornerDownRight className="text-slate-500 shrink-0" />
      <div className="mt-2">
        <RenderLabel field={next} />
        <RenderValue field={next} />
      </div>
    </div>
  )
}
