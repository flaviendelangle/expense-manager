import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

export const buildApolloClient = () => {
  const credentials =
    process.env.NODE_ENV === 'production' ? 'same-origin' : 'include'

  return new ApolloClient({
    link: ApolloLink.from([
      new HttpLink({
        credentials,
        uri: 'http://localhost:3001/graphql',
      }),
    ]),
    cache: new InMemoryCache(),
  })
}
