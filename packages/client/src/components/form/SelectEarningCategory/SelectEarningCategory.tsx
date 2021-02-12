import { orderBy } from 'lodash'
import * as React from 'react'

import { Select, SelectProps } from '@habx/ui-core'

import { useEarningCategories } from '@hooks/useEarningCategory'

export const SelectEarningCategory: React.FunctionComponent<
  Omit<SelectProps, 'options'>
> = (props) => {
  const categories = useEarningCategories()

  const options = React.useMemo(
    () =>
      orderBy(
        (categories.data ?? []).map((category) => ({
          label: category.name,
          value: category.id,
        })),
        (option) => option.label
      ),
    [categories.data]
  )

  return <Select options={options} {...props} />
}
