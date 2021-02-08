import * as React from 'react'

import { Select, SelectProps } from '@habx/ui-core'

import { useExpenseCategories } from '@hooks/useExpenseCategories'

export const SelectExpenseCategory: React.FunctionComponent<
  Omit<SelectProps, 'options'>
> = (props) => {
  const categories = useExpenseCategories()

  const options = React.useMemo(
    () =>
      (categories.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories.data]
  )

  return <Select options={options} {...props} />
}
