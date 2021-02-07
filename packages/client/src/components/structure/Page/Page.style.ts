import styled from 'styled-components'

import { Layout } from '@habx/ui-core'

export const PageContent = styled(Layout)`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;

  --layout-left-padding: 36px;
  --layout-right-padding: 36px;
  --layout-top-padding: 24px;
  --layout-bottom-padding: 24px;
`
