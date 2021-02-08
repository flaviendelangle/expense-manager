import styled from 'styled-components'

import { Title } from '@habx/ui-core'

export const ExpensesGraphsContainer = styled.div`
  flex: 1 1 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: -24px calc(0px - var(--layout-right-padding))
    calc(0px - var(--layout-bottom-padding))
    calc(0px - var(--layout-left-padding));
  padding: 24px var(--layout-right-padding) var(--layout-bottom-padding)
    var(--layout-left-padding);
`

export const ExpenseGraphTitle = styled(Title).attrs(() => ({
  type: 'section',
}))`
  margin-bottom: 36px;
`

export const ExpenseGraph = styled.div`
  &:not(:last-child) {
    margin-bottom: 96px;
  }
`
