import { ResponsiveBar } from '@nivo/bar'
import { startOfDay } from 'date-fns'
import * as React from 'react'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { CategoryPie } from './CategoryPie'
import {
  ExpensesGraphsContainer,
  ExpenseGraphTitle,
  ExpenseGraph,
} from './ExpensesGraphs.style'

export const ExpensesGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = ({
  data,
}) => (
  <ExpensesGraphsContainer data-testid={2}>
    <ExpenseGraphTitle type="section">
      Répartition des dépenses par catégorie
    </ExpenseGraphTitle>
    <CategoryPie data={data} />
    <ExpenseGraphTitle type="section">
      Répartition des dépenses dans le temps
    </ExpenseGraphTitle>
    <ExpenseGraph style={{ height: 300 }}>
      <ResponsiveBar
        data={data}
        indexBy={(el) =>
          startOfDay(
            new Date(((el as any) as ExpenseBasicInformation).spentAt)
          ).getTime()
        }
      />
    </ExpenseGraph>
  </ExpensesGraphsContainer>
)

interface ExpensesGraphProps {
  data: ExpenseBasicInformation[]
}
