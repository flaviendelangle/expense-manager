import { gql } from '@apollo/client'

export const userBasicInformationFragment = gql`
  fragment UserBasicInformation on User {
    id
    email
  }
`

export const currentUserQuery = gql`
  query currentUser {
    me {
      id
      ...UserBasicInformation
    }
  }

  ${userBasicInformationFragment}
`
