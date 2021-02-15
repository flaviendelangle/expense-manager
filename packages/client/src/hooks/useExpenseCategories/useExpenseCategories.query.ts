import { gql } from '@apollo/client'

export const expenseCategoryBasicInformationFragment = gql`
  fragment ExpenseCategoryBasicInformation on ExpenseCategory {
    id
    name
    expenseCategoryGroup {
      id
      name
    }
  }
`

export const listExpenseCategoriesQuery = gql`
  query listExpenseCategories($filters: ExpenseCategoryFilters) {
    expenseCategories(filters: $filters) {
      nodes {
        id
        ...ExpenseCategoryBasicInformation
      }
    }
  }

  ${expenseCategoryBasicInformationFragment}
`
