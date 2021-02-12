import * as Knex from 'knex'

const TABLES = {
  EXPENSE_CATEGORY_GROUPS: 'expense_category_groups',
  EXPENSE_CATEGORIES: 'expense_categories',
  EXPENSES: 'expenses',
  EARNING_CATEGORIES: 'earning_categories',
  EARNINGS: 'earnings',
}

export const up = async (knex: Knex) => {
  await knex.schema.createTable(TABLES.EXPENSE_CATEGORY_GROUPS, (t) => {
    t.increments()

    t.string('name').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['name'])
  })

  await knex.schema.createTable(TABLES.EXPENSE_CATEGORIES, (t) => {
    t.increments()

    t.string('name').notNullable()

    t.integer('category_group_id')
    t.foreign('category_group_id').references(
      `${TABLES.EXPENSE_CATEGORY_GROUPS}.id`
    )

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['category_group_id', 'name'])
  })

  await knex.schema.createTable(TABLES.EXPENSES, (t) => {
    t.increments()

    t.integer('category_id')
    t.foreign('category_id').references(`${TABLES.EXPENSE_CATEGORIES}.id`)

    t.float('value').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    t.dateTime('spent_at').notNullable()
  })

  await knex.schema.createTable(TABLES.EARNING_CATEGORIES, (t) => {
    t.increments()

    t.string('name').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['name'])
  })

  await knex.schema.createTable(TABLES.EARNINGS, (t) => {
    t.increments()

    t.integer('category_id')
    t.foreign('category_id').references(`${TABLES.EARNING_CATEGORIES}.id`)

    t.float('value').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('earned_at').notNullable()
  })
}

export const down = async (knex: Knex) =>
  Promise.all(
    Object.values(TABLES).map((table) => knex.schema.dropTableIfExists(table))
  )
