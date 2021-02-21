import { format } from 'date-fns'
import * as React from 'react'
import { Renderer } from 'react-table'

import { CellProps, Column } from '@habx/ui-table'

import { EarningBasicInformation } from '@hooks/useEarnings'
import { useTranslate } from '@hooks/useTranslate'

export const useColumns = () => {
  const t = useTranslate()

  return React.useMemo<Column<EarningBasicInformation>[]>(
    () => [
      {
        Header: t('entities.earnings.fields.earnedAt.label'),
        accessor: 'earnedAt',
        Cell: (({ cell }) =>
          format(new Date(cell.value), 'yyyy-MM-dd')) as Renderer<
          CellProps<EarningBasicInformation, string>
        >,
      },
      {
        Header: t('entities.earnings.fields.earningCategory.label'),
        id: 'category',
        accessor: (el) => el.earningCategory.name,
      },
      {
        Header: t('entities.earnings.fields.amount.label'),
        accessor: 'value',
        Cell: (({ cell }) => `${cell.value}€`) as Renderer<
          CellProps<EarningBasicInformation, number>
        >,
      },
      {
        Header: t('entities.earnings.fields.description.label'),
        accessor: 'description',
      },
    ],
    [t]
  )
}
