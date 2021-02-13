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

  valueMax: number
  valueMin: number
}

type MonthlyExpense = {
  description?: string
  category: [string, string]
  value: number
  date: number
}

type MonthlyEarning = {
  description?: string
  category: string
  value: number
  date: number
}

export interface Profile {
  recurrentExpenses?: RecurrentExpense[]
  monthlyExpenses?: MonthlyExpense[]
  monthlyEarnings?: MonthlyEarning[]
}
