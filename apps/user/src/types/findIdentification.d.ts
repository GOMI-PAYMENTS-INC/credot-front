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
