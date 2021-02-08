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
} from '@habx/ui-core'

import { useExpenses } from '@hooks/useExpenses'

import { ExpensesActions } from './Expenses.style'
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
      <HeaderBar>
        <Breadcrumb>
          <BreadcrumbLinkItem to="/" as={Link}>
            Gestionnaire de dépenses
          </BreadcrumbLinkItem>
          <BreadcrumbItem>Dépenses</BreadcrumbItem>
        </Breadcrumb>
        <ExpensesActions>
          <Routes>
            <Route
              path="/table"
              element={
                <Link to="/expenses/stats">
                  <IconButton icon="stats" small background="grey" />
                </Link>
              }
            />
            <Route
              path="/stats"
              element={
                <Link to="/expenses/table">
                  <IconButton icon="list" small background="grey" />
                </Link>
              }
            />
          </Routes>
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
      <Routes>
        <Route
          path="/table"
          element={
            <ExpensesTable data={expenses.data} loading={expenses.loading} />
          }
        />
        <Route
          path="/stats"
          element={<ExpensesGraphs data={expenses.data} />}
        />
        <Navigate to="/expenses/table" />
      </Routes>
    </React.Fragment>
  )
}
