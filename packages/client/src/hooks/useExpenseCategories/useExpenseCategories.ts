import { useQuery } from '@apollo/client'

import {
  listExpenseCategories,
  listExpenseCategories_expenseCategories,
} from './types/listExpenseCategories'
import { listExpenseCategoriesQuery } from './useExpenseCategories.query'

const NO_DATA: listExpenseCategories_expenseCategories[] = []

export const useExpenseCategories = () => {
  const response = useQuery<listExpenseCategories, {}>(
    listExpenseCategoriesQuery
  )

  return {
    ...response,
    data: response.data?.expenseCategories ?? NO_DATA,
  }
}
