import { ModalState } from '@delangle/use-modal'
import { pick } from 'lodash'
import * as React from 'react'
import { useSortBy } from 'react-table'

import { IconButton, Modal, Tooltip } from '@habx/ui-core'
import { Row, Table, useTable } from '@habx/ui-table'

import { UpsertEarningPayload } from '@globalTypes/api'
import { EarningBasicInformation, useEarnings } from '@hooks/useEarnings'
import { useTranslate } from '@hooks/useTranslate'
import { EarningsHeaderBars } from '@pages/Earnings/EarningsHeaderBars'

import { UpsertEarningForm } from '../UpsertEarningForm'

import { useColumns } from './EarningsTable.columns'
import { EarningsTableContent } from './EarningsTable.style'

const getRowCharacteristics = () => ({
  isInteractive: true,
})

export const EarningsTable: React.VoidFunctionComponent = () => {
  const earnings = useEarnings()

  const [
    selectedEarning,
    setSelectedEarning,
  ] = React.useState<EarningBasicInformation | null>(null)

  const t = useTranslate()
  const columns = useColumns()

  const tableInstance = useTable(
    {
      data: earnings.data,
      columns,
      initialState: {
        sortBy: [{ id: 'earnedAt' }],
      },
    },
    useSortBy
  )

  const editEarningPayload = React.useMemo<UpsertEarningPayload | null>(() => {
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
    <React.Fragment>
      <EarningsHeaderBars
        actions={
          <Modal
            title={t('pages.earnings.itemModal.new.title')}
            triggerElement={
              <Tooltip title={t('pages.earnings.itemModal.new.title')}>
                <IconButton icon="add" small background="grey" />
              </Tooltip>
            }
            persistent
          >
            {(modal) =>
              modal.state !== ModalState.closed && (
                <UpsertEarningForm
                  initialValues={undefined}
                  onClose={modal.close}
                />
              )
            }
          </Modal>
        }
      />
      <EarningsTableContent>
        <Table
          loading={earnings.loading}
          instance={tableInstance}
          style={{ striped: true, scrollable: true }}
          getRowCharacteristics={getRowCharacteristics}
          onRowClick={handleRowClick}
        />
        <Modal
          title={t('pages.earnings.itemModal.edit.title')}
          value={editEarningPayload}
          open={!!editEarningPayload}
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
      </EarningsTableContent>
    </React.Fragment>
  )
}
