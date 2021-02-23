import { ModalState } from '@delangle/use-modal'
import { pick } from 'lodash'
import * as React from 'react'
import { useSortBy, usePagination, useFilters } from 'react-table'

import { IconButton, Modal, Tooltip } from '@habx/ui-core'
import { Row, Table, useTable } from '@habx/ui-table'

import { UpsertExpensePayload } from '@globalTypes/api'
import { ExpenseBasicInformation, useExpenses } from '@hooks/useExpenses'
import { useTranslate } from '@hooks/useTranslate'

import { ExpensesHeaderBars } from '../ExpensesHeaderBars'
import { UpsertExpenseForm } from '../UpsertExpenseForm'

import { useColumns } from './ExpensesTable.columns'
import { ExpensesTableContent } from './ExpensesTable.style'

const getRowCharacteristics = () => ({
  isInteractive: true,
})

export const ExpensesTable: React.VoidFunctionComponent = () => {
  const expenses = useExpenses()

  const [
    selectedExpense,
    setSelectedExpense,
  ] = React.useState<ExpenseBasicInformation | null>(null)

  const t = useTranslate()
  const columns = useColumns()

  const tableInstance = useTable(
    {
      data: expenses.data,
      columns,
      initialState: {
        sortBy: [{ id: 'spentAt', desc: true }],
        pageSize: 20,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  )

  const editExpensePayload = React.useMemo<UpsertExpensePayload | null>(() => {
    if (!selectedExpense) {
      return null
    }

    return {
      ...pick(selectedExpense, ['description', 'value', 'id']),
      spentAt: new Date(selectedExpense.spentAt),
      expenseCategoryId: selectedExpense.expenseCategory.id,
      refund: selectedExpense.refund
        ? {
            ...pick(selectedExpense.refund, [
              'id',
              'description',
              'refundedAt',
              'value',
            ]),
            earningCategoryId: selectedExpense.refund.earningCategory.id,
          }
        : undefined,
    }
  }, [selectedExpense])

  const handleRowClick = React.useCallback(
    (row: Row<ExpenseBasicInformation>) => setSelectedExpense(row.original),
    []
  )

  return (
    <React.Fragment>
      <ExpensesHeaderBars
        actions={
          <Modal
            title={t('pages.expenses.itemModal.new.title')}
            triggerElement={
              <Tooltip title={t('pages.expenses.itemModal.new.title')}>
                <IconButton icon="add" small background="grey" />
              </Tooltip>
            }
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
        }
      />
      <ExpensesTableContent>
        <Table
          loading={expenses.loading}
          instance={tableInstance}
          style={{ striped: true, scrollable: true }}
          getRowCharacteristics={getRowCharacteristics}
          onRowClick={handleRowClick}
        />
        <Modal
          title={t('pages.expenses.itemModal.edit.title')}
          value={editExpensePayload}
          open={!!editExpensePayload}
          onClose={() => setSelectedExpense(null)}
          persistent
          width="large"
        >
          {(modal) => (
            <UpsertExpenseForm
              initialValues={modal.value}
              onClose={modal.close}
            />
          )}
        </Modal>
      </ExpensesTableContent>
    </React.Fragment>
  )
}
