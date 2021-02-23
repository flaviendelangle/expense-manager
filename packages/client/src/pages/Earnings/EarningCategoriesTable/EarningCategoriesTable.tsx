import { ModalState } from '@delangle/use-modal'
import { pick } from 'lodash'
import * as React from 'react'

import { IconButton, Modal, Tooltip } from '@habx/ui-core'
import { useTable, Table, Row } from '@habx/ui-table'

import { UpsertEarningCategoryPayload } from '@globalTypes/api'
import {
  EarningCategoryBasicInformation,
  useEarningCategories,
} from '@hooks/useEarningCategories'
import { useTranslate } from '@hooks/useTranslate'

import { EarningsHeaderBars } from '../EarningsHeaderBars'
import { UpsertEarningCategoryForm } from '../UpsertEarningCategoryForm'

import { useColumns } from './EarningCategoriesTable.columns'
import { EarningCategoriesTableContent } from './EarningCategoriesTable.style'

const getRowCharacteristics = () => ({
  isInteractive: true,
})

export const EarningCategoriesTable: React.VoidFunctionComponent = () => {
  const earningCategories = useEarningCategories()
  const columns = useColumns()
  const t = useTranslate()

  const [
    selectedEarningCategory,
    setSelectedEarningCategory,
  ] = React.useState<EarningCategoryBasicInformation | null>(null)

  const tableInstance = useTable({
    data: earningCategories.data,
    columns,
  })

  const editEarningCategoryPayload = React.useMemo<UpsertEarningCategoryPayload | null>(() => {
    if (!selectedEarningCategory) {
      return null
    }

    return pick(selectedEarningCategory, ['name', 'description', 'id'])
  }, [selectedEarningCategory])

  const handleRowClick = React.useCallback(
    (row: Row<EarningCategoryBasicInformation>) =>
      setSelectedEarningCategory(row.original),
    []
  )

  return (
    <React.Fragment>
      <EarningsHeaderBars
        actions={
          <Modal
            title={t('pages.earnings.categoryModal.new.title')}
            triggerElement={
              <Tooltip title={t('pages.earnings.categoryModal.new.title')}>
                <IconButton icon="add" small background="grey" />
              </Tooltip>
            }
            persistent
          >
            {(modal) =>
              modal.state !== ModalState.closed && (
                <UpsertEarningCategoryForm
                  initialValues={undefined}
                  onClose={modal.close}
                />
              )
            }
          </Modal>
        }
      />
      <EarningCategoriesTableContent>
        <Table
          loading={earningCategories.loading}
          instance={tableInstance}
          style={{ striped: true, scrollable: true }}
          onRowClick={handleRowClick}
          getRowCharacteristics={getRowCharacteristics}
        />
        <Modal
          title={t('pages.earnings.categoryModal.edit.title')}
          value={editEarningCategoryPayload}
          open={!!editEarningCategoryPayload}
          onClose={() => setSelectedEarningCategory(null)}
          persistent
        >
          {(modal) => (
            <UpsertEarningCategoryForm
              initialValues={modal.value}
              onClose={modal.close}
            />
          )}
        </Modal>
      </EarningCategoriesTableContent>
    </React.Fragment>
  )
}
