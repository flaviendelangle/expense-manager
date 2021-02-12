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

import { useExpenses } from '@hooks/useExpenses'

import { ExpensesActions, ExpensesContent } from './Expenses.style'
import { ExpensesGraphs } from './ExpensesGraphs'
import { ExpensesTable } from './ExpensesTable'
import { UpsertExpenseForm } from './UpsertExpenseForm'

const BreadcrumbLinkItem = BreadcrumbItem as React.ForwardRefExoticComponent<
  BreadcrumbItemProps & (LinkProps | React.HTMLProps<HTMLAnchorElement>)
>

export const Expenses: React.VoidFunctionComponent = () => {
  const expenses = useExpenses()

  return (
    <React.Fragment>
      <HeaderBar small>
        <Breadcrumb>
          <BreadcrumbLinkItem to="/" as={Link}>
            Gestionnaire de dépenses
          </BreadcrumbLinkItem>
          <BreadcrumbItem>Dépenses</BreadcrumbItem>
        </Breadcrumb>
      </HeaderBar>
      <HeaderBar small>
        <TabsBar>
          <TabsBarItemLink to="/expenses/table">Liste</TabsBarItemLink>
          <TabsBarItemLink to="/expenses/graphs">Graphiques</TabsBarItemLink>
        </TabsBar>
        <ExpensesActions>
          <Modal
            title="Nouvelle dépense"
            triggerElement={<IconButton icon="add" small background="grey" />}
            persistent
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
      <ExpensesContent>
        <Routes>
          <Route
            path="/table"
            element={
              <ExpensesTable data={expenses.data} loading={expenses.loading} />
            }
          />
          <Route
            path="/graphs"
            element={<ExpensesGraphs data={expenses.data} />}
          />
          <Navigate to="/expenses/table" />
        </Routes>
      </ExpensesContent>
    </React.Fragment>
  )
}
