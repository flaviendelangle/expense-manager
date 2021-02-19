import { InsertUserPayload } from '../../models/user'

export type ParametricValue = number | { min: number; max: number }

export type Refund = {
  description?: string
  maxValue: number
  earningCategory: string
  probability: number
}

export type BasicExpense = {
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

interface UserProfile {
  credentials: InsertUserPayload
  isAdmin?: boolean
  recurrentExpenses?: RecurrentExpense[]
  monthlyExpenses?: MonthlyExpense[]
  monthlyEarnings?: MonthlyEarning[]
}

export interface Profile {
  users?: UserProfile[]
}
