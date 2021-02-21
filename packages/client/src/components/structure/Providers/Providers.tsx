import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'
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

const DEFAULT_LANGUAGE = window.navigator.language.startsWith('fr-')
  ? 'fr'
  : 'en'

export const Providers: React.FunctionComponent<ProvidersProps> = ({
  children,
}) => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/:language(fr|en)"
        render={(props) => (
          <IntlProvider language={props.match.params.language}>
            <ThemePresetProvider>
              {(preset) => (
                <StyledThemeProvider preset={preset}>
                  <DesignSystemProvider>
                    <ApolloProvider client={apolloClient}>
                      {children(props)}
                      <GlobalStyle />
                      <EuclidFont />
                    </ApolloProvider>
                  </DesignSystemProvider>
                </StyledThemeProvider>
              )}
            </ThemePresetProvider>
          </IntlProvider>
        )}
      />
      <Redirect to={`/${DEFAULT_LANGUAGE}`} />
    </Switch>
  </BrowserRouter>
)

interface ProvidersProps {
  children: (props: RouteComponentProps) => void
}
