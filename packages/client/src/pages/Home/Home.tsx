import * as React from 'react'

import { Breadcrumb, BreadcrumbItem, HeaderBar, Text } from '@habx/ui-core'

import { useExpanses } from '@hooks/useExpanses'

export const Home: React.FunctionComponent = () => {
  const expanses = useExpanses()

  return (
    <React.Fragment>
      <HeaderBar>
        <Breadcrumb>
          <BreadcrumbItem>Gestionnaire de dépenses</BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <div>
        {!expanses.loading && (
          <Text>
            {expanses.data.length} dépense{expanses.data.length > 1 ? 's' : ''}
          </Text>
        )}
      </div>
    </React.Fragment>
  )
}
