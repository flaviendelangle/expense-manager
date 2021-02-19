import { gql } from '@apollo/client'

import { userBasicInformationFragment } from '@hooks/useCurrentUser'

export const loginMutation = gql`
  mutation login($payload: LoginPayload!) {
    login(payload: $payload) {
      id
      ...UserBasicInformation
    }
  }

  ${userBasicInformationFragment}
`
