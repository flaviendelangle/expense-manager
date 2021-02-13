import * as React from 'react'

import { Card, HeaderBar, Title } from '@habx/ui-core'

import {
  CustomizableGraph,
  CustomizableGraphProps,
} from '@components/molecules/CustomizableGraph'

export const CustomizableGraphCard: React.FunctionComponent<CustomizableGraphCardProps> = (
  props
) => (
  <Card spacing="regular-horizontal-only">
    <CustomizableGraph
      {...props}
      renderHeader={({ label, actions }) => (
        <HeaderBar>
          <Title type="regular">{label}</Title>
          <div>{actions}</div>
        </HeaderBar>
      )}
    />
  </Card>
)

interface CustomizableGraphCardProps
  extends Omit<CustomizableGraphProps, 'renderHeader'> {}
