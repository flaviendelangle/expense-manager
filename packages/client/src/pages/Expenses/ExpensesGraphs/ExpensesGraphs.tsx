import * as React from 'react'

import { Toggle } from '@habx/ui-core'

import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'

import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { ExpensesHeaderBars } from '../ExpensesHeaderBars'

import { ExpenseGraphsContent, ExpensesGraph } from './ExpensesGraphs.style'

export const ExpensesGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = ({
  data,
}) => {
  const [shouldRemoveRefunds, setShouldRemoveRefunds] = React.useState(false)

  const preProcessedData = React.useMemo(() => {
    if (!shouldRemoveRefunds) {
      return data
    }

    return data.map((el) => ({
      ...el,
      value: el.value - (el.refund?.value ?? 0),
    }))
  }, [data, shouldRemoveRefunds])

  return (
    <React.Fragment>
      <ExpensesHeaderBars
        actions={
          <Toggle
            label="Déduire les remboursements"
            value={shouldRemoveRefunds}
            onChange={(value) => setShouldRemoveRefunds(value)}
          />
        }
      />
      <ExpenseGraphsContent>
        <ExpensesGraph
          label="Répartition des dépenses par catégorie"
          graphHeight={480}
          initialConfig={null}
        >
          {() => <ExpenseCategoryPie expenses={preProcessedData} />}
        </ExpensesGraph>
        <ExpensesGraph
          label="Répartition des dépenses dans le temps"
          graphHeight={480}
          initialConfig={null}
        >
          {() => <ExpenseTimeline expenses={preProcessedData} />}
        </ExpensesGraph>
      </ExpenseGraphsContent>
    </React.Fragment>
  )
}

interface ExpensesGraphProps {
  data: ExpenseBasicInformation[]
}
