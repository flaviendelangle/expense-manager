import styled from 'styled-components'

import { Title } from '@habx/ui-core'

export const ExpensesGraphsContainer = styled.div``

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
