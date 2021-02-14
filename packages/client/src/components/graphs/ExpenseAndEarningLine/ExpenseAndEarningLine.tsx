import { ResponsiveLine } from '@nivo/line'
import { format, startOfMonth } from 'date-fns'
import * as React from 'react'

import { EarningBasicInformation } from '@hooks/useEarnings'
import { ExpenseBasicInformation } from '@hooks/useExpenses'
import { useNivoCustomization } from '@hooks/useNivoCustomization'

type Line = {
  y: number
  x: string
}

export const ExpenseAndEarningLine: React.VoidFunctionComponent<ExpenseAndEarningLineProps> = ({
  expenses,
  earnings,
}) => {
  const nivoCustomization = useNivoCustomization()

  const data = React.useMemo(() => {
    const tempExpenses: { [timestamp: number]: Line } = {}
    const tempEarnings: { [timestamp: number]: Line } = {}

    for (const expense of expenses) {
      const expenseVisibleDate = startOfMonth(new Date(expense.spentAt))

      const expenseVisibleTimestamp = expenseVisibleDate.getTime()

      if (!tempExpenses[expenseVisibleTimestamp]) {
        tempExpenses[expenseVisibleTimestamp] = {
          x: format(expenseVisibleDate, 'yyyy-MM-dd'),
          y: 0,
        }
      }

      tempExpenses[expenseVisibleTimestamp].y += expense.value
    }

    for (const earning of earnings) {
      const earningVisibleDate = startOfMonth(new Date(earning.earnedAt))

      const earningVisibleTimestamp = earningVisibleDate.getTime()

      if (!tempEarnings[earningVisibleTimestamp]) {
        tempEarnings[earningVisibleTimestamp] = {
          x: format(earningVisibleDate, 'yyyy-MM-dd'),
          y: 0,
        }
      }

      tempEarnings[earningVisibleTimestamp].y += earning.value
    }

    return [
      { id: 'expenses', data: Object.values(tempExpenses) },
      { id: 'earnings', data: Object.values(tempEarnings) },
    ]
  }, [earnings, expenses])

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      curve="monotoneX"
      enablePointLabel={true}
      pointSize={14}
      pointLabelYOffset={-20}
      enableGridX={false}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      }}
      xFormat="time:%m/%y"
      yScale={{
        type: 'linear',
      }}
      axisLeft={{
        legend: 'Dépense',
        legendPosition: 'middle',
        legendOffset: -48,
        format: (value) => `${value}€`,
      }}
      axisBottom={{
        format: '%m/%y',
        tickValues: 'every 1 month',
        legendOffset: -12,
      }}
      useMesh={true}
      yFormat={(value) => `${Math.floor(value as number)}€`}
      {...nivoCustomization}
    />
  )
}

interface ExpenseAndEarningLineProps {
  expenses: ExpenseBasicInformation[]
  earnings: EarningBasicInformation[]
}
