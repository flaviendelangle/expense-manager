import * as React from 'react'

import { Column } from '@habx/ui-table'

import { ExpenseCategoryBasicInformation } from '@hooks/useExpenseCategories'
import { useTranslate } from '@hooks/useTranslate'

export const useColumns = () => {
  const t = useTranslate()

  return React.useMemo<Column<ExpenseCategoryBasicInformation>[]>(
    () => [
      {
        Header: t(
          'entities.expenseCategories.fields.expenseCategoryGroup.label'
        ),
        accessor: (el) => el.expenseCategoryGroup.name,
      },
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
