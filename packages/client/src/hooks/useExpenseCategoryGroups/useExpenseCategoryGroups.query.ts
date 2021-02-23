import { gql } from '@apollo/client'

export const expenseCategoryGroupBasicInformationFragment = gql`
  fragment ExpenseCategoryGroupBasicInformation on ExpenseCategoryGroup {
    id
    name
    description
  }
`

export const listExpenseCategoryGroupsQuery = gql`
  query listExpenseCategoryGroups($filters: ExpenseCategoryGroupFilters) {
    expenseCategoryGroups(filters: $filters) {
      nodes {
        id
        ...ExpenseCategoryGroupBasicInformation
      }
    }
  }

  ${expenseCategoryGroupBasicInformationFragment}
`
