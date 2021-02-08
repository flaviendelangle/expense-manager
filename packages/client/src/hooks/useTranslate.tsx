import * as React from 'react'

import { buildIntl } from '@habx/lib-client-intl'

export const { useTranslate, IntlProvider } = buildIntl<string>({
  prefix: 'client',
  isRoot: true,
})

const MESSAGES = {}

export const Provider: React.FunctionComponent = ({ children }) => (
  <IntlProvider locale="fr" messages={MESSAGES}>
    {children}
  </IntlProvider>
)
