import styled from 'styled-components'

import { Layout } from '@habx/ui-core'

export const HomeContent = styled(Layout)`
  --layout-left-padding: 36px;
  --layout-right-padding: 36px;
  --layout-top-padding: 24px;
  --layout-bottom-padding: 24px;
  --card-height: 480px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: var(--card-height);
  grid-row-gap: 24px;
  grid-column-gap: 36px;
`

export const HomeCardContent = styled.div`
  height: calc(var(--card-height) - 60px);
  padding: 24px;
`
