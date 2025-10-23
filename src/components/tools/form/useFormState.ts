import { createContext, type Dispatch, type SetStateAction, useContext } from 'react'

import { type Field } from '@/types/form'

export type State = Record<string, unknown>

type StateContextType = {
  state: State
  setState: Dispatch<SetStateAction<State>>
  validate: (field: Field) => boolean
}
export const StateContext = createContext<StateContextType>(null!)

export default function useFormState() {
  return useContext(StateContext)
}

export function useFormFieldState<T>(field: Field) {
  const { state, setState } = useFormState()

  return {
    value: state[field.id] as T,
    setValue: (value: T | undefined | null | ((prev: T | undefined | null) => T | undefined | null)) => {
      setState((prevState) => {
        const prevValue = prevState[field.id] as T | undefined | null
        const nextValue = typeof value === 'function'
          ? (value as (prev: T | undefined | null) => T | undefined | null)(prevValue)
          : value
        return { ...prevState, [field.id]: nextValue }
      })
    },
  }
}
