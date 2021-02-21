import { join } from 'path'
import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { AuthenticatedPage } from '@components/structure/AuthenticatedPage'
import { Providers } from '@components/structure/Providers'

import { Admin } from '@pages/Admin'
import { Earnings } from '@pages/Earnings'
import { Expenses } from '@pages/Expenses'
import { Home } from '@pages/Home'

export const App: React.VoidFunctionComponent = () => (
  <Providers>
    {({ match: { path } }) => (
      <AuthenticatedPage>
        <Switch>
          <Route path={path} exact component={Home} />
          <Route path={join(path, 'expenses/:tab?')} component={Expenses} />
          <Route path={join(path, 'earnings/:tab?')} component={Earnings} />
          <Route path={join(path, 'admin')} component={Admin} />
        </Switch>
      </AuthenticatedPage>
    )}
  </Providers>
)
