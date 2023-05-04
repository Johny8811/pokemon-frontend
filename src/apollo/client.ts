import { ApolloClient, InMemoryCache } from "@apollo/client";

const GraphQLEndpointUrl = 'http://localhost:4000/graphql'

export const client = new ApolloClient({
    uri: GraphQLEndpointUrl,
    cache: new InMemoryCache(),
});
