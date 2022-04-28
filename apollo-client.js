import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { uri } from './utils/uri';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${uri}`,
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
