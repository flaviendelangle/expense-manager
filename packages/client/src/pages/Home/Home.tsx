import * as React from 'react'

import { Breadcrumb, BreadcrumbItem, HeaderBar, Text } from '@habx/ui-core'

import { useExpenses } from '@hooks/useExpenses'

export const Home: React.FunctionComponent = () => {
  const expenses = useExpenses()

  return (
    <React.Fragment>
      <HeaderBar>
        <Breadcrumb>
          <BreadcrumbItem>Gestionnaire de dépenses</BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <div>
        {!expenses.loading && (
          <Text>
            {expenses.data.length} dépense{expenses.data.length > 1 ? 's' : ''}
          </Text>
        )}
      </div>
    </React.Fragment>
  )
}
