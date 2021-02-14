import {
  OnDatesChangeProps,
  START_DATE,
  useDatepicker,
} from '@datepicker-react/hooks'
import { isSameDay } from 'date-fns'
import * as React from 'react'

import { ActionBar, Button } from '@habx/ui-core'

import { DatePickerContext } from './DatePicker.context'
import {
  DatePickerContextValue,
  DatePickerPanelProps,
  DatePickerState,
} from './DatePicker.interface'
import {
  DatePickerPanelContainer,
  DatePickerMonthsContainer,
} from './DatePicker.style'
import { Month } from './Month'

export const DatePickerPanel: React.VoidFunctionComponent<DatePickerPanelProps> = ({
  value,
  onChange,
  onAbort,
  exactMinBookingDays,
}) => {
  const [state, setState] = React.useState<DatePickerState>({
    startDate: value?.start ?? null,
    endDate: value?.end ?? null,
    focusedInput: START_DATE,
  })

  React.useLayoutEffect(() => {
    const isVisibleDateEqual = (
      newValue: Date | null | undefined,
      currentValue: Date | null
    ) => {
      if (!newValue || !currentValue) {
        if (newValue && !currentValue) {
          return false
        }

        if (!newValue && currentValue) {
          return false
        }

        return true
      }

      return isSameDay(newValue, currentValue)
    }

    const isStartDateEqual = isVisibleDateEqual(value?.start, state.startDate)
    const isEndDateEqual = isVisibleDateEqual(value?.end, state.endDate)

    if (!isStartDateEqual || !isEndDateEqual) {
      setState({
        focusedInput: START_DATE,
        startDate: value?.start ?? null,
        endDate: value?.end ?? null,
      })
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = React.useCallback((data: OnDatesChangeProps) => {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE })
    } else {
      setState(data)
    }
  }, [])

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput,
    onDatesChange: handleDateChange,
    exactMinBookingDays,
  })

  const context = React.useMemo<DatePickerContextValue>(
    () => ({
      focusedDate,
      isDateFocused,
      isDateSelected,
      isDateHovered,
      isDateBlocked,
      isFirstOrLastSelectedDate,
      onDateSelect,
      onDateFocus,
      onDateHover,
    }),
    [
      focusedDate,
      isDateBlocked,
      isDateFocused,
      isDateHovered,
      isDateSelected,
      isFirstOrLastSelectedDate,
      onDateFocus,
      onDateHover,
      onDateSelect,
    ]
  )

  return (
    <DatePickerContext.Provider value={context}>
      <DatePickerPanelContainer
        backgroundColor={(theme) => theme.defaultBackground}
      >
        <DatePickerMonthsContainer>
          {activeMonths.map((month, monthIndex) => (
            <Month
              key={`${month.year}-${month.month}`}
              year={month.year}
              month={month.month}
              firstDayOfWeek={firstDayOfWeek}
              goToPreviousMonths={
                monthIndex === 0 ? goToPreviousMonths : undefined
              }
              goToNextMonths={
                monthIndex === activeMonths.length - 1
                  ? goToNextMonths
                  : undefined
              }
            />
          ))}
        </DatePickerMonthsContainer>
        <ActionBar>
          <Button ghost error onClick={onAbort}>
            Annuler
          </Button>
          <Button
            onClick={() =>
              onChange({ start: state.startDate, end: state.endDate })
            }
          >
            Valider
          </Button>
        </ActionBar>
      </DatePickerPanelContainer>
    </DatePickerContext.Provider>
  )
}
