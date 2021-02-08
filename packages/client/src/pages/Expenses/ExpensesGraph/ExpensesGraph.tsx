import { ResponsivePie } from '@nivo/pie'
import * as React from 'react'

import { stringifyColor, useThemeVariant } from '@habx/ui-core'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { ExpensesGraphContainer } from './ExpensesGraph.style'

const NO_DATA: ExpenseBasicInformation[] = []

type GraphDataLine = { id: string; label: string; value: number }

export const ExpensesGraph: React.VoidFunctionComponent<ExpensesGraphProps> = ({
  data = NO_DATA,
}) => {
  const theme = useThemeVariant()

  const pieData = React.useMemo(() => {
    const temp: {
      [categoryId: string]: GraphDataLine
    } = {}

    for (const expense of data) {
      if (!temp[expense.category.id]) {
        temp[expense.category.id] = {
          id: expense.category.id,
          label: expense.category.name,
          value: 0,
        }
      }

      temp[expense.category.id].value += expense.value
    }

    return Object.values(temp)
  }, [data])

  return (
    <ExpensesGraphContainer>
      <ResponsivePie<GraphDataLine>
        data={pieData}
        sortByValue
        innerRadius={0.5}
        cornerRadius={3}
        padAngle={1}
        radialLabel={(d) => `${d.data.label} (${d.formattedValue})`}
        radialLabelsTextColor={stringifyColor(theme.typography.colors.text)}
      />
    </ExpensesGraphContainer>
  )
}

interface ExpensesGraphProps {
  data: ExpenseBasicInformation[]
}
