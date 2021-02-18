import {
  FocusedInput,
  useDatepicker,
  UseDatepickerProps,
} from '@datepicker-react/hooks'
import * as React from 'react'

import { WithLabel } from '@habx/ui-core'

export interface DatePickerContextValue
  extends Pick<
    ReturnType<typeof useDatepicker>,
    | 'focusedDate'
    | 'isDateFocused'
    | 'isDateSelected'
    | 'isDateHovered'
    | 'isDateBlocked'
    | 'isFirstOrLastSelectedDate'
    | 'onDateSelect'
    | 'onDateFocus'
    | 'onDateHover'
  > {}

export type DatePickerValue = { start: Date | null; end: Date | null } | null

export interface DatePickerInnerProps
  extends Pick<UseDatepickerProps, 'exactMinBookingDays'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange: (value: DatePickerValue) => void
  value: DatePickerValue
  inputDateFormat?: string
  small?: boolean
  disabled?: boolean
  error?: boolean
}

export interface DatePickerPanelProps extends DatePickerInnerProps {
  onAbort: () => void
}

export interface DatePickerProps extends WithLabel<DatePickerInnerProps> {}

export interface DatePickerState {
  startDate: Date | null
  endDate: Date | null
  focusedInput: FocusedInput
}
