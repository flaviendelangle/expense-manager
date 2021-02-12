import { ModalState } from '@delangle/use-modal'
import * as React from 'react'
import { Link, LinkProps, Routes, Route, Navigate } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  HeaderBar,
  IconButton,
  Modal,
  TabsBar,
} from '@habx/ui-core'

import { TabsBarItemLink } from '@components/atoms/TabsBarItemLink'

import { useEarnings } from '@hooks/useEarnings'

import { ExpensesActions, ExpensesContent } from './Earnings.style'
import { EarningsGraphs } from './EarningsGraphs'
import { EarningsTable } from './EarningsTable'
import { UpsertEarningForm } from './UpsertEarningForm'

const BreadcrumbLinkItem = BreadcrumbItem as React.ForwardRefExoticComponent<
  BreadcrumbItemProps & (LinkProps | React.HTMLProps<HTMLAnchorElement>)
>

export const Earnings: React.VoidFunctionComponent = () => {
  const earnings = useEarnings()

  return (
    <React.Fragment>
      <HeaderBar small>
        <Breadcrumb>
          <BreadcrumbLinkItem to="/" as={Link}>
            Gestionnaire de dépenses
          </BreadcrumbLinkItem>
          <BreadcrumbItem>Recettes</BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <HeaderBar small>
        <TabsBar>
          <TabsBarItemLink to="/earnings/table">Liste</TabsBarItemLink>
          <TabsBarItemLink to="/earnings/graphs">Graphiques</TabsBarItemLink>
        </TabsBar>
        <ExpensesActions>
          <Modal
            title="Nouvelle recette"
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
        <Routes>
          <Route
            path="/table"
            element={
              <EarningsTable data={earnings.data} loading={earnings.loading} />
            }
          />
          <Route
            path="/graphs"
            element={<EarningsGraphs data={earnings.data} />}
          />
          <Navigate to="/earnings/table" />
        </Routes>
      </ExpensesContent>
    </React.Fragment>
  )
}
