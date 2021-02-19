import * as React from 'react'

import { CenteredInformationMessage } from '@components/atoms/CenteredInformationMessage'

import { useCurrentUser } from '@hooks/useCurrentUser'

export const Admin: React.VoidFunctionComponent = () => {
  const currentUser = useCurrentUser()

  if (!currentUser.data?.isAdmin) {
    return null
  }

  return (
    <CenteredInformationMessage>
      En cours de construction
    </CenteredInformationMessage>
  )
}
