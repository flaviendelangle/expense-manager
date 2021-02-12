import styled from 'styled-components'

import { Title } from '@habx/ui-core'

export const EarningsGraphTitle = styled(Title).attrs(() => ({
  type: 'section',
}))`
  margin-bottom: 36px;
`

export const EarningsGraph = styled.div`
  &:not(:last-child) {
    margin-bottom: 96px;
  }
`
