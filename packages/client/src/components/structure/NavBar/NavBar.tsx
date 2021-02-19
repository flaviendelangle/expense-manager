import { useMutation } from '@apollo/client'
import * as React from 'react'

import {
  Icon,
  NavBar as BaseNavBar,
  NavBarItem,
  notify,
  palette,
} from '@habx/ui-core'

import { NavBarLink } from '@components/atoms/NavBarLink'

import { updateCurrentUserInCache, useCurrentUser } from '@hooks/useCurrentUser'
import { useThemePreset } from '@hooks/useThemePreset'

import { logoutMutation } from './NavBar.query'
import { logout } from './types/logout'

export const NavBar: React.VoidFunctionComponent = () => {
  const [themePreset, setThemePreset] = useThemePreset()

  const currentUser = useCurrentUser()

  const [onLogout] = useMutation<logout, {}>(logoutMutation, {
    update: (cache) => updateCurrentUserInCache(cache, null),
  })

  const handleLogout = async () => {
    await onLogout()

    notify('Vous êtes maintenant déconnecté')
  }

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
      {currentUser.data?.isAdmin && (
        <NavBarLink
          bottom
          icon={<Icon icon="wrench" />}
          label="Administration"
          to="/admin"
        />
      )}
      <NavBarItem
        bottom
        label="Me déconnecter"
        icon={<Icon icon="to-east" />}
        onClick={handleLogout}
      />
    </BaseNavBar>
  )
}
