import { ResponsiveLine } from '@nivo/line'
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
  startOfDay,
  startOfMonth,
  differenceInCalendarDays,
} from 'date-fns'
import { orderBy, uniqBy, sumBy } from 'lodash'
import * as React from 'react'

import { ExpenseBasicInformation } from '@hooks/useExpenses'
import { useNivoCustomization } from '@hooks/useNivoCustomization'

type Precision = {
  axis: {
    format: string
    tickValues: string
  }
  intervalBuilder: (interval: Interval) => Date[]
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
    intervalBuilder: eachDayOfInterval,
  },
  [TimelinePrecision.OneWeek]: {
    axis: {
      format: '%d/%m',
      tickValues: 'every 1 week',
    },
    intervalBuilder: eachWeekOfInterval,
  },
  [TimelinePrecision.OneMonth]: {
    axis: {
      format: '%m/%y',
      tickValues: 'every 1 month',
    },
    intervalBuilder: eachMonthOfInterval,
  },
}

const InnerExpenseTimeline: React.VoidFunctionComponent<ExpenseTimelineProps> = ({
  data,
}) => {
  const { orderedData, startDate, endDate } = React.useMemo(() => {
    const tempOrderedData = orderBy(data, (el) =>
      new Date(el.spentAt).getTime()
    )

    return {
      orderedData: tempOrderedData,
      startDate: startOfMonth(new Date(tempOrderedData[0].spentAt)),
      endDate: startOfDay(
        new Date(tempOrderedData[tempOrderedData.length - 1].spentAt)
      ),
    }
  }, [data])

  const precision = React.useMemo(() => {
    const timeLengthInDays = differenceInCalendarDays(endDate, startDate)

    if (timeLengthInDays < 30) {
      return TimelinePrecision.OneDay
    }

    if (timeLengthInDays < 365) {
      return TimelinePrecision.OneWeek
    }

    return TimelinePrecision.OneMonth
  }, [endDate, startDate])

  const precisionConfig = PRECISIONS_CONFIG[precision]

  const nivoCustomization = useNivoCustomization()

  const max = React.useMemo(
    () => sumBy(data, (expense) => expense.value) * 1.1,
    [data]
  )

  const lineData = React.useMemo(() => {
    if (data.length < 2) {
      return []
    }

    const snapshotDates = precisionConfig.intervalBuilder({
      start: startDate,
      end: endDate,
    })

    const categoryGroups = uniqBy(
      data.map((expense) => expense.expenseCategory.expenseCategoryGroup),
      (group) => group.id
    ).map((group) => ({
      id: group.name,
      data: snapshotDates.map((snapshotDate) => ({
        x: format(snapshotDate, 'yyyy-MM-dd'),
        y: 0,
      })),
    }))

    for (const expense of orderedData) {
      const expenseCategoryGroupIndex = categoryGroups.findIndex(
        (group) =>
          group.id === expense.expenseCategory.expenseCategoryGroup.name
      )

      const expenseDate = new Date(expense.spentAt)

      let i = snapshotDates.length - 1
      while (snapshotDates[i] > expenseDate) {
        categoryGroups[expenseCategoryGroupIndex].data[i].y += expense.value
        i--
      }
    }

    return orderBy(
      categoryGroups,
      (group) => group.data[group.data.length - 1].y
    )
  }, [data, endDate, orderedData, precisionConfig, startDate])

  return (
    <ResponsiveLine
      margin={{ left: 48, bottom: 48 }}
      animate
      data={lineData}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: 'linear',
        stacked: true,
        max,
      }}
      axisLeft={{
        legend: 'linear scale',
        legendOffset: 12,
      }}
      axisBottom={{
        ...precisionConfig.axis,
        legend: 'time scale',
        legendOffset: -12,
      }}
      curve="monotoneX"
      enableSlices="x"
      enableArea
      areaOpacity={0.7}
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
            }}
          >
            <div>x: {slice.id}</div>
            {slice.points.map((point) => (
              <div
                key={point.id}
                style={{
                  color: point.serieColor,
                  padding: '3px 0',
                }}
              >
                <strong>{point.serieId}</strong>{' '}
                {Math.floor(point.data.yFormatted as number)}€
              </div>
            ))}
          </div>
        )
      }}
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
