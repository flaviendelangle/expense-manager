import { withFinalForm } from '@habx/lib-form-helper'

import { SelectExpenseCategoryGroup as BaseSelectExpenseCategoryGroup } from '@components/form/SelectExpenseCategoryGroup'

export const SelectExpenseCategoryGroup = withFinalForm()(
  BaseSelectExpenseCategoryGroup
)
