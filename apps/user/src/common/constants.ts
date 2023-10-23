export const PATH = {
  APPLY: '/apply',
  LANDING: '/',
  SEARCH_PRODUCTS: '/keyword',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_UP_WITH_GOOGLE: '/signup/social',
  FIND_PASSWORD: '/find/password',
  FIND_ID: '/find/id',
  REAPPLY_PASSWORD: '/signin/password',
  REPORT_LIST: '/report',
  REPORT_DETAIL: '/report/:id',
  REPORT_DETAIL_BY_SHARE: '/share/:id',
  SUBSCRIBE: '/subscribe',
  UPGRADE_PLAN: '/subscribe/upgrade',
  DOWN_GRADE: '/subscribe/downgrade',
  UNSUBSCRIPTION: '/subscribe/unsubscription',
  RESULT_OF_PAY_REQUEST: '/subscribe/:result',
} as const;
