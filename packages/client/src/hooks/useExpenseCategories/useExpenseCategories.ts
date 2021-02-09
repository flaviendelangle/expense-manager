import { useQuery } from '@apollo/client'

import {
  listExpenseCategories,
  listExpenseCategories_expenseCategories_nodes,
} from './types/listExpenseCategories'
import { listExpenseCategoriesQuery } from './useExpenseCategories.query'

const NO_DATA: listExpenseCategories_expenseCategories_nodes[] = []

export const useExpenseCategories = () => {
  const response = useQuery<listExpenseCategories, {}>(
    listExpenseCategoriesQuery
  )

  return {
    ...response,
    data: response.data?.expenseCategories.nodes ?? NO_DATA,
  }
}
