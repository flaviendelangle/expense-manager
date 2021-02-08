import { gql } from '@apollo/client'

export const expenseBasicInformationFragment = gql`
  fragment ExpenseBasicInformation on Expense {
    id
    description
    createdAt
    value
    category {
      id
      name
    }
  }
`

export const listExpensesQuery = gql`
  query listExpenses {
    expenses {
      id
      ...ExpenseBasicInformation
    }
  }

  ${expenseBasicInformationFragment}
`
