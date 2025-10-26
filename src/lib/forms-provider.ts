import formConsultationWeightLoss from '@/data/form/consultation/weight-loss.yaml'
import type { Form } from '@/types/form'

export type FormId = 'form/consultation/weight-loss' // | ... | ...

const forms = [formConsultationWeightLoss]

export default function getForm(formId: FormId): Form {
  const form = forms.find(({ id }) => id === formId)
  if (!form) throw new Error(`No form with id=${formId}`)
  return form
}
