import * as React from 'react'

import { Icon, NavBar as BaseNavBar, NavBarItem, palette } from '@habx/ui-core'

import { useThemePreset } from '@hooks/useThemePreset'

export const NavBar: React.VoidFunctionComponent = () => {
  const [themePreset, setThemePreset] = useThemePreset()

  return (
    <BaseNavBar backgroundColor={palette.purpleDawn[900]} title="Mes dépenses">
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
