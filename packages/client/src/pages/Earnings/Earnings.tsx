import { ModalState } from '@delangle/use-modal'
import { join } from 'path'
import * as React from 'react'
import {
  Link,
  LinkProps,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  generatePath,
} from 'react-router-dom'

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

import { useEarnings } from '@hooks/useEarnings'
import { useTranslate } from '@hooks/useTranslate'

import { ExpensesActions, ExpensesContent } from './Earnings.style'
import { EarningsGraphs } from './EarningsGraphs'
import { EarningsTable } from './EarningsTable'
import { UpsertEarningForm } from './UpsertEarningForm'

const BreadcrumbLinkItem = BreadcrumbItem as React.ForwardRefExoticComponent<
  BreadcrumbItemProps & (LinkProps | React.HTMLProps<HTMLAnchorElement>)
>

export const Earnings: React.VoidFunctionComponent<
  RouteComponentProps<{ language: string; tab?: string }>
> = ({ match: { params, path, url } }) => {
  const earnings = useEarnings()
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
          <TabsBarItemLink to={getTabURL('table')}>
            {t('pages.earnings.table.label')}
          </TabsBarItemLink>
          <TabsBarItemLink to={getTabURL('graphs')}>
            {t('pages.earnings.graphs.label')}
          </TabsBarItemLink>
        </TabsBar>
        <ExpensesActions>
          <Modal
            title={t('pages.earnings.itemModal.new.title')}
            triggerElement={<IconButton icon="add" small background="grey" />}
            persistent
          >
            {(modal) =>
              modal.state !== ModalState.closed && (
                <UpsertEarningForm
                  initialValues={undefined}
                  onClose={modal.close}
                />
              )
            }
          </Modal>
        </ExpensesActions>
      </HeaderBar>
      <ExpensesContent>
        <Switch>
          <Route
            path={join(path, 'table')}
            render={() => (
              <EarningsTable data={earnings.data} loading={earnings.loading} />
            )}
          />
          <Route
            path={join(path, 'graphs')}
            render={() => <EarningsGraphs data={earnings.data} />}
          />
          <Redirect to={join(url, 'table')} />
        </Switch>
      </ExpensesContent>
    </React.Fragment>
  )
}
