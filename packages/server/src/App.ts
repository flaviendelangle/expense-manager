import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import { Server } from 'http'
import jsonwebtoken from 'jsonwebtoken'
import Knex from 'knex'
import Koa, { Context } from 'koa'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import { Model } from 'objection'

import knexFile from '../knexfile'

import { config } from './config'
import { RequestContext } from './globalTypes'
import { schema } from './middlewares/graphql'
import { DataLoaderService } from './utils/DataLoaderService'

const HTTP_PORT = config.get('port')
const JWT_SECRET = config.get('jwtSecret')

export class App {
  private readonly koa: Koa
  private readonly apollo: ApolloServer
  private server: Server

  private corsOptions: cors.Options = {
    origin: (ctx) =>
      new RegExp('http://localhost:.*').test(ctx.header.origin)
        ? ctx.header.origin
        : '',
    credentials: true,
  }

  constructor() {
    this.apollo = new ApolloServer({
      schema,
      tracing: config.get('apollo.tracing'),
      debug: config.get('apollo.debug'),
      introspection: true,
      playground: {
        settings: {
          'editor.cursorShape': 'line',
          'request.credentials': 'same-origin',
        },
        endpoint: '/graphql',
      },
      context: ({ ctx }: { ctx: Context }) => {
        const c: RequestContext = {
          setJWT: async (user) => {
            const token = await jsonwebtoken.sign(
              {
                id: user.id,
                isAdmin: user.isAdmin,
              },
              JWT_SECRET,
              { expiresIn: '7d' }
            )

            ctx.cookies.set('token', token, { httpOnly: true })
          },
          removeJWT: async () => ctx.cookies.set('token', undefined),
          user: ctx.state.user ?? null,
        }

        c.loaders = Object.freeze(new DataLoaderService(c))

        return c
      },
    })

    this.koa = new Koa()

    this.koa.use(cors(this.corsOptions))

    this.koa.use(bodyParser())

    this.koa.use(
      jwt({
        secret: JWT_SECRET,
        passthrough: true,
        getToken: (req) => req.cookies.get('token'),
      })
    )

    const knex = Knex(knexFile)

    Model.knex(knex)

    this.apollo.applyMiddleware({ app: this.koa })

    this.server = this.koa.listen({ port: HTTP_PORT }, () => {
      // eslint-disable-next-line
      console.log('GraphQL Server ready')
    })
  }
}
