import { ResponsiveBar } from '@nivo/bar'
import {
  startOfDay,
  startOfMonth,
  differenceInCalendarDays,
  startOfWeek,
  format,
} from 'date-fns'
import * as React from 'react'

import { Text } from '@habx/ui-core'

import { ExpenseBasicInformation } from '@hooks/useExpenses'
import { useNivoCustomization } from '@hooks/useNivoCustomization'

type Precision = {
  axis: {
    format: string
    tickValues: string
  }
  getDate: (date: Date) => Date
  formatDate: (date: string) => string
}

enum TimelinePrecision {
  OneDay,
  OneWeek,
  OneMonth,
}

const PRECISIONS_CONFIG: Record<TimelinePrecision, Precision> = {
  [TimelinePrecision.OneDay]: {
    axis: {
      format: '%b %d',
      tickValues: 'every 1 day',
    },
    getDate: startOfDay,
    formatDate: (date: string) => format(new Date(date), 'yyyy-MM-dd'),
  },
  [TimelinePrecision.OneWeek]: {
    axis: {
      format: '%d/%m',
      tickValues: 'every 1 week',
    },
    getDate: startOfWeek,
    formatDate: (date: string) => format(new Date(date), 'yyyy-MM-dd'),
  },
  [TimelinePrecision.OneMonth]: {
    axis: {
      format: '%m/%y',
      tickValues: 'every 1 month',
    },
    getDate: startOfMonth,
    formatDate: (date: string) => format(new Date(date), 'MM/yyyy'),
  },
}

const InnerExpenseTimeline: React.VoidFunctionComponent<ExpenseTimelineProps> = ({
  data,
}) => {
  const precision = React.useMemo(() => {
    const expensesDate = data.map((expense) =>
      new Date(expense.spentAt).getTime()
    )
    const startDate = Math.min(...expensesDate)
    const endDate = Math.max(...expensesDate)

    const timeLengthInDays = differenceInCalendarDays(endDate, startDate)

    if (timeLengthInDays < 30) {
      return TimelinePrecision.OneDay
    }

    if (timeLengthInDays < 200) {
      return TimelinePrecision.OneWeek
    }

    return TimelinePrecision.OneMonth
  }, [data])

  const precisionConfig = PRECISIONS_CONFIG[precision]

  const nivoCustomization = useNivoCustomization()

  const { barData, barKeys } = React.useMemo(() => {
    const tempBarData: { [timestamp: number]: any } = {}
    const tempBarKeys: string[] = []

    for (const expense of data) {
      const expenseVisibleDate = precisionConfig.getDate(
        new Date(expense.spentAt)
      )

      const expenseVisibleTimestamp = expenseVisibleDate.getTime()

      const key = expense.category.categoryGroup.name

      if (!tempBarKeys.includes(key)) {
        tempBarKeys.push(key)
      }

      if (!tempBarData[expenseVisibleTimestamp]) {
        tempBarData[expenseVisibleTimestamp] = {
          date: expenseVisibleDate.toISOString(),
        }
      }

      if (!tempBarData[expenseVisibleTimestamp][key]) {
        tempBarData[expenseVisibleTimestamp][key] = 0
      }

      tempBarData[expenseVisibleTimestamp][key] += expense.value
    }

    return {
      barData: Object.values(tempBarData),
      barKeys: tempBarKeys,
    }
  }, [data, precisionConfig])

  return (
    <ResponsiveBar
      data={barData}
      keys={barKeys}
      indexBy="date"
      margin={{ top: 0, right: 120, bottom: 48, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      axisLeft={{
        legend: 'Dépense',
        legendPosition: 'middle',
        legendOffset: -48,
        format: (value) => `${value}€`,
      }}
      axisBottom={{
        format: (value) => precisionConfig.formatDate(value as string),
      }}
      labelSkipWidth={36}
      labelSkipHeight={14}
      labelFormat={(value) => `${Math.floor(value as number)}€`}
      tooltip={({ id, value }) => (
        <Text type="caption">
          {id}: {Math.floor(value)}€
        </Text>
      )}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 12,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          symbolSize: 20,
        },
      ]}
      {...nivoCustomization}
    />
  )
}

export const ExpenseTimeline: React.VoidFunctionComponent<ExpenseTimelineProps> = ({
  data,
  ...props
}) => {
  if (data.length < 2) {
    return null
  }

  return <InnerExpenseTimeline data={data} {...props} />
}

interface ExpenseTimelineProps {
  data: ExpenseBasicInformation[]
}
