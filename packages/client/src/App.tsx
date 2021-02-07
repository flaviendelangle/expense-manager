import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import { EuclidFont } from '@habx/ui-core'

import { Page } from '@components/structure/Page'
import { Providers } from '@components/structure/Providers'

import { Home } from '@pages/Home'
import { GlobalStyle } from '@style/global'

export const App: React.FunctionComponent = () => (
  <Providers>
    <Page>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <GlobalStyle />
      <EuclidFont />
    </Page>
  </Providers>
)
