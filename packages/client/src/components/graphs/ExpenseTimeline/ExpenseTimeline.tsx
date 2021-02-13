import { ResponsiveBar, BarMouseEventHandler } from '@nivo/bar'
import {
  startOfDay,
  startOfMonth,
  differenceInCalendarDays,
  startOfWeek,
  format,
  isAfter,
} from 'date-fns'
import { orderBy } from 'lodash'
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

export const ExpenseTimeline: React.VoidFunctionComponent<InnerExpenseTimelineProps> = ({
  data,
}) => {
  const [selectedInterval, setSelectedInterval] = React.useState<{
    start: Date | null
    end: Date | null
  } | null>(null)

  const filteredData = React.useMemo(() => {
    if (!selectedInterval) {
      return data
    }

    return data.filter((expense) => {
      const expenseDate = new Date(expense.spentAt)

      if (
        selectedInterval.start &&
        isAfter(selectedInterval.start, expenseDate)
      ) {
        return false
      }

      if (selectedInterval.end && isAfter(expenseDate, selectedInterval.end)) {
        return false
      }

      return true
    })
  }, [data, selectedInterval])

  const precision = React.useMemo(() => {
    const expensesDate = filteredData.map((expense) =>
      new Date(expense.spentAt).getTime()
    )
    const startDate = Math.min(...expensesDate)
    const endDate = Math.max(...expensesDate)

    const timeLengthInDays = differenceInCalendarDays(endDate, startDate)

    if (timeLengthInDays < 28) {
      return TimelinePrecision.OneDay
    }

    if (timeLengthInDays < 200) {
      return TimelinePrecision.OneWeek
    }

    return TimelinePrecision.OneMonth
  }, [filteredData])

  const precisionConfig = PRECISIONS_CONFIG[precision]

  const nivoCustomization = useNivoCustomization()

  const { barData, barKeys } = React.useMemo(() => {
    const tempBarData: { [timestamp: number]: any } = {}
    const tempBarKeys: { [key: string]: number } = {}

    for (const expense of filteredData) {
      const expenseVisibleDate = precisionConfig.getDate(
        new Date(expense.spentAt)
      )

      const expenseVisibleTimestamp = expenseVisibleDate.getTime()

      const key = expense.category.categoryGroup.name

      if (!tempBarKeys[key]) {
        tempBarKeys[key] = 0
      }

      tempBarKeys[key] += expense.value

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
      barData: orderBy(
        Object.values(tempBarData),
        (line) => new Date(line.date)
      ),
      barKeys: orderBy(Object.entries(tempBarKeys), ([, value]) => -value).map(
        ([key]) => key
      ),
    }
  }, [filteredData, precisionConfig])

  const handleClickItem = React.useCallback<BarMouseEventHandler>(
    (datum) => {
      if (precision === TimelinePrecision.OneDay) {
        setSelectedInterval(null)
      } else {
        const startDate = new Date(barData[datum.index].date)
        const endDate =
          datum.index === barData.length - 1
            ? null
            : new Date(barData[datum.index + 1].date)

        setSelectedInterval({ start: startDate, end: endDate })
      }
    },
    [barData, precision]
  )

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
      onClick={handleClickItem}
      {...nivoCustomization}
    />
  )
}

interface InnerExpenseTimelineProps {
  data: ExpenseBasicInformation[]
}
