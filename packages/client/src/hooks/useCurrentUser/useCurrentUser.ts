import { ApolloCache, useQuery } from '@apollo/client'

import { currentUser } from './types/currentUser'
import { UserBasicInformation } from './types/UserBasicInformation'
import { currentUserQuery } from './useCurrentUser.query'

export const useCurrentUser = () => {
  const response = useQuery<currentUser, {}>(currentUserQuery)

  return {
    ...response,
    data: response.data?.me,
  }
}

export const updateCurrentUserInCache = (
  cache: ApolloCache<any>,
  user: UserBasicInformation | null
) => {
  const existingExpenses = cache.readQuery<currentUser>({
    query: currentUserQuery,
  })

  if (existingExpenses) {
    cache.writeQuery<currentUser>({
      query: currentUserQuery,
      data: {
        me: user,
      },
    })
  }
}
