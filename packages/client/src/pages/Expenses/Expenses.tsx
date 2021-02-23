import { join } from 'path'
import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import { ExpenseCategoriesTable } from './ExpenseCategoriesTable'
import { ExpenseCategoryGroupsTable } from './ExpenseCategoryGroupsTable'
import { ExpensesGraphs } from './ExpensesGraphs'
import { ExpensesTable } from './ExpensesTable'

export const Expenses: React.VoidFunctionComponent<
  RouteComponentProps<{ tab?: string }>
> = ({ match: { url, params } }) => {
  if (params.tab === 'table') {
    return <ExpensesTable />
  }

  if (params.tab === 'graphs') {
    return <ExpensesGraphs />
  }

  if (params.tab === 'categories') {
    return <ExpenseCategoriesTable />
  }

  if (params.tab === 'categoryGroups') {
    return <ExpenseCategoryGroupsTable />
  }

  return <Redirect to={join(url, 'graphs')} />
}
