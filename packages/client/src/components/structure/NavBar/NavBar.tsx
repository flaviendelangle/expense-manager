import * as React from 'react'

import { Icon, NavBar as BaseNavBar, NavBarItem, palette } from '@habx/ui-core'

import { NavBarLink } from '@components/atoms/NavBarLink'

import { useThemePreset } from '@hooks/useThemePreset'

export const NavBar: React.VoidFunctionComponent = () => {
  const [themePreset, setThemePreset] = useThemePreset()

  return (
    <BaseNavBar backgroundColor={palette.purpleDawn[900]} title="Mes dépenses">
      <NavBarLink icon={<Icon icon="list" />} label="Dépenses" to="/expenses" />
      <NavBarLink icon={<Icon icon="list" />} label="Recettes" to="/earnings" />
      <NavBarItem
        bottom
        onClick={() =>
          setThemePreset(themePreset === 'dark' ? 'light' : 'dark')
        }
        label={themePreset === 'dark' ? 'Light mode' : 'Dark mode'}
        icon={
          <Icon
            icon={themePreset === 'dark' ? 'magicstick-outline' : 'magicstick'}
          />
        }
      />
    </BaseNavBar>
  )
}
