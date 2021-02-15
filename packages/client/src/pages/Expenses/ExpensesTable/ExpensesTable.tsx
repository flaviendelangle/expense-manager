import { format } from 'date-fns'
import { pick } from 'lodash'
import * as React from 'react'
import { Renderer, useSortBy, usePagination } from 'react-table'

import { Modal } from '@habx/ui-core'
import { CellProps, Column, Row, Table, useTable } from '@habx/ui-table'

import { UpsertExpensePayload } from '@globalTypes/api'
import { ExpenseBasicInformation } from '@hooks/useExpenses'

import { UpsertExpenseForm } from '../UpsertExpenseForm'

import { ExpensesTableContainer } from './ExpensesTable.style'

const COLUMNS: Column<ExpenseBasicInformation>[] = [
  {
    Header: 'Date',
    accessor: 'spentAt',
    Cell: (({ cell }) =>
      format(new Date(cell.value), 'yyyy-MM-dd')) as Renderer<
      CellProps<ExpenseBasicInformation, string>
    >,
  },
  {
    Header: 'Catégorie',
    id: 'expenseCategory',
    accessor: (el) => el.expenseCategory,
    Cell: (({ cell }) =>
      `${cell.value.expenseCategoryGroup.name} - ${cell.value.name}`) as Renderer<
      CellProps<
        ExpenseBasicInformation,
        ExpenseBasicInformation['expenseCategory']
      >
    >,
  },
  {
    Header: 'Montant',
    accessor: 'value',
    Cell: (({ cell }) => `${cell.value}€`) as Renderer<
      CellProps<ExpenseBasicInformation, number>
    >,
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
]

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

  const tableInstance = useTable(
    {
      data,
      columns: COLUMNS,
      initialState: {
        sortBy: [{ id: 'spentAt', desc: true }],
        pageSize: 20,
      },
    },
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
      categoryId: selectedExpense.expenseCategory.id,
    }
  }, [selectedExpense])

  const handleRowClick = React.useCallback(
    (row: Row<ExpenseBasicInformation>) => setSelectedExpense(row.original),
    []
  )

  return (
    <ExpensesTableContainer>
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
      >
        {(modal) => (
          <UpsertExpenseForm
            initialValues={modal.value}
            onClose={modal.close}
          />
        )}
      </Modal>
    </ExpensesTableContainer>
  )
}

interface ExpensesTableProps {
  data: ExpenseBasicInformation[]
  loading: boolean
}
