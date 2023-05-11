import { ApolloClient, InMemoryCache } from "@apollo/client";

const GraphQLEndpointUrl = 'http://localhost:4000/graphql'

export const client = new ApolloClient({
  uri: GraphQLEndpointUrl,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: ['query', ['filter', 'search']],
            merge: (existing = { edges: [] }, incoming) => ({
              edges: [
                ...existing.edges,
                ...incoming.edges
              ],
            }),
          }
        }
      }
    }
  }),
});
