import * as React from 'react'

import { buildIntl } from '@habx/lib-client-intl'

import { enMessages } from './en'
import { frMessages } from './fr'
import { messageIds } from './useTranslate.interface'

const intl = buildIntl<messageIds>({
  prefix: 'client',
  isRoot: true,
})

export const useTranslate = intl.useTranslate

export const Provider: React.FunctionComponent<ProviderProps> = ({
  children,
  language,
}) => {
  const messages = React.useMemo(() => {
    switch (language) {
      case 'fr': {
        return frMessages
      }

      case 'en': {
        return enMessages
      }

      default: {
        throw new Error('Invalid language')
      }
    }
  }, [language])

  return (
    <intl.IntlProvider locale={language} messages={messages}>
      {children}
    </intl.IntlProvider>
  )
}

interface ProviderProps {
  language: 'fr' | 'en'
}
