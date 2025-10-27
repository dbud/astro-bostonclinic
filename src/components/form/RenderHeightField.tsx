import { useState } from 'react'

import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { HeightField } from '@/types/form'

import { InputGroupNumberInput } from './InputGroupNumberInput'
import { useFormFieldState } from './useFormState'

type Mode = 'cm' | 'ft/in'

const CM_PER_IN = 2.54
const CM_PER_FT = 30.48

function recalcFromCm(cm: number, mode: Mode) {
  switch (mode) {
    case 'cm':
      return { ft: 0, inch: 0 }
    case 'ft/in': {
      const ft = Math.floor(cm / CM_PER_FT)
      const inch = Math.round(((cm - ft * CM_PER_FT) / CM_PER_IN) * 10) / 10
      return { ft, inch }
    }
  }
}

export default function RenderHeightField({ field }: { field: HeightField }) {
  const { value, setValue } = useFormFieldState<number>(field)
  const [mode, setMode] = useState<Mode>('cm')

  const cm = Math.round(Number(value))
  const setCm = (value: number | undefined) => {
    const num = Number(value)
    setValue((Number.isNaN(num) ? null : Math.round(num)))
  }

  const { ft: initialFt, inch: initialInch } = recalcFromCm(cm, mode)
  const [ft, setFt] = useState<number>(initialFt)
  const [inch, setInch] = useState<number>(initialInch)

  let inputs = null
  switch (mode) {
    case 'cm':
      inputs = (
        <InputGroup>
          <InputGroupNumberInput
            type="number"
            value={cm}
            onChange={setCm}
          />
          <InputGroupAddon align="inline-end">cm</InputGroupAddon>
        </InputGroup>
      )
      break
    case 'ft/in':
      inputs = (
        <>
          <InputGroup>
            <InputGroupNumberInput
              type="number"
              value={ft}
              onChange={(ft = 0) => {
                setFt(ft)
                setCm(Math.round(ft * CM_PER_FT + inch * CM_PER_IN))
              }}
            />
            <InputGroupAddon align="inline-end">ft</InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupNumberInput
              type="number"
              value={inch}
              onChange={(inch = 0) => {
                setInch(inch)
                setCm(Math.round(ft * CM_PER_FT + inch * CM_PER_IN))
              }}
            />
            <InputGroupAddon align="inline-end">in</InputGroupAddon>
          </InputGroup>
        </>
      )
  }

  const switchToMode = (newMode: Mode) => {
    setMode(newMode)
    const { ft, inch } = recalcFromCm(cm, newMode)
    setFt(ft)
    setInch(inch)
  }

  return (
    <div className="flex flex-row justify-between gap-4">
      {inputs}
      <ToggleGroup type="single" variant="outline" value={mode}>
        {(
          ['cm', 'ft/in'] as Mode[]
        ).map(m => (
          <ToggleGroupItem value={m} key={m} onClick={() => switchToMode(m)}>
            <span className="p-2">{m}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
