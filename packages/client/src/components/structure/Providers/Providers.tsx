import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Provider as DesignSystemProvider } from '@habx/ui-core'

import { buildApolloClient } from '@lib/api'

const apolloClient = buildApolloClient()

export const Providers: React.FunctionComponent = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <DesignSystemProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DesignSystemProvider>
  </ApolloProvider>
)
