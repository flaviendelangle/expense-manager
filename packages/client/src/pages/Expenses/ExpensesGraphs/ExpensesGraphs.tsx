import * as React from 'react'

import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { ExpensesGraph } from './ExpensesGraphs.style'

export const ExpensesGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = ({
  data,
}) => (
  <React.Fragment>
    <ExpensesGraph
      label="Répartition des dépenses par catégorie"
      graphHeight={480}
      initialConfig={null}
    >
      {() => <ExpenseCategoryPie data={data} />}
    </ExpensesGraph>
    <ExpensesGraph
      label="Répartition des dépenses dans le temps"
      graphHeight={480}
      initialConfig={null}
    >
      {() => <ExpenseTimeline data={data} />}
    </ExpensesGraph>
  </React.Fragment>
)

interface ExpensesGraphProps {
  data: ExpenseBasicInformation[]
}
