import { gql } from '@apollo/client'

import { expenseCategoryBasicInformationFragment } from '@hooks/useExpenseCategories'

export const upsertExpenseCategoryFormMutation = gql`
  mutation upsertExpenseCategoryForm($payload: UpsertExpenseCategoryPayload!) {
    upsertExpenseCategory(payload: $payload) {
      id
      ...ExpenseCategoryBasicInformation
    }
  }

  ${expenseCategoryBasicInformationFragment}
`
