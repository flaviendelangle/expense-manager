import { ResponsiveLine } from '@nivo/line'
import { eachDayOfInterval, format, startOfDay, startOfMonth } from 'date-fns'
import { orderBy, uniqBy, sumBy } from 'lodash'
import * as React from 'react'

import { ExpenseBasicInformation } from '@hooks/useExpenses'
import { useNivoCustomization } from '@hooks/useNivoCustomization'

export const ExpenseTimeline: React.VoidFunctionComponent<ExpenseTimelineProps> = ({
  data,
}) => {
  const nivoCustomization = useNivoCustomization()

  const max = React.useMemo(
    () => sumBy(data, (expense) => expense.value) * 1.1,
    [data]
  )

  const lineData = React.useMemo(() => {
    if (data.length < 2) {
      return []
    }

    const orderedData = orderBy(data, (el) => new Date(el.spentAt).getTime())

    const startDate = startOfMonth(new Date(orderedData[0].spentAt))
    const endDate = startOfDay(
      new Date(orderedData[orderedData.length - 1].spentAt)
    )

    const days = eachDayOfInterval({
      start: startDate,
      end: endDate,
    })

    const categoryGroups = uniqBy(
      data.map((expense) => expense.category.categoryGroup),
      (group) => group.id
    ).map((group) => ({
      id: group.name,
      data: days.map((day) => ({ x: format(day, 'yyyy-MM-dd'), y: 0 })),
    }))

    for (const expense of orderedData) {
      const expenseCategoryGroupIndex = categoryGroups.findIndex(
        (group) => group.id === expense.category.categoryGroup.name
      )

      const expenseDay = new Date(expense.spentAt).getDate()

      for (let i = expenseDay; i < days.length; i++) {
        categoryGroups[expenseCategoryGroupIndex].data[i].y += expense.value
      }
    }

    return orderBy(
      categoryGroups,
      (group) => group.data[group.data.length - 1].y
    )
  }, [data])

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
        format: '%b %d',
        tickValues: 'every 2 days',
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

interface ExpenseTimelineProps {
  data: ExpenseBasicInformation[]
}
