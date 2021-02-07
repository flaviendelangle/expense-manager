import { buildSchemaSync } from 'type-graphql'

export const schema = buildSchemaSync({
  resolvers: [`${__dirname}/../resolvers/**/*.resolver.ts`],
  emitSchemaFile: `${__dirname}/../graphql/schema.graphql`,
})
