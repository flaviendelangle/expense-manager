import * as React from 'react'

import { CenteredInformationMessage } from '@components/atoms/CenteredInformationMessage'

import { useCurrentUser } from '@hooks/useCurrentUser'
import { useTranslate } from '@hooks/useTranslate'

export const Admin: React.VoidFunctionComponent = () => {
  const currentUser = useCurrentUser()
  const t = useTranslate()

  if (!currentUser.data?.isAdmin) {
    return null
  }

  return (
    <CenteredInformationMessage>
      {t('generic.inDevelopment')}
    </CenteredInformationMessage>
  )
}
