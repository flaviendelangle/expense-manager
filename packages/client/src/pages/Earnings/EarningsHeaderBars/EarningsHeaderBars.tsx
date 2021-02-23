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

import { EarningsActions } from './EarningsHeaderBars.style'

const BreadcrumbLinkItem = BreadcrumbItem as React.ForwardRefExoticComponent<
  BreadcrumbItemProps & (LinkProps | React.HTMLProps<HTMLAnchorElement>)
>

export const EarningsHeaderBars: React.VoidFunctionComponent<EarningHeaderBarProps> = ({
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
          <BreadcrumbItem>{t('pages.earnings.label')}</BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <HeaderBar small>
        <TabsBar>
          <TabsBarItemLink to={getTabURL('graphs')} disabled>
            {t('pages.earnings.graphs.label')}
          </TabsBarItemLink>
          <TabsBarItemLink to={getTabURL('table')}>
            {t('pages.earnings.table.label')}
          </TabsBarItemLink>
          <TabsBarItemLink to={getTabURL('categories')}>
            {t('pages.earnings.categories.label')}
          </TabsBarItemLink>
        </TabsBar>
        <EarningsActions>{actions}</EarningsActions>
      </HeaderBar>
    </React.Fragment>
  )
}

interface EarningHeaderBarProps {
  actions?: React.ReactNode
}
