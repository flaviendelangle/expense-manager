export type ParametricValue = number | { min: number; max: number }

type RecurrentExpense = {
  description: string
  category: [string, string]

  /**
   * Probability for the expense to occur on a specific day
   */
  probability: number

  /**
   * Minimum amount of day between two expenses of this type
   */
  minimumInterval?: number

  value: ParametricValue
}

type MonthlyExpense = {
  description?: string
  category: [string, string]
  value: ParametricValue
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
