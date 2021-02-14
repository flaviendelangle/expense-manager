import { useDay } from '@datepicker-react/hooks'
import * as React from 'react'

import { DatePickerContext } from './DatePicker.context'
import { DayContainer } from './DatePicker.style'

export const Day: React.VoidFunctionComponent<DayProps> = ({
  date,
  dayLabel,
}) => {
  const dayRef = React.useRef<HTMLButtonElement>(null)
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
  } = React.useContext(DatePickerContext)

  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  })

  const state = React.useMemo(() => {
    if (isSelectedStartOrEnd) {
      return 'selected-start-or-end'
    }
    if (isSelected) {
      return 'selected'
    }
    if (isWithinHoverRange) {
      return 'within-hover-range'
    }
    if (disabledDate) {
      return 'disabled'
    }
  }, [disabledDate, isSelected, isSelectedStartOrEnd, isWithinHoverRange])

  if (!dayLabel) {
    return <div />
  }

  return (
    <DayContainer
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      data-state={state}
    >
      {dayLabel}
    </DayContainer>
  )
}

interface DayProps {
  date: Date
  dayLabel: string
}
