import { QueryHookOptions, useQuery } from '@apollo/client'

import {
  listExpenseCategories,
  listExpenseCategories_expenseCategories_nodes,
  listExpenseCategoriesVariables,
} from './types/listExpenseCategories'
import { listExpenseCategoriesQuery } from './useExpenseCategories.query'

const NO_DATA: listExpenseCategories_expenseCategories_nodes[] = []

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
