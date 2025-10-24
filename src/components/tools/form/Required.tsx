import { AsteriskIcon } from 'lucide-react'

import { type Field } from '@/types/form'

import useFormState from './useFormState'

export default function Required({ field, children }: { field: Field, children: React.ReactNode }) {
  const { validate } = useFormState()
  return validate(field)
    ? children
    : <Invalid>{children}</Invalid>
}

export function Invalid({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2">
        <AsteriskIcon className="text-red-500" size={16} />
      </div>
      {children}
    </div>
  )
}
