import * as React from 'react'

import { Toggle } from '@habx/ui-core'

import { ExpenseCategoryPie } from '@components/graphs/ExpenseCategoryPie'
import { ExpenseTimeline } from '@components/graphs/ExpenseTimeline'

import { ExpenseBasicInformation } from '@hooks/useExpenses'
import { useTranslate } from '@hooks/useTranslate'

import { ExpensesHeaderBars } from '../ExpensesHeaderBars'

import { ExpenseGraphsContent, ExpensesGraph } from './ExpensesGraphs.style'

export const ExpensesGraphs: React.VoidFunctionComponent<ExpensesGraphProps> = ({
  data,
}) => {
  const t = useTranslate()
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
            label={t('pages.expenses.graphs.refundDeduction.label')}
            value={shouldRemoveRefunds}
            onChange={(value) => setShouldRemoveRefunds(value)}
          />
        }
      />
      <ExpenseGraphsContent>
        <ExpensesGraph
          label={t('pages.expenses.graphs.expenseCategoryPie.title')}
          graphHeight={480}
          initialConfig={null}
        >
          {() => <ExpenseCategoryPie expenses={preProcessedData} />}
        </ExpensesGraph>
        <ExpensesGraph
          label={t('pages.expenses.graphs.expenseTimeline.title')}
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
