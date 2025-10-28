import { type Field } from '@/types/form'

import RenderAcknowledgementField from './RenderAcknowledgementField'
import RenderDatePickerField from './RenderDatePickerField'
import RenderHeightField from './RenderHeightField'
import RenderMultiSelectField from './RenderMultiSelectField'
import RenderSelectField from './RenderSelectField'
import RenderTextField from './RenderTextField'
import RenderWeightField from './RenderWeightField'

export default function RenderField({ field }: { field: Field }) {
  switch (field.type) {
    case 'text':
      return <RenderTextField field={field} />
    case 'select':
      return <RenderSelectField field={field} />
    case 'multi-select':
      return <RenderMultiSelectField field={field} />
    case 'date-picker':
      return <RenderDatePickerField field={field} />
    case 'weight':
      return <RenderWeightField field={field} />
    case 'height':
      return <RenderHeightField field={field} />
    case 'acknowledgement':
      return <RenderAcknowledgementField field={field} />
  }
}
