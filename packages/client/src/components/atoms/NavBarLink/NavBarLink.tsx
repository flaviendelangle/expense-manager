import * as React from 'react'
import { useRouteMatch } from 'react-router-dom'

import { NavBarItem, NavBarItemProps } from '@habx/ui-core'

import { NavBarLinkContainer } from './NavBarLink.style'

export const NavBarLink: React.FunctionComponent<NavBarLinkProps> = ({
  to,
  bottom,
  exact,
  ...props
}) => {
  const match = useRouteMatch({ path: to, exact })

  return (
    <NavBarLinkContainer to={to} data-bottom={!!bottom}>
      <NavBarItem active={!!match} {...props} />
    </NavBarLinkContainer>
  )
}

export interface NavBarLinkProps extends Omit<NavBarItemProps, 'active'> {
  to: string
  exact?: boolean
}
