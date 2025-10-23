import { useState } from 'react'

import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { WeightField } from '@/types/form'

import { InputGroupNumberInput } from './InputGroupNumberInput'
import Required from './Required'
import useFormState from './useFormState'

type Mode = 'kg' | 'st/lbs' | 'lbs'

const ST = 6.35029318 // kg
const LBS = 0.45359237 // kg

function recalcFromKg(kg: number, mode: Mode) {
  switch (mode) {
    case 'kg': return { st: 0, lbs: 0 }
    case 'st/lbs': {
      const st = Math.floor(kg / ST)
      const lbs = Math.floor((kg - st * ST) / LBS)
      return { st, lbs }
    }
    case 'lbs': return { st: 0, lbs: Math.floor(kg / LBS) }
  }
}

export default function RenderWeightField({ field }: { field: WeightField }) {
  const { state, setState } = useFormState()
  const [mode, setMode] = useState<Mode>('kg')

  const kg = Number(state[field.id])
  const setKg = (value: unknown) => {
    const num = Number(value)
    const rounded = Number.isNaN(num) ? null : Math.round(num * 10) / 10
    setState({ ...state, [field.id]: rounded })
  }

  const { st: initialSt, lbs: initialLbs } = recalcFromKg(kg, mode)
  const [st, setSt] = useState<number>(initialSt)
  const [lbs, setLbs] = useState<number>(initialLbs)

  let inputs = null
  switch (mode) {
    case 'kg':
      inputs = (
        <InputGroup>
          <InputGroupNumberInput type="number" value={kg} onChange={setKg} />
          <InputGroupAddon align="inline-end">kg</InputGroupAddon>
        </InputGroup>
      )
      break
    case 'lbs':
      inputs = (
        <InputGroup>
          <InputGroupNumberInput
            type="number"
            value={lbs}
            onChange={(lbs = 0) => {
              setLbs(lbs)
              setKg(lbs * LBS)
            }}
          />
          <InputGroupAddon align="inline-end">lbs</InputGroupAddon>
        </InputGroup>
      )
      break
    case 'st/lbs':
      inputs = (
        <>
          <InputGroup>
            <InputGroupNumberInput
              type="number"
              value={st}
              onChange={(st = 0) => {
                setSt(st)
                setKg(st * ST + lbs * LBS)
              }}
            />
            <InputGroupAddon align="inline-end">st</InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupNumberInput
              type="number"
              value={lbs}
              onChange={(lbs = 0) => {
                setLbs(lbs)
                setKg(st * ST + lbs * LBS)
              }}
            />
            <InputGroupAddon align="inline-end">lbs</InputGroupAddon>
          </InputGroup>
        </>
      )
  }

  const switchToMode = (newMode: Mode) => {
    setMode(newMode)
    const { st, lbs } = recalcFromKg(kg, newMode)
    setSt(st)
    setLbs(lbs)
  }

  return (
    <Required field={field}>
      <div className="flex flex-row justify-between gap-4">
        {inputs}
        <ToggleGroup type="single" variant="outline" value={mode}>
          {(
            ['kg', 'st/lbs', 'lbs'] as Mode[]
          ).map(m => (
            <ToggleGroupItem value={m} key={m} onClick={() => switchToMode(m)}>
              <span className="p-2">{m}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </Required>
  )
}
