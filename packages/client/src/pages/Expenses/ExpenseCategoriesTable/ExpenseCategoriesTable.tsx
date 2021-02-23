import { ModalState } from '@delangle/use-modal'
import { pick } from 'lodash'
import * as React from 'react'

import { IconButton, Modal, Tooltip } from '@habx/ui-core'
import { useTable, Table, Row } from '@habx/ui-table'

import { UpsertExpenseCategoryPayload } from '@globalTypes/api'
import {
  ExpenseCategoryBasicInformation,
  useExpenseCategories,
} from '@hooks/useExpenseCategories'
import { useTranslate } from '@hooks/useTranslate'

import { ExpensesHeaderBars } from '../ExpensesHeaderBars'
import { UpsertExpenseCategoryForm } from '../UpsertExpenseCategoryForm'

import { useColumns } from './ExpenseCategoriesTable.columns'
import { ExpenseCategoriesTableContent } from './ExpenseCategoriesTable.style'

const getRowCharacteristics = () => ({
  isInteractive: true,
})

export const ExpenseCategoriesTable: React.VoidFunctionComponent = () => {
  const expenseCategories = useExpenseCategories()
  const columns = useColumns()
  const t = useTranslate()

  const [
    selectedExpenseCategory,
    setSelectedExpenseCategory,
  ] = React.useState<ExpenseCategoryBasicInformation | null>(null)

  const tableInstance = useTable({
    data: expenseCategories.data,
    columns,
  })

  const editExpenseCategoryPayload = React.useMemo<UpsertExpenseCategoryPayload | null>(() => {
    if (!selectedExpenseCategory) {
      return null
    }

    return {
      ...pick(selectedExpenseCategory, ['name', 'description', 'id']),
      expenseCategoryGroupId: selectedExpenseCategory.expenseCategoryGroup.id,
    }
  }, [selectedExpenseCategory])

  const handleRowClick = React.useCallback(
    (row: Row<ExpenseCategoryBasicInformation>) =>
      setSelectedExpenseCategory(row.original),
    []
  )

  return (
    <React.Fragment>
      <ExpensesHeaderBars
        actions={
          <Modal
            title={t('pages.expenses.categoryModal.new.title')}
            triggerElement={
              <Tooltip title={t('pages.expenses.categoryModal.new.title')}>
                <IconButton icon="add" small background="grey" />
              </Tooltip>
            }
            persistent
          >
            {(modal) =>
              modal.state !== ModalState.closed && (
                <UpsertExpenseCategoryForm
                  initialValues={undefined}
                  onClose={modal.close}
                />
              )
            }
          </Modal>
        }
      />
      <ExpenseCategoriesTableContent>
        <Table
          loading={expenseCategories.loading}
          instance={tableInstance}
          style={{ striped: true, scrollable: true }}
          onRowClick={handleRowClick}
          getRowCharacteristics={getRowCharacteristics}
        />
        <Modal
          title={t('pages.expenses.categoryModal.edit.title')}
          value={editExpenseCategoryPayload}
          open={!!editExpenseCategoryPayload}
          onClose={() => setSelectedExpenseCategory(null)}
          persistent
        >
          {(modal) => (
            <UpsertExpenseCategoryForm
              initialValues={modal.value}
              onClose={modal.close}
            />
          )}
        </Modal>
      </ExpenseCategoriesTableContent>
    </React.Fragment>
  )
}
