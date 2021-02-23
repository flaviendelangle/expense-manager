import * as React from 'react'

import { Column } from '@habx/ui-table'

import { ExpenseCategoryGroupBasicInformation } from '@hooks/useExpenseCategoryGroups'
import { useTranslate } from '@hooks/useTranslate'

export const useColumns = () => {
  const t = useTranslate()

  return React.useMemo<Column<ExpenseCategoryGroupBasicInformation>[]>(
    () => [
      {
        Header: t('entities.expenseCategories.fields.name.label'),
        accessor: 'name',
      },
      {
        Header: t('entities.expenseCategories.fields.description.label'),
        accessor: 'description',
      },
    ],
    [t]
  )
}
