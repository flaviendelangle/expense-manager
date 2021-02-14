import {
  FocusedInput,
  useDatepicker,
  UseDatepickerProps,
} from '@datepicker-react/hooks'

import { TextInputProps } from '@habx/ui-core'

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

export interface DatePickerProps
  extends Pick<UseDatepickerProps, 'exactMinBookingDays'>,
    Omit<TextInputProps, 'value' | 'onChange' | 'containerRef'> {
  onChange: (value: DatePickerValue) => void
  value: DatePickerValue
  inputDateFormat?: string
}

export interface DatePickerPanelProps extends DatePickerProps {
  onAbort: () => void
}

export interface DatePickerState {
  startDate: Date | null
  endDate: Date | null
  focusedInput: FocusedInput
}
