import { pick } from 'lodash'
import * as React from 'react'
import { useSortBy, usePagination, useFilters } from 'react-table'

import { Modal } from '@habx/ui-core'
import { Row, Table, useTable } from '@habx/ui-table'

import { UpsertExpensePayload } from '@globalTypes/api'
import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { ExpensesHeaderBars } from '../ExpensesHeaderBars'
import { UpsertExpenseForm } from '../UpsertExpenseForm'

import { useColumns } from './ExpensesTable.columns'
import { ExpensesTableContent } from './ExpensesTable.style'

const getRowCharacteristics = () => ({
  isInteractive: true,
})

export const ExpensesTable: React.VoidFunctionComponent<ExpensesTableProps> = ({
  data,
  loading,
}) => {
  const [
    selectedExpense,
    setSelectedExpense,
  ] = React.useState<ExpenseBasicInformation | null>(null)

  const columns = useColumns()

  const tableInstance = useTable(
    {
      data: data ?? [],
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
      <ExpensesHeaderBars />
      <ExpensesTableContent>
        <Table
          loading={loading}
          instance={tableInstance}
          style={{ striped: true, scrollable: true }}
          getRowCharacteristics={getRowCharacteristics}
          onRowClick={handleRowClick}
        />
        <Modal
          title="Édition d'une dépense"
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

interface ExpensesTableProps {
  data: ExpenseBasicInformation[]
  loading: boolean
}
