export const GlobalEnv = {
  viteGoogleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  tokenKey: import.meta.env.VITE_TOKEN_KEY || 'GOMI_KEYWORD_DEV_TOKEN',
  baseUrl: import.meta.env.BASE_SERVER_URL || 'http://kr-core-gomi-insight-api-dev.ap-southeast-1.elasticbeanstalk.com:8080',
  serverUrl:
    import.meta.env.VITE_SERVER_URL ||
    'http://kr-core-gomi-insight-api-dev.ap-southeast-1.elasticbeanstalk.com/graphql',
};
