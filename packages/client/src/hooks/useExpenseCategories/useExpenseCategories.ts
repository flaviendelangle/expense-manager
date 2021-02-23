import { ApolloCache, QueryHookOptions, useQuery } from '@apollo/client'

import {
  listExpenseCategories,
  listExpenseCategories_expenseCategories_nodes,
  listExpenseCategoriesVariables,
} from './types/listExpenseCategories'
import { listExpenseCategoriesQuery } from './useExpenseCategories.query'

export type ExpenseCategoryBasicInformation = listExpenseCategories_expenseCategories_nodes

const NO_DATA: ExpenseCategoryBasicInformation[] = []

export const useExpenseCategories = (
  options?: QueryHookOptions<
    listExpenseCategories,
    listExpenseCategoriesVariables
  >
) => {
  const response = useQuery<
    listExpenseCategories,
    listExpenseCategoriesVariables
  >(listExpenseCategoriesQuery, options)

  return {
    ...response,
    data: response.data?.expenseCategories.nodes ?? NO_DATA,
  }
}

export const addExpenseCategoryToCache = (
  cache: ApolloCache<any>,
  newItem: ExpenseCategoryBasicInformation
) => {
  const existingExpenseCategories = cache.readQuery<listExpenseCategories>({
    query: listExpenseCategoriesQuery,
  })

  if (existingExpenseCategories) {
    cache.writeQuery<listExpenseCategories>({
      query: listExpenseCategoriesQuery,
      data: {
        expenseCategories: {
          __typename: 'PaginatedExpenseCategory',
          nodes: [
            ...existingExpenseCategories.expenseCategories.nodes,
            newItem,
          ],
        },
      },
    })
  }
}
