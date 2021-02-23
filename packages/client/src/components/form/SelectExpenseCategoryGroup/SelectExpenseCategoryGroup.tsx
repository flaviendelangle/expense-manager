import { orderBy } from 'lodash'
import * as React from 'react'

import { Select, SelectProps } from '@habx/ui-core'

import { useExpenseCategoryGroups } from '@hooks/useExpenseCategoryGroups'

export const SelectExpenseCategoryGroup: React.FunctionComponent<SelectExpenseCategoryGroupProps> = (
  props
) => {
  const categoryGroups = useExpenseCategoryGroups()

  const options = React.useMemo(
    () =>
      orderBy(
        (categoryGroups.data ?? []).map((categoryGroup) => ({
          label: categoryGroup.name,
          value: categoryGroup.id,
        })),
        (option) => option.label
      ),
    [categoryGroups.data]
  )

  return <Select options={options} {...props} />
}

export type SelectExpenseCategoryGroupProps = Omit<SelectProps, 'options'>
