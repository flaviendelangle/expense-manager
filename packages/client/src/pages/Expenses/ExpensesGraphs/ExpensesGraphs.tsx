import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import { startOfMinute } from 'date-fns'
import * as React from 'react'

import { stringifyColor, useThemeVariant } from '@habx/ui-core'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

import {
  ExpensesGraphsContainer,
  ExpenseGraphTitle,
  ExpenseGraph,
} from './ExpensesGraphs.style'

const NO_DATA: ExpenseBasicInformation[] = []

type PieDataLine = { id: string; label: string; value: number }

export const ExpensesGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = ({
  data = NO_DATA,
}) => {
  const theme = useThemeVariant()

  const pieData = React.useMemo(() => {
    const temp: {
      [categoryId: string]: PieDataLine
    } = {}

    for (const expense of data) {
      if (!temp[expense.category.id]) {
        temp[expense.category.id] = {
          id: expense.category.id,
          label: `${expense.category.categoryGroup.name} - ${expense.category.name}`,
          value: 0,
        }
      }

      temp[expense.category.id].value += expense.value
    }

    return Object.values(temp)
  }, [data])

  return (
    <ExpensesGraphsContainer data-testid={2}>
      <ExpenseGraphTitle type="section">
        Répartition des dépenses par catégorie
      </ExpenseGraphTitle>
      <ExpenseGraph style={{ height: 450 }}>
        <ResponsivePie<PieDataLine>
          data={pieData}
          sortByValue
          innerRadius={0.5}
          cornerRadius={3}
          padAngle={1}
          radialLabel={(d) => `${d.data.label} (${d.formattedValue})`}
          radialLabelsTextColor={stringifyColor(theme.typography.colors.text)}
          valueFormat={(value) => `${value}€`}
        />
      </ExpenseGraph>
      <ExpenseGraphTitle type="section">
        Répartition des dépenses dans le temps
      </ExpenseGraphTitle>
      <ExpenseGraph style={{ height: 300 }}>
        <ResponsiveBar
          data={data}
          indexBy={(el) =>
            startOfMinute(
              new Date(((el as any) as ExpenseBasicInformation).createdAt)
            ).getTime()
          }
        />
      </ExpenseGraph>
    </ExpensesGraphsContainer>
  )
}

interface ExpensesGraphProps {
  data: ExpenseBasicInformation[]
}
