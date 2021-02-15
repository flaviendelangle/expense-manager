import { gql } from '@apollo/client'

export const earningBasicInformationFragment = gql`
  fragment EarningBasicInformation on Earning {
    id
    description
    value
    earnedAt
    earningCategory {
      id
      name
    }
  }
`

export const listEarningsQuery = gql`
  query listEarnings($filters: EarningFilters) {
    earnings(filters: $filters) {
      nodes {
        id
        ...EarningBasicInformation
      }
    }
  }

  ${earningBasicInformationFragment}
`
