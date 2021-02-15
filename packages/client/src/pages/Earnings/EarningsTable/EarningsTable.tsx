import { format } from 'date-fns'
import { pick } from 'lodash'
import * as React from 'react'
import { Renderer, useSortBy } from 'react-table'

import { Modal } from '@habx/ui-core'
import { CellProps, Column, Row, Table, useTable } from '@habx/ui-table'

import { UpsertExpensePayload } from '@globalTypes/api'
import { EarningBasicInformation } from '@hooks/useEarnings'

import { UpsertEarningForm } from '../UpsertEarningForm'

import { ExpensesTableContainer } from './EarningsTable.style'

const COLUMNS: Column<EarningBasicInformation>[] = [
  {
    Header: 'Date',
    accessor: 'earnedAt',
    Cell: (({ cell }) =>
      format(new Date(cell.value), 'yyyy-MM-dd')) as Renderer<
      CellProps<EarningBasicInformation, string>
    >,
  },
  {
    Header: 'Catégorie',
    id: 'category',
    accessor: (el) => el.earningCategory.name,
  },
  {
    Header: 'Montant',
    accessor: 'value',
    Cell: (({ cell }) => `${cell.value}€`) as Renderer<
      CellProps<EarningBasicInformation, number>
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

export const EarningsTable: React.VoidFunctionComponent<ExpensesTableProps> = ({
  data,
  loading,
}) => {
  const [
    selectedEarning,
    setSelectedEarning,
  ] = React.useState<EarningBasicInformation | null>(null)

  const tableInstance = useTable(
    {
      data,
      columns: COLUMNS,
      initialState: {
        sortBy: [{ id: 'earnedAt' }],
      },
    },
    useSortBy
  )

  const editExpensePayload = React.useMemo<UpsertExpensePayload | null>(() => {
    if (!selectedEarning) {
      return null
    }

    return {
      ...pick(selectedEarning, ['description', 'value', 'id', 'earnedAt']),
      categoryId: selectedEarning.earningCategory.id,
    }
  }, [selectedEarning])

  const handleRowClick = React.useCallback(
    (row: Row<EarningBasicInformation>) => setSelectedEarning(row.original),
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
        onClose={() => setSelectedEarning(null)}
        persistent
      >
        {(modal) => (
          <UpsertEarningForm
            initialValues={modal.value}
            onClose={modal.close}
          />
        )}
      </Modal>
    </ExpensesTableContainer>
  )
}

interface ExpensesTableProps {
  data: EarningBasicInformation[]
  loading: boolean
}
