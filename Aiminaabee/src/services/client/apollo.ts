import { ApolloClient, split, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';

import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getTokenSync, getToken } from '../../utils/getToken';
import { cache } from './cache';

const GRAPHQL_URI = Config.LOCAL_SERVER_URL;
const WS_URI = Config.LOCAL_SERVER_WS;

getToken();

//httpLink
const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  credentials: 'include',
});

//webSocketLink
const wsClient = new SubscriptionClient(WS_URI, {
  lazy: true,
  reconnect: true,
  connectionParams: async () => {
    const token = await AsyncStorage.getItem('@token');
    return {
      authToken: token ? `Bearer ${token}` : null,
    };
  },
});

const wsLink = new WebSocketLink(wsClient);

//split based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

//authLink
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

//retryLink
const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const isMutation =
      operation &&
      operation.query &&
      operation.query.definitions &&
      Array.isArray(operation.query.definitions) &&
      operation.query.definitions.some(
        (def) => def.kind === 'OperationDefinition' && def.operation === 'mutation',
      );
    if (isMutation) {
      return !!error && count < 25;
    }
    return !!error && count < 6;
  },
});

//errorLink
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  cache,
  link: from([errorLink, authLink, retryLink, splitLink]),
  assumeImmutableResults: true,
  connectToDevTools: Config.ENVIRONMENT !== 'production',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'none',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});
