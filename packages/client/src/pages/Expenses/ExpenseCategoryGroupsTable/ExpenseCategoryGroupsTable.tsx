import { ModalState } from '@delangle/use-modal'
import { pick } from 'lodash'
import * as React from 'react'

import { IconButton, Modal, Tooltip } from '@habx/ui-core'
import { useTable, Table, Row } from '@habx/ui-table'

import { UpsertExpenseCategoryGroupPayload } from '@globalTypes/api'
import {
  ExpenseCategoryGroupBasicInformation,
  useExpenseCategoryGroups,
} from '@hooks/useExpenseCategoryGroups'
import { useTranslate } from '@hooks/useTranslate'

import { ExpensesHeaderBars } from '../ExpensesHeaderBars'
import { UpsertExpenseCategoryGroupForm } from '../UpsertExpenseCategoryGroupForm'

import { useColumns } from './ExpenseCategoryGroupsTable.columns'
import { ExpenseCategoryGroupsTableContent } from './ExpenseCategoryGroupsTable.style'

const getRowCharacteristics = () => ({
  isInteractive: true,
})

export const ExpenseCategoryGroupsTable: React.VoidFunctionComponent = () => {
  const expenseCategoryGroups = useExpenseCategoryGroups()
  const columns = useColumns()
  const t = useTranslate()

  const [
    selectedExpenseCategory,
    setSelectedExpenseCategory,
  ] = React.useState<ExpenseCategoryGroupBasicInformation | null>(null)

  const tableInstance = useTable({
    data: expenseCategoryGroups.data,
    columns,
  })

  const editExpenseCategoryPayload = React.useMemo<UpsertExpenseCategoryGroupPayload | null>(() => {
    if (!selectedExpenseCategory) {
      return null
    }

    return pick(selectedExpenseCategory, ['name', 'description', 'id'])
  }, [selectedExpenseCategory])

  const handleRowClick = React.useCallback(
    (row: Row<ExpenseCategoryGroupBasicInformation>) =>
      setSelectedExpenseCategory(row.original),
    []
  )

  return (
    <React.Fragment>
      <ExpensesHeaderBars
        actions={
          <Modal
            title={t('pages.expenses.categoryGroupModal.new.title')}
            triggerElement={
              <Tooltip title={t('pages.expenses.categoryGroupModal.new.title')}>
                <IconButton icon="add" small background="grey" />
              </Tooltip>
            }
            persistent
          >
            {(modal) =>
              modal.state !== ModalState.closed && (
                <UpsertExpenseCategoryGroupForm
                  initialValues={undefined}
                  onClose={modal.close}
                />
              )
            }
          </Modal>
        }
      />
      <ExpenseCategoryGroupsTableContent>
        <Table
          loading={expenseCategoryGroups.loading}
          instance={tableInstance}
          style={{ striped: true, scrollable: true }}
          onRowClick={handleRowClick}
          getRowCharacteristics={getRowCharacteristics}
        />
        <Modal
          title={t('pages.expenses.categoryGroupModal.edit.title')}
          value={editExpenseCategoryPayload}
          open={!!editExpenseCategoryPayload}
          onClose={() => setSelectedExpenseCategory(null)}
          persistent
        >
          {(modal) => (
            <UpsertExpenseCategoryGroupForm
              initialValues={modal.value}
              onClose={modal.close}
            />
          )}
        </Modal>
      </ExpenseCategoryGroupsTableContent>
    </React.Fragment>
  )
}
