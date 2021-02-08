import { gql } from '@apollo/client'

export const expenseCategoryBasicInformationFragment = gql`
  fragment ExpenseCategoryBasicInformation on ExpenseCategory {
    id
    name
  }
`

export const listExpenseCategoriesQuery = gql`
  query listExpenseCategories {
    expenseCategories {
      id
      ...ExpenseCategoryBasicInformation
    }
  }

  ${expenseCategoryBasicInformationFragment}
`
