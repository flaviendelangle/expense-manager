import * as React from 'react'

import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { ExpensesGraphTitle, ExpensesGraph } from './ExpensesGraphs.style'

export const ExpensesGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = ({
  data,
}) => (
  <React.Fragment>
    <ExpensesGraphTitle type="section">
      Répartition des dépenses par catégorie
    </ExpensesGraphTitle>
    <ExpensesGraph style={{ height: 480 }}>
      <ExpenseCategoryPie data={data} />
    </ExpensesGraph>
    <ExpensesGraphTitle type="section">
      Répartition des dépenses dans le temps
    </ExpensesGraphTitle>
    <ExpensesGraph style={{ height: 480 }}>
      <ExpenseTimeline data={data} />
    </ExpensesGraph>
  </React.Fragment>
)

interface ExpensesGraphProps {
  data: ExpenseBasicInformation[]
}
