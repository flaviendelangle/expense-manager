import { QueryHookOptions, useQuery } from '@apollo/client'

import {
  listEarningCategories,
  listEarningCategories_earningCategories_nodes,
  listEarningCategoriesVariables,
} from './types/listEarningCategories'
import { listEarningCategoriesQuery } from './useEarningCategories.query'

const NO_DATA: listEarningCategories_earningCategories_nodes[] = []

export const useEarningCategories = (
  options?: QueryHookOptions<
    listEarningCategories,
    listEarningCategoriesVariables
  >
) => {
  const response = useQuery<
    listEarningCategories,
    listEarningCategoriesVariables
  >(listEarningCategoriesQuery, options)

  return {
    ...response,
    data: response.data?.earningCategories.nodes ?? NO_DATA,
  }
}
