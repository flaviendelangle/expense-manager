import { ApolloCache, QueryHookOptions, useQuery } from '@apollo/client'
import * as React from 'react'

import {
  listEarnings,
  listEarnings_earnings_nodes,
  listEarningsVariables,
} from './types/listEarnings'
import { listEarningsQuery } from './useEarnings.query'

export type EarningBasicInformation = listEarnings_earnings_nodes

const NO_DATA: EarningBasicInformation[] = []

export const useEarnings = (
  options?: QueryHookOptions<listEarnings, listEarningsVariables>
) => {
  const response = useQuery<listEarnings, listEarningsVariables>(
    listEarningsQuery,
    options
  )

  return React.useMemo(
    () => ({
      ...response,
      data: response.data?.earnings.nodes ?? NO_DATA,
    }),
    [response]
  )
}

export const addEarningToCache = (
  cache: ApolloCache<any>,
  newItem: EarningBasicInformation
) => {
  const existingEarnings = cache.readQuery<listEarnings>({
    query: listEarningsQuery,
  })

  if (existingEarnings) {
    cache.writeQuery<listEarnings>({
      query: listEarningsQuery,
      data: {
        earnings: {
          __typename: 'PaginatedEarning',
          nodes: [...existingEarnings.earnings.nodes, newItem],
        },
      },
    })
  }
}
