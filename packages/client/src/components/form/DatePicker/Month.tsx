import { FirstDayOfWeek, useMonth } from '@datepicker-react/hooks'
import * as React from 'react'

import {
  MonthContainer,
  MonthHeader,
  MonthTable,
  MonthTableContent,
  MonthTableHeader,
  MonthTableHeaderCell,
  MonthHeaderNavigationButton,
  MonthHeaderLabel,
} from './DatePicker.style'
import { Day } from './Day'

export const Month: React.VoidFunctionComponent<MonthProps> = ({
  year,
  month,
  firstDayOfWeek,
  goToNextMonths,
  goToPreviousMonths,
}) => {
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
  })

  return (
    <MonthContainer>
      <MonthHeader>
        <MonthHeaderNavigationButton
          icon="chevron-west"
          data-active={!!goToPreviousMonths}
          onClick={(e) => {
            e.stopPropagation()
            goToPreviousMonths?.()
          }}
          small
        />
        <MonthHeaderLabel>{monthLabel}</MonthHeaderLabel>
        <MonthHeaderNavigationButton
          icon="chevron-east"
          data-active={!!goToNextMonths}
          onClick={(e) => {
            e.stopPropagation()
            goToNextMonths?.()
          }}
          small
        />
      </MonthHeader>
      <MonthTable>
        <MonthTableHeader>
          {weekdayLabels.map((dayLabel) => (
            <MonthTableHeaderCell key={dayLabel}>
              {dayLabel}
            </MonthTableHeaderCell>
          ))}
        </MonthTableHeader>
        <MonthTableContent>
          {days.map((day, index) => {
            if (typeof day === 'object') {
              return (
                <Day
                  date={day.date}
                  key={day.date.toString()}
                  dayLabel={day.dayLabel}
                />
              )
            }

            return <div key={index} />
          })}
        </MonthTableContent>
      </MonthTable>
    </MonthContainer>
  )
}

interface MonthProps {
  year: number
  month: number
  firstDayOfWeek: FirstDayOfWeek
  goToPreviousMonths?: () => void
  goToNextMonths?: () => void
}
