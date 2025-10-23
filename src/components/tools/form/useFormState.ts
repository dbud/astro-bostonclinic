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
