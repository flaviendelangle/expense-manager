import { ClassType, Field, InputType, Int, ObjectType } from 'type-graphql'

interface Paginated<TItem> {
  total: number
  nodes: TItem[]
}

// Necessary to export the PaginatedClass function
abstract class BasePaginatedClass<TItem> implements Paginated<TItem> {
  nodes: TItem[]
  total: number
}

function PaginatedClass<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class CustomPaginatedClass extends BasePaginatedClass<TItem> {
    @Field(() => [TItemClass])
    nodes: TItem[]

    @Field(() => Int)
    total: number
  }
  return CustomPaginatedClass as ClassType<BasePaginatedClass<TItem>>
}

@InputType()
class OrderOptions {
  @Field({ nullable: true })
  field: string
  @Field({ nullable: true })
  direction: 'asc' | 'desc'
}

@InputType()
class PaginationOptions {
  @Field((_) => Int)
  limit: number
  @Field((_) => Int)
  offset: number
}

export { PaginationOptions, OrderOptions, Paginated, PaginatedClass }
