import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Provider as DesignSystemProvider, ThemeProvider } from '@habx/ui-core'

import { ThemePresetProvider } from '@hooks/useThemePreset'
import { buildApolloClient } from '@lib/api'

const apolloClient = buildApolloClient()

export const StyledThemeProvider = styled(ThemeProvider)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`

export const Providers: React.FunctionComponent = ({ children }) => (
  <ThemePresetProvider>
    {(preset) => (
      <StyledThemeProvider preset={preset}>
        <DesignSystemProvider>
          <ApolloProvider client={apolloClient}>
            <BrowserRouter>{children}</BrowserRouter>
          </ApolloProvider>
        </DesignSystemProvider>
      </StyledThemeProvider>
    )}
  </ThemePresetProvider>
)
