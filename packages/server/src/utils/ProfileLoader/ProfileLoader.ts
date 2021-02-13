import 'reflect-metadata'

import {
  addDays,
  addMonths,
  differenceInDays,
  eachDayOfInterval,
  isBefore,
  startOfMonth,
} from 'date-fns'
import Knex from 'knex'
import { Model } from 'objection'

import knexFile from '../../../knexfile'

import { EarningDataLoader, ExpenseDataLoader } from './DataLoaders'
import { Profile } from './ProfileLoader.interface'

export class ProfileLoader {
  private expenseDataLoader = new ExpenseDataLoader()
  private earningDataLoader = new EarningDataLoader()

  private readonly startDate: Date
  private readonly endDate: Date
  private readonly monthAmount: number
  private readonly days: Date[]
  private readonly profile: Profile

  private knex: Knex = Knex(knexFile)

  constructor(profile: Profile, monthAmount: number) {
    this.profile = profile
    this.monthAmount = monthAmount
    this.endDate = new Date()
    this.startDate = startOfMonth(addMonths(this.endDate, -this.monthAmount))
    this.days = eachDayOfInterval({ start: this.startDate, end: this.endDate })

    Model.knex(this.knex)
  }

  public load = async () => {
    for (let month = 0; month < this.monthAmount; month++) {
      for (const monthlyExpense of this.profile.monthlyExpenses ?? []) {
        const spentAt = addDays(
          addMonths(this.startDate, month),
          monthlyExpense.date
        )

        if (isBefore(spentAt, this.endDate)) {
          await this.expenseDataLoader.load({
            spentAt,
            value: monthlyExpense.value,
            description: monthlyExpense.description,
            category: monthlyExpense.category,
          })
        }
      }

      for (const monthlyEarning of this.profile.monthlyEarnings ?? []) {
        const earnedAt = addDays(
          addMonths(this.startDate, month),
          monthlyEarning.date
        )

        if (isBefore(earnedAt, this.endDate)) {
          await this.earningDataLoader.load({
            earnedAt,
            value: monthlyEarning.value,
            description: monthlyEarning.description,
            category: monthlyEarning.category,
          })
        }
      }
    }

    for (const recurrenceExpense of this.profile.recurrentExpenses ?? []) {
      let lastExpenseDate: Date | null = this.startDate

      for (let i = 0; i < this.days.length; i++) {
        const shouldDoExpenseOnThisDay =
          differenceInDays(this.days[i], lastExpenseDate) >
            recurrenceExpense.minimumInterval &&
          Math.random() < recurrenceExpense.probability

        if (shouldDoExpenseOnThisDay) {
          lastExpenseDate = this.days[i]

          const value =
            Math.round(
              (recurrenceExpense.valueMin +
                (recurrenceExpense.valueMax - recurrenceExpense.valueMin) *
                  Math.random()) *
                10
            ) / 10

          await this.expenseDataLoader.load({
            spentAt: this.days[i],
            value,
            description: recurrenceExpense.description,
            category: recurrenceExpense.category,
          })
        }
      }
    }

    await this.knex.destroy()
  }
}
