import * as React from 'react'

import { NavBar } from '../NavBar'

import { PageContainer, PageContent } from './Page.style'

export const Page: React.FunctionComponent = ({ children }) => (
  <PageContainer backgroundColor="#FFFFFF">
    <NavBar />
    <React.Suspense fallback={null}>
      <PageContent>{children}</PageContent>
    </React.Suspense>
  </PageContainer>
)
