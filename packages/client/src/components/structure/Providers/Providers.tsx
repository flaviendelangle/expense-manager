import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'

import {
  EuclidFont,
  Provider as DesignSystemProvider,
  ThemeProvider,
} from '@habx/ui-core'

import { ThemePresetProvider } from '@hooks/useThemePreset'
import { Provider as IntlProvider } from '@hooks/useTranslate'
import { buildApolloClient } from '@lib/api'
import { GlobalStyle } from '@style/global'

const apolloClient = buildApolloClient()

export const StyledThemeProvider = styled(ThemeProvider)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`

export const Providers: React.FunctionComponent = ({ children }) => (
  <IntlProvider>
    <ThemePresetProvider>
      {(preset) => (
        <StyledThemeProvider preset={preset}>
          <DesignSystemProvider>
            <ApolloProvider client={apolloClient}>
              <BrowserRouter>
                {children}
                <GlobalStyle />
                <EuclidFont />
              </BrowserRouter>
            </ApolloProvider>
          </DesignSystemProvider>
        </StyledThemeProvider>
      )}
    </ThemePresetProvider>
  </IntlProvider>
)
