import 'reflect-metadata'

import {
  addDays,
  addHours,
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
import { ParametricValue, Profile } from './ProfileLoader.interface'

const getValueFromParametricValue = (value: ParametricValue): number => {
  if (typeof value === 'number') {
    return value
  }

  if (value.max != null && value.min != null) {
    return (
      Math.round((value.min + (value.max - value.min) * Math.random()) * 10) /
      10
    )
  }

  throw Error('Invalid parametric value')
}

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
    this.days = eachDayOfInterval({
      start: this.startDate,
      end: this.endDate,
    }).map((day) => addHours(day, 12))

    Model.knex(this.knex)
  }

  public load = async () => {
    const t = new Date().getTime()
    for (let month = 0; month < this.monthAmount; month++) {
      for (const monthlyExpense of this.profile.monthlyExpenses ?? []) {
        const spentAt = addHours(
          addDays(addMonths(this.startDate, month), monthlyExpense.date),
          12
        )

        if (isBefore(spentAt, this.endDate)) {
          await this.expenseDataLoader.load({
            spentAt,
            value: getValueFromParametricValue(monthlyExpense.value),
            description: monthlyExpense.description,
            category: monthlyExpense.category,
          })
        }
      }

      for (const monthlyEarning of this.profile.monthlyEarnings ?? []) {
        const earnedAt = addHours(
          addDays(addMonths(this.startDate, month), monthlyEarning.date),
          12
        )

        if (isBefore(earnedAt, this.endDate)) {
          await this.earningDataLoader.load({
            earnedAt,
            value: getValueFromParametricValue(monthlyEarning.value),
            description: monthlyEarning.description,
            category: monthlyEarning.category,
          })
        }
      }
    }

    // eslint-disable-next-line no-console
    console.log('Monthly expenses and earnings inserted')

    for (const recurrenceExpense of this.profile.recurrentExpenses ?? []) {
      let lastExpenseDate: Date | null = this.startDate

      for (let i = 0; i < this.days.length; i++) {
        const shouldDoExpenseOnThisDay =
          differenceInDays(this.days[i], lastExpenseDate) >
            recurrenceExpense.minimumInterval &&
          Math.random() < recurrenceExpense.probability

        if (shouldDoExpenseOnThisDay) {
          lastExpenseDate = this.days[i]

          await this.expenseDataLoader.load({
            spentAt: this.days[i],
            value: getValueFromParametricValue(recurrenceExpense.value),
            description: recurrenceExpense.description,
            category: recurrenceExpense.category,
          })
        }
      }
    }

    // eslint-disable-next-line no-console
    console.log('Recurrent expenses inserted')

    // eslint-disable-next-line no-console
    console.log(`Total time : ${(new Date().getTime() - t) / 1000}sec`)

    await this.knex.destroy()
  }
}
