import md5 from 'md5'

import { EarningModel, UpsertEarningPayload } from '../../models/earning'
import { EarningCategoryModel } from '../../models/earningCategory'
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { ExpenseCategoryGroupModel } from '../../models/expenseCategoryGroup'

abstract class BaseDataLoader<Input> {
  private readonly cache = new Map<string, string | number>()
  protected readonly manager: DataLoaderManager

  protected create: (
    userId: string | number,
    input: Input
  ) => Promise<string | number>

  constructor(manager: DataLoaderManager) {
    this.manager = manager
  }

  public load = async (userId: string | number, input: Input) => {
    const hash = md5(JSON.stringify({ userId, input }))
    const idFromCache = this.cache.get(hash)

    if (idFromCache) {
      return idFromCache
    }

    const idFromCreation = await this.create(userId, input)
    this.cache.set(hash, idFromCreation)

    return idFromCreation
  }
}

class ExpenseCategoryGroupDataLoader extends BaseDataLoader<string> {
  create = async (userId: string | number, categoryGroupName: string) => {
    const value = await ExpenseCategoryGroupModel.upsertReference(userId, {
      name: categoryGroupName,
    })

    return value.id
  }
}

type ExpenseCategoryDataLoaderInput = [
  categoryGroupName: string,
  categoryName: string
]

class ExpenseCategoryDataLoader extends BaseDataLoader<ExpenseCategoryDataLoaderInput> {
  create = async (
    userId: string | number,
    [categoryGroupName, categoryName]: ExpenseCategoryDataLoaderInput
  ) => {
    const expenseCategoryGroupId = await this.manager.expenseCategoryGroupDataLoader.load(
      userId,
      categoryGroupName
    )

    const value = await ExpenseCategoryModel.upsertReference(userId, {
      name: categoryName,
      expenseCategoryGroupId,
    })

    return value.id
  }
}

type ExpenseDataLoaderInput = Omit<
  UpsertExpensePayload,
  'id' | 'expenseCategoryId'
> & {
  category: [string, string]
}

class ExpenseDataLoader extends BaseDataLoader<ExpenseDataLoaderInput> {
  create = async (
    userId: string | number,
    { category, ...payload }: ExpenseDataLoaderInput
  ) => {
    const expenseCategoryId = await this.manager.expenseCategoryDataLoader.load(
      userId,
      category
    )

    const value = await ExpenseModel.upsertReference(userId, {
      expenseCategoryId,
      ...payload,
    })

    return value.id
  }
}

class EarningCategoryDataLoader extends BaseDataLoader<string> {
  create = async (userId: string | number, categoryName: string) => {
    const value = await EarningCategoryModel.upsertReference(userId, {
      name: categoryName,
    })

    return value.id
  }
}

type EarningDataLoaderInput = Omit<
  UpsertEarningPayload,
  'id' | 'earningCategoryId'
> & {
  category: string
}

class EarningDataLoader extends BaseDataLoader<EarningDataLoaderInput> {
  create = async (
    userId: string | number,
    { category, ...payload }: EarningDataLoaderInput
  ) => {
    const earningCategoryId = await this.manager.earningCategoryDataLoader.load(
      userId,
      category
    )

    const value = await EarningModel.upsertReference(userId, {
      earningCategoryId,
      ...payload,
    })

    return value.id
  }
}

export class DataLoaderManager {
  public earningCategoryDataLoader = new EarningCategoryDataLoader(this)
  public earningDataLoader = new EarningDataLoader(this)

  public expenseCategoryGroupDataLoader = new ExpenseCategoryGroupDataLoader(
    this
  )
  public expenseCategoryDataLoader = new ExpenseCategoryDataLoader(this)
  public expenseDataLoader = new ExpenseDataLoader(this)
}
