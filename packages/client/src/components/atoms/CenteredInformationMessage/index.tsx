import * as React from 'react'
import styled from 'styled-components'

import { Title } from '@habx/ui-core'

const CenteredInformationMessageContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const CenteredInformationMessage: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => (
  <CenteredInformationMessageContainer {...props}>
    <Title type="regular">{children}</Title>
  </CenteredInformationMessageContainer>
)
