import { gql } from '@apollo/client'

import { expenseCategoryGroupBasicInformationFragment } from '@hooks/useExpenseCategoryGroups'

export const upsertExpenseCategoryGroupFormMutation = gql`
  mutation upsertExpenseCategoryGroupForm(
    $payload: UpsertExpenseCategoryGroupPayload!
  ) {
    upsertExpenseCategoryGroup(payload: $payload) {
      id
      ...ExpenseCategoryGroupBasicInformation
    }
  }

  ${expenseCategoryGroupBasicInformationFragment}
`
