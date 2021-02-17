import styled from 'styled-components'

import { Layout } from '@habx/ui-core'

import { CustomizableGraph } from '@components/molecules/CustomizableGraph'

export const ExpenseGraphsContent = styled(Layout)`
  --layout-left-padding: 36px;
  --layout-right-padding: 36px;
  --layout-top-padding: 24px;
  --layout-bottom-padding: 24px;

  flex: 1 1 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

export const ExpensesGraph = styled(CustomizableGraph)`
  &:not(:last-child) {
    margin-bottom: 96px;
  }
`
