import { pick } from 'lodash'
import * as React from 'react'
import { useSortBy } from 'react-table'

import { Modal } from '@habx/ui-core'
import { Row, Table, useTable } from '@habx/ui-table'

import { UpsertExpensePayload } from '@globalTypes/api'
import { EarningBasicInformation } from '@hooks/useEarnings'
import { useTranslate } from '@hooks/useTranslate'

import { UpsertEarningForm } from '../UpsertEarningForm'

import { useColumns } from './EarningsTable.columns'
import { ExpensesTableContainer } from './EarningsTable.style'

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

  const t = useTranslate()
  const columns = useColumns()

  const tableInstance = useTable(
    {
      data,
      columns,
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
      ...pick(selectedEarning, ['description', 'value', 'id']),
      earnedAt: new Date(selectedEarning.earnedAt),
      earningCategoryId: selectedEarning.earningCategory.id,
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
        title={t('pages.earnings.itemModal.edit.title')}
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
