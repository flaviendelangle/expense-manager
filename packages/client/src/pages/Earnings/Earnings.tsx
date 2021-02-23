import { join } from 'path'
import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import { EarningCategoriesTable } from './EarningCategoriesTable'
import { EarningsGraphs } from './EarningsGraphs'
import { EarningsTable } from './EarningsTable'

export const Earnings: React.VoidFunctionComponent<
  RouteComponentProps<{ language: string; tab?: string }>
> = ({ match: { params, url } }) => {
  if (params.tab === 'table') {
    return <EarningsTable />
  }

  if (params.tab === 'graphs') {
    return <EarningsGraphs />
  }

  if (params.tab === 'categories') {
    return <EarningCategoriesTable />
  }

  return <Redirect to={join(url, 'table')} />
}
