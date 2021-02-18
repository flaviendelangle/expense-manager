import * as React from 'react'

import { Select, SelectProps } from '@habx/ui-core'

import { useExpenseCategoriesOptions } from '@hooks/useExpenseCategoriesOptions'

export const SelectExpenseCategory: React.FunctionComponent<SelectExpenseCategoryProps> = (
  props
) => {
  const options = useExpenseCategoriesOptions()

  return <Select options={options} {...props} />
}

export type SelectExpenseCategoryProps = Omit<SelectProps, 'options'>
