import { ModalState } from '@delangle/use-modal'
import * as React from 'react'
import { Link, LinkProps, useRouteMatch, generatePath } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  HeaderBar,
  Icon,
  IconButton,
  Modal,
  TabsBar,
} from '@habx/ui-core'

import { TabsBarItemLink } from '@components/atoms/TabsBarItemLink'

import { useTranslate } from '@hooks/useTranslate'

import { ExpensesActions } from '../Expenses.style'
import { UpsertExpenseForm } from '../UpsertExpenseForm'

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
          <TabsBarItemLink to={getTabURL('table')}>
            {t('pages.expenses.table.label')}
          </TabsBarItemLink>
          <TabsBarItemLink to={getTabURL('graphs')}>
            {t('pages.expenses.graphs.label')}
          </TabsBarItemLink>
        </TabsBar>
        <ExpensesActions>
          {actions}
          <Modal
            title={t('pages.expenses.itemModal.new.title')}
            triggerElement={<IconButton icon="add" small background="grey" />}
            persistent
            width="large"
          >
            {(modal) =>
              modal.state !== ModalState.closed && (
                <UpsertExpenseForm
                  initialValues={undefined}
                  onClose={modal.close}
                />
              )
            }
          </Modal>
        </ExpensesActions>
      </HeaderBar>
    </React.Fragment>
  )
}

interface ExpensesHeaderBarProps {
  actions?: React.ReactNode
}
