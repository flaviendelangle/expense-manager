import md5 from 'md5'

import { EarningModel, UpsertEarningPayload } from '../../models/earning'
import { EarningCategoryModel } from '../../models/earningCategory'
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { ExpenseCategoryGroupModel } from '../../models/expenseCategoryGroup'

abstract class BaseDataLoader<Input> {
  private readonly cache: Map<string, string | number> = new Map()

  protected create: (input: Input) => Promise<string | number>

  public load = async (input: Input) => {
    const hash = md5(JSON.stringify(input))
    const idFromCache = this.cache.get(hash)

    if (idFromCache) {
      return idFromCache
    }

    const idFromCreation = await this.create(input)
    this.cache.set(hash, idFromCreation)

    return idFromCreation
  }
}

export class ExpenseCategoryGroupDataLoader extends BaseDataLoader<string> {
  create = async (categoryGroupName) => {
    const value = await ExpenseCategoryGroupModel.upsertReference({
      name: categoryGroupName,
    })

    return value.id
  }
}

type ExpenseCategoryDataLoaderInput = [
  categoryGroupName: string,
  categoryName: string
]

export class ExpenseCategoryDataLoader extends BaseDataLoader<ExpenseCategoryDataLoaderInput> {
  expenseCategoryGroupDataLoader = new ExpenseCategoryGroupDataLoader()

  create = async ([categoryGroupName, categoryName]) => {
    const categoryGroupId = await this.expenseCategoryGroupDataLoader.load(
      categoryGroupName
    )

    const value = await ExpenseCategoryModel.upsertReference({
      name: categoryName,
      categoryGroupId,
    })

    return value.id
  }
}

type ExpenseDataLoaderInput = Omit<
  UpsertExpensePayload,
  'id' | 'categoryId'
> & {
  category: [string, string]
}

export class ExpenseDataLoader extends BaseDataLoader<ExpenseDataLoaderInput> {
  expenseCategoryDataLoader = new ExpenseCategoryDataLoader()

  create = async ({ category, ...payload }: ExpenseDataLoaderInput) => {
    const categoryId = await this.expenseCategoryDataLoader.load(category)

    const value = await ExpenseModel.upsertReference({
      categoryId,
      ...payload,
    })

    return value.id
  }
}

export class EarningCategoryDataLoader extends BaseDataLoader<string> {
  create = async (categoryName) => {
    const value = await EarningCategoryModel.upsertReference({
      name: categoryName,
    })

    return value.id
  }
}

type EarningDataLoaderInput = Omit<
  UpsertEarningPayload,
  'id' | 'categoryId'
> & {
  category: string
}

export class EarningDataLoader extends BaseDataLoader<EarningDataLoaderInput> {
  earningCategoryDataLoader = new EarningCategoryDataLoader()

  create = async ({ category, ...payload }: EarningDataLoaderInput) => {
    const categoryId = await this.earningCategoryDataLoader.load(category)

    const value = await EarningModel.upsertReference({
      categoryId,
      ...payload,
    })

    return value.id
  }
}
