import * as React from 'react'

import { DatePickerContextValue } from './DatePicker.interface'

const DATE_PICKER_CONTEXT_DEFAULT_VALUE: DatePickerContextValue = {
  focusedDate: null,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {},
}

export const DatePickerContext = React.createContext<DatePickerContextValue>(
  DATE_PICKER_CONTEXT_DEFAULT_VALUE
)
