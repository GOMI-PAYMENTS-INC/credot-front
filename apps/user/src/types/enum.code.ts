export enum SEND_TEMPORARY_PASSWORD_RESULT {
  MEMBER = 200,
  // TODO : 오류 코드 find-id와 통일 시켜야 합니다. - 소진
  STRANGER = 1004,
  NOTMATCHCODE = 1001,
}

export enum FIND_ACCOUNT_RESULT {
  MEMBER = 200,
  STRANGER = 1002,
  NOTMATCHCODE = 1001,
}

export enum STATUS_CODE {
  DEFAULT = '',
  SUCCESS = '0000',

  USER_NOT_FOUND = '1000',
  SMS_INVALID_CODE = '1001',
  INVALID_PHONE = '1002"',
  INVALID_PASSWORD = '1003',
  USER_NOT_EXIST = '1004',
  NOT_VERIFY_CONFIRM = '1005',
  USER_ALREADY_EXISTS = '1006',
  INVALID_USER = '1000',
  WRONG_PHONE = '1007',

  NOT_EXIST_SEARCH_KEYWORD = '1101',

  INVALID_PATH = '9400',
  INVALID_PARAMETERS = '9400',
  INVALID_TOKEN = '9401',
  SMS_SEND_FAILED = '9400',
  INVALID_GRAPHQL_QUERY = '9400',
  IS_SHOPEE_SYSTEM_FAILED = '9500',
  ERROR = '9999',
}

export enum TITLE {
  REPORT = 'Report',
  MARTKET_SIZE = 'MartketSize',
  KEYWORD_INFO = 'KeywordInfo',
  RECOMMEND_KEYWORD = 'RecommendKeyword',
  SALE_PRICE = 'SalePrice',
}

export enum TAG_SENTIMENT_STATUS {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  ATTENTIVE = 'attentive',
  INFORMATIVE = 'informative',
  NEUTRAL = 'neutral',
}

export enum BATCH_STATUS {
  WAIT = 'WAIT', //대기
  RUN = 'RUN', //실행중
  DONE = 'DONE', //종료
  REPLICATE = 'REPLICATE', //재실행
  NONE = 'NONE',
}
