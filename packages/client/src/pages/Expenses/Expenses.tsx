import { join } from 'path'
import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import { useExpenses } from '@hooks/useExpenses'

import { ExpensesGraphs } from './ExpensesGraphs'
import { ExpensesTable } from './ExpensesTable'

export const Expenses: React.VoidFunctionComponent<
  RouteComponentProps<{ tab?: string }>
> = ({ match: { url, params } }) => {
  const expenses = useExpenses()

  if (params.tab === 'table') {
    return <ExpensesTable data={expenses.data} loading={expenses.loading} />
  }

  if (params.tab === 'graphs') {
    return <ExpensesGraphs data={expenses.data} />
  }

  return <Redirect to={join(url, 'table')} />
}
