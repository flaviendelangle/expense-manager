import { useMutation } from '@apollo/client'
import * as React from 'react'
import { useParams } from 'react-router'

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
import { useTranslate } from '@hooks/useTranslate'

import { logoutMutation } from './NavBar.query'
import { logout } from './types/logout'

export const NavBar: React.VoidFunctionComponent = () => {
  const [themePreset, setThemePreset] = useThemePreset()
  const { language } = useParams<{ language: string }>()
  const t = useTranslate()

  const currentUser = useCurrentUser()

  const [onLogout] = useMutation<logout, {}>(logoutMutation, {
    update: (cache) => updateCurrentUserInCache(cache, null),
  })

  const handleLogout = async () => {
    await onLogout()

    notify(t('navBar.logout.notify'))
  }

  return (
    <BaseNavBar backgroundColor={palette.purpleDawn[900]}>
      <NavBarLink
        icon={<Icon icon="back-home-outline" />}
        label={t('navBar.home.label')}
        to={`/${language}`}
        exact
      />
      <NavBarLink
        icon={<Icon icon="cash-outline" />}
        label={t('navBar.expenses.label')}
        to={`/${language}/expenses`}
      />
      <NavBarLink
        icon={<Icon icon="dollar-sign" />}
        label={t('navBar.earnings.label')}
        to={`/${language}/earnings`}
      />
      <NavBarItem
        bottom
        onClick={() =>
          setThemePreset(themePreset === 'dark' ? 'light' : 'dark')
        }
        label={
          themePreset === 'dark'
            ? t('navBar.theme.lightMode')
            : t('navBar.theme.darkMode')
        }
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
          label={t('navBar.admin.label')}
          to={`/${language}/admin`}
        />
      )}
      <NavBarItem
        bottom
        label={t('navBar.logout.label')}
        icon={<Icon icon="to-east" />}
        onClick={handleLogout}
      />
    </BaseNavBar>
  )
}
