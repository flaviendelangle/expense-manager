import * as React from 'react'
import { Link, LinkProps, useRouteMatch, generatePath } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  HeaderBar,
  Icon,
  TabsBar,
} from '@habx/ui-core'

import { TabsBarItemLink } from '@components/atoms/TabsBarItemLink'

import { useTranslate } from '@hooks/useTranslate'

import { ExpensesActions } from './ExpensesHeaderBars.style'

const BreadcrumbLinkItem = BreadcrumbItem as React.ForwardRefExoticComponent<
  BreadcrumbItemProps & (LinkProps | React.HTMLProps<HTMLAnchorElement>)
>

export const ExpensesHeaderBars: React.VoidFunctionComponent<ExpensesHeaderBarProps> = ({
  actions,
}) => {
  const { path, params } = useRouteMatch<{ language: string; tab: string }>()
  const t = useTranslate()

  const getTabURL = (tab: string) => generatePath(path, { ...params, tab })

  return (
    <React.Fragment>
      <HeaderBar small>
        <Breadcrumb>
          <BreadcrumbLinkItem to={`/${params.language}`} as={Link}>
            <Icon icon="house-outline" />
          </BreadcrumbLinkItem>
          <BreadcrumbItem>{t('pages.expenses.label')}</BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <HeaderBar small>
        <TabsBar>
          <TabsBarItemLink to={getTabURL('graphs')}>
            {t('pages.expenses.graphs.label')}
          </TabsBarItemLink>
          <TabsBarItemLink to={getTabURL('table')}>
            {t('pages.expenses.table.label')}
          </TabsBarItemLink>
          <TabsBarItemLink to={getTabURL('categoryGroups')}>
            {t('pages.expenses.categoryGroups.label')}
          </TabsBarItemLink>
          <TabsBarItemLink to={getTabURL('categories')}>
            {t('pages.expenses.categories.label')}
          </TabsBarItemLink>
        </TabsBar>
        <ExpensesActions>{actions}</ExpensesActions>
      </HeaderBar>
    </React.Fragment>
  )
}

interface ExpensesHeaderBarProps {
  actions?: React.ReactNode
}
