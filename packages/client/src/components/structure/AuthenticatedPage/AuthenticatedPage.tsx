import { useQuery } from '@apollo/client'
import * as React from 'react'

import { useCurrentUser } from '@hooks/useCurrentUser'

import { InitializationForm } from '../../organisms/InitializationForm/InitializationForm'
import { LoginForm } from '../../organisms/LoginForm/LoginForm'
import { NavBar } from '../NavBar'

import { hasServerBeenInitializedQuery } from './AuthenticatedPage.query'
import { AuthenticatedPageContent } from './AuthenticatedPage.style'
import { hasServerBeenInitialized } from './types/hasServerBeenInitialized'

export const AuthenticatedPage: React.FunctionComponent = ({ children }) => {
  const user = useCurrentUser()

  const shouldCheckServerStatus = !user.loading && user.called && !user.data

  const hasServerBeenInitializedResponse = useQuery<
    hasServerBeenInitialized,
    {}
  >(hasServerBeenInitializedQuery, {
    skip: !shouldCheckServerStatus,
  })

  if (hasServerBeenInitializedResponse.loading) {
    return null
  }

  if (
    hasServerBeenInitializedResponse.data?.serverStatus?.hasBeenInitialized ===
    false
  ) {
    return <InitializationForm />
  }

  if (user.loading && !user.data) {
    return null
  }

  if (!user.data) {
    return <LoginForm />
  }

  return (
    <React.Fragment>
      <NavBar />
      <React.Suspense fallback={null}>
        <AuthenticatedPageContent>{children}</AuthenticatedPageContent>
      </React.Suspense>
    </React.Fragment>
  )
}
