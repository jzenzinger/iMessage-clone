import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Later will be here WebSocket link for realtime chat data

const httpLink = new HttpLink({
    // Key difference between REST API, Graphql API
    // Everything is passing by one API (graphql), Rest API have multiple things
    uri: 'http://localhost:4000/graphql',
    credentials: "include"
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})