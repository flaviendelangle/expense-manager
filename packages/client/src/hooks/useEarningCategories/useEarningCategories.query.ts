import { gql } from '@apollo/client'

export const earningCategoryBasicInformationFragment = gql`
  fragment EarningCategoryBasicInformation on EarningCategory {
    id
    name
    description
  }
`

export const listEarningCategoriesQuery = gql`
  query listEarningCategories($filters: EarningCategoryFilters) {
    earningCategories(filters: $filters) {
      nodes {
        id
        ...EarningCategoryBasicInformation
      }
    }
  }

  ${earningCategoryBasicInformationFragment}
`
