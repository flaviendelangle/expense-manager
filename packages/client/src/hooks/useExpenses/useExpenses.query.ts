import { gql } from '@apollo/client'

export const expenseBasicInformationFragment = gql`
  fragment ExpenseBasicInformation on Expense {
    id
    description
    value
    spentAt
    expenseCategory {
      id
      name
      expenseCategoryGroup {
        id
        name
      }
    }
  }
`

export const listExpensesQuery = gql`
  query listExpenses(
    $filters: ExpenseFilters
    $orderBy: OrderOptions
    $paginate: PaginationOptions
  ) {
    expenses(filters: $filters, orderBy: $orderBy, paginate: $paginate) {
      nodes {
        id
        ...ExpenseBasicInformation
      }
    }
  }

  ${expenseBasicInformationFragment}
`
