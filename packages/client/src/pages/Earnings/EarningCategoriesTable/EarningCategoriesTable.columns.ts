import * as React from 'react'

import { Column } from '@habx/ui-table'

import { EarningCategoryBasicInformation } from '@hooks/useEarningCategories'
import { useTranslate } from '@hooks/useTranslate'

export const useColumns = () => {
  const t = useTranslate()

  return React.useMemo<Column<EarningCategoryBasicInformation>[]>(
    () => [
      {
        Header: t('entities.earningCategories.fields.name.label'),
        accessor: 'name',
      },
      {
        Header: t('entities.earningCategories.fields.description.label'),
        accessor: 'description',
      },
    ],
    [t]
  )
}
