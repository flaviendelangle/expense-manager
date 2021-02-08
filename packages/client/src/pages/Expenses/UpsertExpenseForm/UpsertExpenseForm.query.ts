import { gql } from '@apollo/client'

import { expenseBasicInformationFragment } from '@hooks/useExpenses'

export const upsertExpenseFormMutation = gql`
  mutation upsertExpenseForm($payload: UpsertExpensePayload!) {
    upsertExpense(payload: $payload) {
      id
      ...ExpenseBasicInformation
    }
  }

  ${expenseBasicInformationFragment}
`
