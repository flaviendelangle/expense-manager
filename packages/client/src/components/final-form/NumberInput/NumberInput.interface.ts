import { TextInputProps } from '@habx/ui-core'

export interface NumberInputProps
  extends Omit<TextInputProps, 'onChange' | 'value'> {
  factor?: number
  onChange: (value: number | null) => void
  value?: number | null
}
