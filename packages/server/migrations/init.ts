import * as Knex from 'knex'

const TABLES = {
  USERS: 'users',
  EXPENSE_CATEGORY_GROUPS: 'expense_category_groups',
  EXPENSE_CATEGORIES: 'expense_categories',
  EXPENSES: 'expenses',
  EARNING_CATEGORIES: 'earning_categories',
  EARNINGS: 'earnings',
  REFUND: 'refunds',
}

export const up = async (knex: Knex) => {
  await knex.schema.createTable(TABLES.USERS, (t) => {
    t.increments()

    t.string('email').notNullable()

    t.string('password').notNullable()

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['email'])
  })

  await knex.schema.createTable(TABLES.EXPENSE_CATEGORY_GROUPS, (t) => {
    t.increments()

    t.integer('user_id').notNullable()
    t.foreign('user_id').references(`${TABLES.USERS}.id`)

    t.string('name').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['user_id', 'name'])
  })

  await knex.schema.createTable(TABLES.EXPENSE_CATEGORIES, (t) => {
    t.increments()

    t.integer('user_id').notNullable()
    t.foreign('user_id').references(`${TABLES.USERS}.id`)

    t.string('name').notNullable()

    t.integer('expense_category_group_id').notNullable()
    t.foreign('expense_category_group_id').references(
      `${TABLES.EXPENSE_CATEGORY_GROUPS}.id`
    )

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['user_id', 'expense_category_group_id', 'name'])
  })

  await knex.schema.createTable(TABLES.EXPENSES, (t) => {
    t.increments()

    t.integer('user_id').notNullable()
    t.foreign('user_id').references(`${TABLES.USERS}.id`)

    t.integer('expense_category_id').notNullable()
    t.foreign('expense_category_id').references(
      `${TABLES.EXPENSE_CATEGORIES}.id`
    )

    t.integer('refund_id')
    t.foreign('refund_id').references(`${TABLES.REFUND}.id`)

    t.float('value').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    t.dateTime('spent_at').notNullable()
  })

  await knex.schema.createTable(TABLES.EARNING_CATEGORIES, (t) => {
    t.increments()

    t.integer('user_id').notNullable()
    t.foreign('user_id').references(`${TABLES.USERS}.id`)

    t.string('name').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['user_id', 'name'])
  })

  await knex.schema.createTable(TABLES.EARNINGS, (t) => {
    t.increments()

    t.integer('user_id').notNullable()
    t.foreign('user_id').references(`${TABLES.USERS}.id`)

    t.integer('earning_category_id').notNullable()
    t.foreign('earning_category_id').references(
      `${TABLES.EARNING_CATEGORIES}.id`
    )

    t.float('value').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('earned_at').notNullable()
  })

  await knex.schema.createTable(TABLES.REFUND, (t) => {
    t.increments()

    t.integer('user_id').notNullable()
    t.foreign('user_id').references(`${TABLES.USERS}.id`)

    t.integer('earning_category_id').notNullable()
    t.foreign('earning_category_id').references(
      `${TABLES.EARNING_CATEGORIES}.id`
    )

    t.float('value').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('refunded_at').notNullable()
  })
}

export const down = async (knex: Knex) =>
  Promise.all(
    Object.values(TABLES).map((table) => knex.schema.dropTableIfExists(table))
  )
