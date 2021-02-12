import { ApolloCache, QueryHookOptions, useQuery } from '@apollo/client'
import * as React from 'react'

import {
  listExpenses,
  listExpenses_expenses_nodes,
  listExpensesVariables,
} from './types/listExpenses'
import { listExpensesQuery } from './useExpenses.query'

export type ExpenseBasicInformation = listExpenses_expenses_nodes

const NO_DATA: ExpenseBasicInformation[] = []

export const useExpenses = (
  options?: QueryHookOptions<listExpenses, listExpensesVariables>
) => {
  const response = useQuery<listExpenses, listExpensesVariables>(
    listExpensesQuery,
    options
  )

  return React.useMemo(
    () => ({
      ...response,
      data: response.data?.expenses.nodes ?? NO_DATA,
    }),
    [response]
  )
}

export const addExpenseToCache = (
  cache: ApolloCache<any>,
  newItem: ExpenseBasicInformation
) => {
  const existingExpenses = cache.readQuery<listExpenses>({
    query: listExpensesQuery,
  })

  if (existingExpenses) {
    cache.writeQuery<listExpenses>({
      query: listExpensesQuery,
      data: {
        expenses: {
          __typename: 'PaginatedExpense',
          nodes: [...existingExpenses.expenses.nodes, newItem],
        },
      },
    })
  }
}
