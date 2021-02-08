import * as React from 'react'

import { useIntl } from '@habx/lib-client-intl'
import { withFinalForm, useFormattedNumber } from '@habx/lib-form-helper'
import { TextInput } from '@habx/ui-core'

import { NumberInputProps } from './NumberInput.interface'

const InnerNumberInput: React.FunctionComponent<NumberInputProps> = ({
  factor,
  onChange,
  value,
  ...props
}) => {
  const intl = useIntl()

  const [formatted, handleChange] = useFormattedNumber({
    factor,
    intl,
    onChange,
    value,
  })

  return (
    <TextInput
      {...props}
      value={formatted}
      onChange={(event) => handleChange(event.target.value)}
    />
  )
}

export const NumberInput = withFinalForm<number>()(InnerNumberInput)
