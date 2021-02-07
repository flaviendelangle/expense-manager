import * as React from 'react'

import { NavBar } from '../NavBar'

import { PageContent } from './Page.style'

export const Page: React.FunctionComponent = ({ children }) => (
  <React.Fragment>
    <NavBar />
    <React.Suspense fallback={null}>
      <PageContent>{children}</PageContent>
    </React.Suspense>
  </React.Fragment>
)
