import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthenticatedPage } from '@components/structure/AuthenticatedPage'
import { Providers } from '@components/structure/Providers'

import { Earnings } from '@pages/Earnings'
import { Expenses } from '@pages/Expenses'
import { Home } from '@pages/Home'

export const App: React.VoidFunctionComponent = () => (
  <Providers>
    <AuthenticatedPage>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses/*" element={<Expenses />} />
        <Route path="/earnings/*" element={<Earnings />} />
      </Routes>
    </AuthenticatedPage>
  </Providers>
)
