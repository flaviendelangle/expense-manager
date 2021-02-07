import { gql } from '@apollo/client'

export const listExpansesQuery = gql`
  query listExpanses {
    expanses {
      id
      description
    }
  }
`
