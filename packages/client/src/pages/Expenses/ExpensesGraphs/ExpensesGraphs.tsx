import * as React from 'react'

import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

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
    <ExpenseGraph style={{ height: 480 }}>
      <ExpenseCategoryPie data={data} />
    </ExpenseGraph>
    <ExpenseGraphTitle type="section">
      Répartition des dépenses dans le temps
    </ExpenseGraphTitle>
    <ExpenseGraph style={{ height: 480 }}>
      <ExpenseTimeline data={data} />
    </ExpenseGraph>
  </ExpensesGraphsContainer>
)

interface ExpensesGraphProps {
  data: ExpenseBasicInformation[]
}
