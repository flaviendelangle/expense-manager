import styled from 'styled-components'

import { Card } from '@habx/ui-core'

export const AuthenticatedPageContent = styled.div`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const LoginFormContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoginFormContent = styled(Card)`
  width: 360px;
`
