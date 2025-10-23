import { useEffect, useState } from 'react'

import { InputGroupInput } from '@/components/ui/input-group'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number | undefined
  onChange: (value: number | undefined) => void
}

export function InputGroupNumberInput({ value, onChange, ...props }: Props) {
  const [text, setText] = useState(value?.toString() ?? '')

  useEffect(() => {
    setText(value?.toString() ?? '')
  }, [value])

  return (
    <InputGroupInput
      {...props}
      type="number"
      value={text}
      onChange={(e) => {
        const t = e.target.value
        setText(t)

        if (t === '') {
          onChange(undefined)
          return
        }

        const num = Number(t)
        if (!Number.isNaN(num)) {
          onChange(num)
        }
      }}
      onBlur={() => {
        if (text === '') return
        const num = Number(text)
        setText(Number.isNaN(num) ? '' : num.toString())
      }}
    />
  )
}
