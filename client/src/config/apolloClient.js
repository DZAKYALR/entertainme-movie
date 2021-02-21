import { ApolloClient, InMemoryCache } from '@apollo/client';
import favoriteListVar from './cache'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favoriteList: {
            read() {
              return favoriteListVar()
            }
          }
        }
      }
    }
  })
});

export default client