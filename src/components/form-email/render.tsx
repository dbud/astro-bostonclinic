import { Body, Html, pixelBasedPreset, Tailwind } from '@react-email/components'
import { pretty, render } from '@react-email/render'

import { type State } from '@/components/form/useFormState'
import { type Form } from '@/types/form'

import FormEmail from './FormEmail'

export default async function renderFormEmail(props: { form: Form, data: State }) {
  return await pretty(await render(
    <Html>
      <Body>
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
          <FormEmail {...props} />
        </Tailwind>
      </Body>
    </Html>,
  ))
}
