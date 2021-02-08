import { orderBy } from 'lodash'
import * as React from 'react'

import { Select, SelectProps } from '@habx/ui-core'

import { useExpenseCategories } from '@hooks/useExpenseCategories'

export const SelectExpenseCategory: React.FunctionComponent<
  Omit<SelectProps, 'options'>
> = (props) => {
  const categories = useExpenseCategories()

  const options = React.useMemo(
    () =>
      orderBy(
        (categories.data ?? []).map((category) => ({
          label: `${category.categoryGroup.name} - ${category.name}`,
          value: category.id,
        })),
        (option) => option.label
      ),
    [categories.data]
  )

  return <Select options={options} {...props} />
}