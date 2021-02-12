import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import { EuclidFont } from '@habx/ui-core'

import { Page } from '@components/structure/Page'
import { Providers } from '@components/structure/Providers'

import { Earnings } from '@pages/Earnings'
import { Expenses } from '@pages/Expenses'
import { Home } from '@pages/Home'
import { GlobalStyle } from '@style/global'

export const App: React.VoidFunctionComponent = () => (
  <Providers>
    <Page>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses/*" element={<Expenses />} />
        <Route path="/earnings/*" element={<Earnings />} />
      </Routes>
      <GlobalStyle />
      <EuclidFont />
    </Page>
  </Providers>
)
