export enum SendTemporaryPasswordResult {
  MEMBER = 200,
  // TODO : 오류 코드 find-id와 통일 시켜야 합니다. - 소진
  STRANGER = 1004,
  NOTMATCHCODE = 1001,
}

export enum FindAccountResult {
  MEMBER = 200,
  STRANGER = 1002,
  NOTMATCHCODE = 1001,
}

export enum STATUS_CODE {
  DEFAULT = '',
  SUCCESS = '0000',
  //     정의된 오류 1xxx 메시지
  USER_NOT_FOUND = '1000',
  SMS_INVALID_CODE = '1001',
  INVALID_PHONE = '1002"',
  INVALID_PASSWORD = '1003',
  USER_NOT_EXIST = '1004',
  NOT_VERIFY_CONFIRM = '1005',
  USER_ALREADY_EXISTS = '1006',
  INVALID_USER = '1000',
  WRONG_PHONE = '1007',
  //    검색 정보 오류 11xx 메시지
  NOT_EXIST_SEARCH_KEYWORD = '1101',
  //    공통 요청 및 시스템 오류 9xxx : xxx = Http 오류 상태코드 ( 9999 제외 )
  INVALID_PATH = '9400',
  INVALID_PARAMETERS = '9400',
  INVALID_TOKEN = '9401',
  SMS_SEND_FAILED = '9400',
  INVALID_GRAPHQL_QUERY = '9400',
  IS_SHOPEE_SYSTEM_FAILED = '9500',
  ERROR = '9999',
}
