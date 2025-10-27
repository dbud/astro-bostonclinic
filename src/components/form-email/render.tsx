import { Body, Html, pixelBasedPreset, render, Tailwind } from '@react-email/components'

import { type State } from '@/components/form/useFormState'
import { type Form } from '@/types/form'

import FormEmail from './FormEmail'

export default async function renderFormEmail(props: { form: Form, data: State }) {
  const node = (
    <Html>
      <Body>
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
          <FormEmail {...props} />
        </Tailwind>
      </Body>
    </Html>
  )
  return await render(node)
}
