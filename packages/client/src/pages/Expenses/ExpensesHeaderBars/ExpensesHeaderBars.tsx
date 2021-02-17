import { ModalState } from '@delangle/use-modal'
import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'

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

import { ExpensesActions } from '../Expenses.style'
import { UpsertExpenseForm } from '../UpsertExpenseForm'

const BreadcrumbLinkItem = BreadcrumbItem as React.ForwardRefExoticComponent<
  BreadcrumbItemProps & (LinkProps | React.HTMLProps<HTMLAnchorElement>)
>

export const ExpensesHeaderBars: React.VoidFunctionComponent<ExpensesHeaderBarProps> = ({
  actions,
}) => (
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
        {actions}
        <Modal
          title="Nouvelle dépense"
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

interface ExpensesHeaderBarProps {
  actions?: React.ReactNode
}
