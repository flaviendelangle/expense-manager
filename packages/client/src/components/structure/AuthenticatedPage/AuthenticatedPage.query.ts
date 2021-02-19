import { gql } from '@apollo/client'

export const hasServerBeenInitializedQuery = gql`
  query hasServerBeenInitialized {
    serverStatus {
      id
      hasBeenInitialized
    }
  }
`
