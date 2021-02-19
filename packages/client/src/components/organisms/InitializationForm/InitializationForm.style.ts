import styled from 'styled-components'

import { Card, Title } from '@habx/ui-core'

export const InitializationFormContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const InitializationFormContent = styled(Card)`
  width: 396px;
`

export const InitializationFormTitle = styled(Title).attrs(() => ({
  type: 'regular',
}))`
  margin-bottom: 24px;
`
