import { GraphQLClient } from 'graphql-request';

import { GlobalEnv } from '@/utils/config';

export const graphQLClient = new GraphQLClient(`${GlobalEnv.serverUrl}/graphql`);
