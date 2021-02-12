import { gql } from '@apollo/client'

import { earningBasicInformationFragment } from '@hooks/useEarnings'

export const upsertEarningFormMutation = gql`
  mutation upsertEarningForm($payload: UpsertEarningPayload!) {
    upsertEarning(payload: $payload) {
      id
      ...EarningBasicInformation
    }
  }

  ${earningBasicInformationFragment}
`
