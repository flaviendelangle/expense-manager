import * as Knex from 'knex'

const TABLES = {
  EXPANSE_CATEGORIES: 'expanse_categories',
  EXPANSES: 'expanses',
}

export const up = async (knex: Knex) => {
  await knex.schema.createTable(TABLES.EXPANSE_CATEGORIES, (t) => {
    t.increments()

    t.string('name').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

    t.unique(['name'])
  })

  await knex.schema.createTable(TABLES.EXPANSES, (t) => {
    t.increments()

    t.integer('category_id')
    t.foreign('category_id').references(`${TABLES.EXPANSE_CATEGORIES}.id`)

    t.float('value').notNullable()

    t.string('description')

    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

export const down = async (knex: Knex) =>
  Promise.all(
    Object.values(TABLES).map((table) => knex.schema.dropTableIfExists(table))
  )
