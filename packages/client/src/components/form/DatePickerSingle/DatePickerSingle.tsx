import * as React from 'react'

import {
  DatePicker,
  DatePickerProps,
  DatePickerValue,
} from '@components/form/DatePicker'

export const DatePickerSingle: React.VoidFunctionComponent<DatePickerSingleProps> = ({
  value,
  onChange,
  ...props
}) => {
  const cleanValue = React.useMemo<DatePickerValue>(
    () => ({ start: value, end: value }),
    [value]
  )

  const handleChange = React.useCallback(
    (newValue: DatePickerValue | null) => onChange(newValue?.start ?? null),
    [onChange]
  )

  return (
    <DatePicker
      value={cleanValue}
      onChange={handleChange}
      exactMinBookingDays
      {...props}
    />
  )
}

interface DatePickerSingleProps
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'exactMinBookingDays'> {
  value: Date | null
  onChange: (value: Date | null) => void
}
