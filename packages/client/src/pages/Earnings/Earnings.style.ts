import styled from 'styled-components'

import { Layout } from '@habx/ui-core'

export const ExpensesActions = styled.div`
  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

export const ExpensesContent = styled(Layout)`
  --layout-left-padding: 36px;
  --layout-right-padding: 36px;
  --layout-top-padding: 24px;
  --layout-bottom-padding: 24px;

  flex: 1 1 100%;
  overflow-y: auto;
  overflow-x: hidden;
`
