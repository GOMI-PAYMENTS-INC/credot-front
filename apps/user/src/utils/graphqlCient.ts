import { GraphQLClient } from 'graphql-request';

import { GlobalEnv } from '@/api/config';

export const graphQLClient = new GraphQLClient(`${GlobalEnv.graphqlUrl}`);
