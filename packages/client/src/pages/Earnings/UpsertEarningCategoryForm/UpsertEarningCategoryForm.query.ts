import { gql } from '@apollo/client'

import { earningCategoryBasicInformationFragment } from '@hooks/useEarningCategories'

export const upsertEarningCategoryFormMutation = gql`
  mutation upsertEarningCategoryForm($payload: UpsertEarningCategoryPayload!) {
    upsertEarningCategory(payload: $payload) {
      id
      ...EarningCategoryBasicInformation
    }
  }

  ${earningCategoryBasicInformationFragment}
`
