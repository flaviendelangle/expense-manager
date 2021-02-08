import { withFinalForm } from '@habx/lib-form-helper'

import { SelectExpenseCategory as BaseSelectExpenseCategory } from '@components/form/SelectExpenseCategory'

export const SelectExpenseCategory = withFinalForm()(BaseSelectExpenseCategory)
