import * as React from 'react'
import { useMatch } from 'react-router-dom'

import { NavBarItem, NavBarItemProps } from '@habx/ui-core'

import { NavBarLinkContainer } from './NavBarLink.style'

export const NavBarLink: React.FunctionComponent<NavBarLinkProps> = ({
  to,
  bottom,
  ...props
}) => {
  const match = useMatch({ path: to })

  return (
    <NavBarLinkContainer to={to} data-bottom={!!bottom}>
      <NavBarItem active={!!match} {...props} />
    </NavBarLinkContainer>
  )
}

export interface NavBarLinkProps extends Omit<NavBarItemProps, 'active'> {
  to: string
}
