import * as React from 'react'

import { useCurrentUser } from '@hooks/useCurrentUser'

import { NavBar } from '../NavBar'

import { AuthenticatedPageContent } from './AuthenticatedPage.style'
import { LoginForm } from './LoginForm'

export const AuthenticatedPage: React.FunctionComponent = ({ children }) => {
  const user = useCurrentUser()

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
