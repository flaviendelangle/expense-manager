import * as React from 'react'
import { Link, useMatch } from 'react-router-dom'

import { NavBarItem, NavBarItemProps } from '@habx/ui-core'

export const NavBarLink: React.FunctionComponent<NavBarLinkProps> = ({
  to,
  ...props
}) => {
  const match = useMatch({ path: to })

  return (
    <Link to={to}>
      <NavBarItem active={!!match} {...props} />
    </Link>
  )
}

export interface NavBarLinkProps extends Omit<NavBarItemProps, 'active'> {
  to: string
}
