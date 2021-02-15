import md5 from 'md5'

import { EarningModel, UpsertEarningPayload } from '../../models/earning'
import { EarningCategoryModel } from '../../models/earningCategory'
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { ExpenseCategoryGroupModel } from '../../models/expenseCategoryGroup'

abstract class BaseDataLoader<Input> {
  private readonly cache = new Map<string, string | number>()
  protected readonly manager: DataLoaderManager

  protected create: (input: Input) => Promise<string | number>

  constructor(manager: DataLoaderManager) {
    this.manager = manager
  }

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

class ExpenseCategoryGroupDataLoader extends BaseDataLoader<string> {
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

class ExpenseCategoryDataLoader extends BaseDataLoader<ExpenseCategoryDataLoaderInput> {
  create = async ([categoryGroupName, categoryName]) => {
    const expenseCategoryGroupId = await this.manager.expenseCategoryGroupDataLoader.load(
      categoryGroupName
    )

    const value = await ExpenseCategoryModel.upsertReference({
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
  create = async ({ category, ...payload }: ExpenseDataLoaderInput) => {
    const expenseCategoryId = await this.manager.expenseCategoryDataLoader.load(
      category
    )

    const value = await ExpenseModel.upsertReference({
      expenseCategoryId,
      ...payload,
    })

    return value.id
  }
}

class EarningCategoryDataLoader extends BaseDataLoader<string> {
  create = async (categoryName) => {
    const value = await EarningCategoryModel.upsertReference({
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
  create = async ({ category, ...payload }: EarningDataLoaderInput) => {
    const earningCategoryId = await this.manager.earningCategoryDataLoader.load(
      category
    )

    const value = await EarningModel.upsertReference({
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
