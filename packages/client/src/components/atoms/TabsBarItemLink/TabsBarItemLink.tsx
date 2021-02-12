import * as React from 'react'
import { useMatch, Link } from 'react-router-dom'

import { TabsBarItemProps, TabsBarItem } from '@habx/ui-core'

export const TabsBarItemLink: React.FunctionComponent<TabsBarItemLinkProps> = ({
  to,
  disabled,
  active,
  ...props
}) => {
  const match = useMatch({ path: to })

  const content = (
    <TabsBarItem {...props} disabled={disabled} active={active ?? !!match} />
  )

  return disabled ? content : <Link to={to}>{content}</Link>
}

interface TabsBarItemLinkProps extends Omit<TabsBarItemProps, 'active'> {
  active?: boolean
  to: string
}
