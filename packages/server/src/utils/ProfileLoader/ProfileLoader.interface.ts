export type ParametricValue = number | { min: number; max: number }

type Refund = {
  description?: string
  value: ParametricValue
  earningCategory: string
}

type BasicExpense = {
  category: [string, string]
  description?: string
  value: ParametricValue
  refund?: Refund
}

type RecurrentExpense = BasicExpense & {
  /**
   * Probability for the expense to occur on a specific day
   */
  probability: number

  /**
   * Minimum amount of day between two expenses of this type
   */
  minimumInterval?: number
}

type MonthlyExpense = BasicExpense & {
  date: number
}

type MonthlyEarning = {
  description?: string
  category: string
  value: ParametricValue
  date: number
}

export interface Profile {
  recurrentExpenses?: RecurrentExpense[]
  monthlyExpenses?: MonthlyExpense[]
  monthlyEarnings?: MonthlyEarning[]
}
