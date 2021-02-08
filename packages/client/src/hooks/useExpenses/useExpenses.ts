import { ApolloCache, useQuery } from '@apollo/client'

import { listExpenses, listExpenses_expenses } from './types/listExpenses'
import { listExpensesQuery } from './useExpenses.query'

export type ExpenseBasicInformation = listExpenses_expenses

const NO_DATA: ExpenseBasicInformation[] = []

export const useExpenses = () => {
  const response = useQuery<listExpenses, {}>(listExpensesQuery)

  return {
    ...response,
    data: response.data?.expenses ?? NO_DATA,
  }
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
        expenses: [...existingExpenses.expenses, newItem],
      },
    })
  }
}
