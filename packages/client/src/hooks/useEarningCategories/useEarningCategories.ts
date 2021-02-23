import { ApolloCache, QueryHookOptions, useQuery } from '@apollo/client'

import {
  listEarningCategories,
  listEarningCategories_earningCategories_nodes,
  listEarningCategoriesVariables,
} from './types/listEarningCategories'
import { listEarningCategoriesQuery } from './useEarningCategories.query'

export type EarningCategoryBasicInformation = listEarningCategories_earningCategories_nodes

const NO_DATA: EarningCategoryBasicInformation[] = []

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

export const addEarningCategoryToCache = (
  cache: ApolloCache<any>,
  newItem: EarningCategoryBasicInformation
) => {
  const existingEarnings = cache.readQuery<listEarningCategories>({
    query: listEarningCategoriesQuery,
  })

  if (existingEarnings) {
    cache.writeQuery<listEarningCategories>({
      query: listEarningCategoriesQuery,
      data: {
        earningCategories: {
          __typename: 'PaginatedEarningCategory',
          nodes: [...existingEarnings.earningCategories.nodes, newItem],
        },
      },
    })
  }
}
