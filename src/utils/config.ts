export const GlobalEnv = {
  tokenKey: import.meta.env.VITE_TOKEN_KEY || 'GOMI_KEYWORD_DEV_TOKEN',
  serverUrl:
    import.meta.env.VITE_SERVER_URL ||
    'https://kr-core-gomi-keyword-api-dev.gomicorp.com/graphql',
};
