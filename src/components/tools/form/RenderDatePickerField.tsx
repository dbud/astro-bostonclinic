import DatePicker from '@/components/ui/date-picker'
import type { DatePickerField } from '@/types/form'

import { useFormFieldState } from './useFormState'

export default function RenderDatePickerField({ field }: { field: DatePickerField }) {
  const { value, setValue } = useFormFieldState<Date>(field)
  return (
    <DatePicker value={value} onChange={date => setValue(date)} />
  )
}
