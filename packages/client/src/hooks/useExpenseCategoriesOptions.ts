import { orderBy } from 'lodash'
import * as React from 'react'

import { useExpenseCategories } from '@hooks/useExpenseCategories'

export const useExpenseCategoriesOptions = () => {
  const categories = useExpenseCategories()

  return React.useMemo(
    () =>
      orderBy(
        (categories.data ?? []).map((category) => ({
          label: `${category.expenseCategoryGroup.name} - ${category.name}`,
          value: category.id,
        })),
        (option) => option.label
      ),
    [categories.data]
  )
}
