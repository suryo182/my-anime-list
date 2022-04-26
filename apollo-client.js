import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://graphql.anilist.co',
    fetchOptions: {
      method: 'POST',
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
});

export default client;
