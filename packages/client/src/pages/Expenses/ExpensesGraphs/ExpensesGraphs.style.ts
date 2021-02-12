import styled from 'styled-components'

import { Title } from '@habx/ui-core'

export const ExpensesGraphTitle = styled(Title).attrs(() => ({
  type: 'section',
}))`
  margin-bottom: 36px;
`

export const ExpensesGraph = styled.div`
  &:not(:last-child) {
    margin-bottom: 96px;
  }
`
