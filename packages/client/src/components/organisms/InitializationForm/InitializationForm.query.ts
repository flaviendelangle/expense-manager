import { gql } from '@apollo/client'

export const initializeServerMutation = gql`
  mutation initializeServer($adminPayload: InsertUserPayload!) {
    initializeServer(adminPayload: $adminPayload) {
      id
      hasBeenInitialized
    }
  }
`
