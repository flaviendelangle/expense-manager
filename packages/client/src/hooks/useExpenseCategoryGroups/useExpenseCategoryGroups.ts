import { ApolloCache, QueryHookOptions, useQuery } from '@apollo/client'

import {
  listExpenseCategoryGroups,
  listExpenseCategoryGroups_expenseCategoryGroups_nodes,
  listExpenseCategoryGroupsVariables,
} from './types/listExpenseCategoryGroups'
import { listExpenseCategoryGroupsQuery } from './useExpenseCategoryGroups.query'

export type ExpenseCategoryGroupBasicInformation = listExpenseCategoryGroups_expenseCategoryGroups_nodes

const NO_DATA: ExpenseCategoryGroupBasicInformation[] = []

export const useExpenseCategoryGroups = (
  options?: QueryHookOptions<
    listExpenseCategoryGroups,
    listExpenseCategoryGroupsVariables
  >
) => {
  const response = useQuery<
    listExpenseCategoryGroups,
    listExpenseCategoryGroupsVariables
  >(listExpenseCategoryGroupsQuery, options)

  return {
    ...response,
    data: response.data?.expenseCategoryGroups.nodes ?? NO_DATA,
  }
}

export const addExpenseCategoryGroupToCache = (
  cache: ApolloCache<any>,
  newItem: ExpenseCategoryGroupBasicInformation
) => {
  const existingExpenseCategoryGroups = cache.readQuery<listExpenseCategoryGroups>(
    {
      query: listExpenseCategoryGroupsQuery,
    }
  )

  if (existingExpenseCategoryGroups) {
    cache.writeQuery<listExpenseCategoryGroups>({
      query: listExpenseCategoryGroupsQuery,
      data: {
        expenseCategoryGroups: {
          __typename: 'PaginatedExpenseCategoryGroup',
          nodes: [
            ...existingExpenseCategoryGroups.expenseCategoryGroups.nodes,
            newItem,
          ],
        },
      },
    })
  }
}
