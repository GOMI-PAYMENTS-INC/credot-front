import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers'],
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type AbstractBaseEntity = {
  /** 생성시각 */
  createdAt: Scalars['DateTime'];
  /** 생성자 */
  createdUserId: Scalars['Int'];
  /** 삭제여부 */
  deleted: Scalars['Boolean'];
  /** 삭제시각 */
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** 아이디 */
  id: Scalars['ID'];
  /** 수정시각 */
  updatedAt: Scalars['DateTime'];
  /** 수정자 */
  updatedUserId: Scalars['Int'];
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
};

export type ChangePasswordInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 신규 비밀번호 */
  newPassword: Scalars['String'];
  /** 기존 비밀번호 */
  password: Scalars['String'];
};

/** 국가 타입 */
export enum CountryType {
  /** 한국 */
  Kr = 'KR',
  /** 태국 */
  Th = 'TH',
  /** 미국 */
  Us = 'US',
  /** 베트남 */
  Vn = 'VN',
}

export type CreateOneUserInput = {
  /** The record to create */
  user: CreateUserInput;
};

export type CreateUserInput = {
  /** 관리자메모 */
  adminMemo?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 닉네임 */
  nickName?: InputMaybe<Scalars['String']>;
  /** 패스워드 */
  password: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 권한 */
  role?: InputMaybe<Role>;
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime'];
  upper: Scalars['DateTime'];
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int'];
};

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter;
};

export type DeleteOneUserInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type FindAccountInput = {
  /** 전화번호 */
  phone: Scalars['String'];
  /** 인증번호 */
  verifyCode: Scalars['String'];
};

export type FindAccountResponse = {
  __typename?: 'FindAccountResponse';
  /** 계정 정보 ( 휴대폰 번호 1 : 이메일 N 다계정 생성 가능 하므로 ) 복수 */
  accounts: Array<AccountInfoDto>;
};

export type FindPasswordInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 인증번호 */
  verifyCode: Scalars['String'];
};

export type GoogleSignUpInput = {
  /** 소셜토큰 */
  idToken: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 인증번호 */
  verifyCode: Scalars['String'];
};

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  iLike?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  neq?: InputMaybe<Scalars['ID']>;
  notILike?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
  notLike?: InputMaybe<Scalars['ID']>;
};

export type IntFieldComparison = {
  between?: InputMaybe<IntFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  notBetween?: InputMaybe<IntFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntFieldComparisonBetween = {
  lower: Scalars['Int'];
  upper: Scalars['Int'];
};

export type LoginInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 패스워드 */
  password: Scalars['String'];
};

export type LoginPassword = {
  __typename?: 'LoginPassword';
  /** 추가 팝업용 정보 */
  popupInfo?: Maybe<PopupDto>;
  /** 로그인 토큰 */
  token: Scalars['String'];
};

export type LoginToken = {
  __typename?: 'LoginToken';
  /** 로그인 토큰 */
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 비밀번호 변경 */
  changePassword: FindAccountResponse;
  createOneUser: User;
  deleteManyUsers: DeleteManyResponse;
  deleteOneUser: UserDeleteResponse;
  /** google 로그인 */
  googleLogin: LoginToken;
  /** google 로그인 가입 */
  googleSignUp: LoginToken;
  /** 로그인 */
  login: LoginPassword;
  /** naver 로그인 */
  naverLogin: LoginToken;
  /** 휴대폰 인증번호 발송 */
  sendSmsVerificationCode: Scalars['Boolean'];
  /** 유저 임시 비밀번호 발급 */
  sendTemporaryPassword: FindAccountResponse;
  /** 유저 회원가입 */
  signup: LoginToken;
  updateOneUser: User;
};

export type MutationChangePasswordArgs = {
  pwd: ChangePasswordInput;
};

export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};

export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput;
};

export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput;
};

export type MutationGoogleLoginArgs = {
  idToken: Scalars['String'];
};

export type MutationGoogleSignUpArgs = {
  socialSignUpDto: GoogleSignUpInput;
};

export type MutationLoginArgs = {
  login: LoginInput;
};

export type MutationNaverLoginArgs = {
  idToken: Scalars['String'];
};

export type MutationSendSmsVerificationCodeArgs = {
  country: CountryType;
  phone: Scalars['String'];
};

export type MutationSendTemporaryPasswordArgs = {
  country: CountryType;
  user: FindPasswordInput;
};

export type MutationSignupArgs = {
  user: SignUpInput;
};

export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars['Int']>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars['Int']>;
};

export type PopupDto = {
  __typename?: 'PopupDto';
  /** 모달 여부 */
  isModal: Scalars['Boolean'];
  /** 검색 단어 (원문) */
  typeName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** 리포트 생성용 키워드 리스트 전송 */
  compose: ResponseCompose;
  /** 유저 이메일 중복 조회 */
  existsUserEmail: Scalars['Boolean'];
  /** 유저 계정(ID) 찾기 */
  findAccount: FindAccountResponse;
  /** 로그인된 내 정보 */
  me: User;
  /** 키워드 검색 ( 구글 번역 api 사용 ) */
  search: ResponseSearch;
  /** 텍스트 번역 ( 구글 번역 api 사용 ) */
  translate: Scalars['String'];
  user?: Maybe<User>;
  userAggregate: Array<UserAggregateResponse>;
  users: UserConnection;
};

export type QueryComposeArgs = {
  searchInfos: Array<SearchResultDto>;
};

export type QueryExistsUserEmailArgs = {
  email: Scalars['String'];
};

export type QueryFindAccountArgs = {
  country: CountryType;
  user: FindAccountInput;
};

export type QuerySearchArgs = {
  country: CountryType;
  text: Scalars['String'];
  translateType?: InputMaybe<TranslateType>;
};

export type QueryTranslateArgs = {
  country: CountryType;
  keyword: Scalars['String'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUserAggregateArgs = {
  filter?: InputMaybe<UserAggregateFilter>;
};

export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<UserSort>>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type RoleFilterComparison = {
  eq?: InputMaybe<Role>;
  gt?: InputMaybe<Role>;
  gte?: InputMaybe<Role>;
  iLike?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Role>;
  lt?: InputMaybe<Role>;
  lte?: InputMaybe<Role>;
  neq?: InputMaybe<Role>;
  notILike?: InputMaybe<Role>;
  notIn?: InputMaybe<Array<Role>>;
  notLike?: InputMaybe<Role>;
};

export type SignUpInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 닉네임 */
  nickName?: InputMaybe<Scalars['String']>;
  /** 패스워드 */
  password: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 인증번호 */
  verifyCode: Scalars['String'];
};

export enum SocialProvider {
  Google = 'Google',
  Naver = 'Naver',
}

export type SocialProviderFilterComparison = {
  eq?: InputMaybe<SocialProvider>;
  gt?: InputMaybe<SocialProvider>;
  gte?: InputMaybe<SocialProvider>;
  iLike?: InputMaybe<SocialProvider>;
  in?: InputMaybe<Array<SocialProvider>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<SocialProvider>;
  lt?: InputMaybe<SocialProvider>;
  lte?: InputMaybe<SocialProvider>;
  neq?: InputMaybe<SocialProvider>;
  notILike?: InputMaybe<SocialProvider>;
  notIn?: InputMaybe<Array<SocialProvider>>;
  notLike?: InputMaybe<SocialProvider>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST',
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  notILike?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  notLike?: InputMaybe<Scalars['String']>;
};

/** 번역 타입(optional), order(번역순서): 원문->영어->베트남어->한국어 */
export enum TranslateType {
  /** 번역 타입(optional), order(번역순서): 원문->영어->베트남어->한국어 */
  Order = 'ORDER',
}

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateUserInput;
};

export type UpdateUserInput = {
  /** 관리자메모 */
  adminMemo?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name: Scalars['String'];
  /** 닉네임 */
  nickName?: InputMaybe<Scalars['String']>;
  /** 전화번호 */
  phone: Scalars['String'];
  /** 프로필 이미지 */
  profileImage?: InputMaybe<Scalars['String']>;
};

export type User = AbstractBaseEntity & {
  __typename?: 'User';
  /** 관리자메모 */
  adminMemo?: Maybe<Scalars['String']>;
  /** 생성시각 */
  createdAt: Scalars['DateTime'];
  /** 생성자 */
  createdUserId: Scalars['Int'];
  /** 삭제여부 */
  deleted: Scalars['Boolean'];
  /** 삭제시각 */
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 아이디 */
  id: Scalars['ID'];
  /** 소셜로그인 회원가입 여부 */
  isSocialLogin: Scalars['Boolean'];
  /** 가입일 */
  joinedAt?: Maybe<Scalars['DateTime']>;
  /** 이름 */
  name: Scalars['String'];
  /** 닉네임 */
  nickName?: Maybe<Scalars['String']>;
  /** 전화번호 */
  phone?: Maybe<Scalars['String']>;
  /** 프로필 이미지 */
  profileImage?: Maybe<Scalars['String']>;
  /** 권한 */
  role: Role;
  /** 소셜 provider 고유키 */
  socialId?: Maybe<Scalars['String']>;
  /** 소셜로그인 제공업체 */
  socialProvider?: Maybe<SocialProvider>;
  /** 수정시각 */
  updatedAt: Scalars['DateTime'];
  /** 수정자 */
  updatedUserId: Scalars['Int'];
};

export type UserAggregateFilter = {
  adminMemo?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<UserAggregateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  createdUserId?: InputMaybe<IntFieldComparison>;
  deleted?: InputMaybe<UserDeletedFilterComparison>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isSocialLogin?: InputMaybe<BooleanFieldComparison>;
  joinedAt?: InputMaybe<DateFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  nickName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserAggregateFilter>>;
  phone?: InputMaybe<StringFieldComparison>;
  profileImage?: InputMaybe<StringFieldComparison>;
  role?: InputMaybe<RoleFilterComparison>;
  socialId?: InputMaybe<StringFieldComparison>;
  socialProvider?: InputMaybe<SocialProviderFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  updatedUserId?: InputMaybe<IntFieldComparison>;
};

export type UserAggregateGroupBy = {
  __typename?: 'UserAggregateGroupBy';
  adminMemo?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdUserId?: Maybe<Scalars['Int']>;
  deleted?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isSocialLogin?: Maybe<Scalars['Boolean']>;
  joinedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  socialId?: Maybe<Scalars['String']>;
  socialProvider?: Maybe<SocialProvider>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedUserId?: Maybe<Scalars['Int']>;
};

export type UserAggregateResponse = {
  __typename?: 'UserAggregateResponse';
  avg?: Maybe<UserAvgAggregate>;
  count?: Maybe<UserCountAggregate>;
  groupBy?: Maybe<UserAggregateGroupBy>;
  max?: Maybe<UserMaxAggregate>;
  min?: Maybe<UserMinAggregate>;
  sum?: Maybe<UserSumAggregate>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  createdUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updatedUserId?: Maybe<Scalars['Float']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** Array of nodes. */
  nodes: Array<User>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  adminMemo?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  createdUserId?: Maybe<Scalars['Int']>;
  deleted?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  isSocialLogin?: Maybe<Scalars['Int']>;
  joinedAt?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  nickName?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['Int']>;
  profileImage?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['Int']>;
  socialId?: Maybe<Scalars['Int']>;
  socialProvider?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  updatedUserId?: Maybe<Scalars['Int']>;
};

export type UserDeleteFilter = {
  adminMemo?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<UserDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  createdUserId?: InputMaybe<IntFieldComparison>;
  deleted?: InputMaybe<UserDeletedFilterComparison>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isSocialLogin?: InputMaybe<BooleanFieldComparison>;
  joinedAt?: InputMaybe<DateFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  nickName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserDeleteFilter>>;
  phone?: InputMaybe<StringFieldComparison>;
  profileImage?: InputMaybe<StringFieldComparison>;
  role?: InputMaybe<RoleFilterComparison>;
  socialId?: InputMaybe<StringFieldComparison>;
  socialProvider?: InputMaybe<SocialProviderFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  updatedUserId?: InputMaybe<IntFieldComparison>;
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  /** 관리자메모 */
  adminMemo?: Maybe<Scalars['String']>;
  /** 생성시각 */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** 생성자 */
  createdUserId?: Maybe<Scalars['Int']>;
  /** 삭제여부 */
  deleted?: Maybe<Scalars['Boolean']>;
  /** 삭제시각 */
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** 이메일 */
  email?: Maybe<Scalars['String']>;
  /** 아이디 */
  id?: Maybe<Scalars['ID']>;
  /** 소셜로그인 회원가입 여부 */
  isSocialLogin?: Maybe<Scalars['Boolean']>;
  /** 가입일 */
  joinedAt?: Maybe<Scalars['DateTime']>;
  /** 이름 */
  name?: Maybe<Scalars['String']>;
  /** 닉네임 */
  nickName?: Maybe<Scalars['String']>;
  /** 전화번호 */
  phone?: Maybe<Scalars['String']>;
  /** 프로필 이미지 */
  profileImage?: Maybe<Scalars['String']>;
  /** 권한 */
  role?: Maybe<Role>;
  /** 소셜 provider 고유키 */
  socialId?: Maybe<Scalars['String']>;
  /** 소셜로그인 제공업체 */
  socialProvider?: Maybe<SocialProvider>;
  /** 수정시각 */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** 수정자 */
  updatedUserId?: Maybe<Scalars['Int']>;
};

export type UserDeletedFilterComparison = {
  in?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type UserFilter = {
  adminMemo?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<UserFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  createdUserId?: InputMaybe<IntFieldComparison>;
  deleted?: InputMaybe<UserDeletedFilterComparison>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isSocialLogin?: InputMaybe<BooleanFieldComparison>;
  joinedAt?: InputMaybe<DateFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  nickName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserFilter>>;
  phone?: InputMaybe<StringFieldComparison>;
  profileImage?: InputMaybe<StringFieldComparison>;
  role?: InputMaybe<RoleFilterComparison>;
  socialId?: InputMaybe<StringFieldComparison>;
  socialProvider?: InputMaybe<SocialProviderFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  updatedUserId?: InputMaybe<IntFieldComparison>;
};

export type UserInput = {
  /** 관리자메모 */
  adminMemo?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 소셜로그인 회원가입 여부 */
  isSocialLogin: Scalars['Boolean'];
  /** 가입일 */
  joinedAt?: InputMaybe<Scalars['DateTime']>;
  /** 이름 */
  name: Scalars['String'];
  /** 닉네임 */
  nickName?: InputMaybe<Scalars['String']>;
  /** 전화번호 */
  phone?: InputMaybe<Scalars['String']>;
  /** 프로필 이미지 */
  profileImage?: InputMaybe<Scalars['String']>;
  /** 권한 */
  role?: InputMaybe<Role>;
  /** 소셜 provider 고유키 */
  socialId?: InputMaybe<Scalars['String']>;
  /** 소셜로그인 제공업체 */
  socialProvider?: InputMaybe<SocialProvider>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  adminMemo?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdUserId?: Maybe<Scalars['Int']>;
  deleted?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  joinedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  socialId?: Maybe<Scalars['String']>;
  socialProvider?: Maybe<SocialProvider>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedUserId?: Maybe<Scalars['Int']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  adminMemo?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdUserId?: Maybe<Scalars['Int']>;
  deleted?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  joinedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  socialId?: Maybe<Scalars['String']>;
  socialProvider?: Maybe<SocialProvider>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedUserId?: Maybe<Scalars['Int']>;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum UserSortFields {
  AdminMemo = 'adminMemo',
  CreatedAt = 'createdAt',
  CreatedUserId = 'createdUserId',
  Deleted = 'deleted',
  Email = 'email',
  Id = 'id',
  IsSocialLogin = 'isSocialLogin',
  JoinedAt = 'joinedAt',
  Name = 'name',
  NickName = 'nickName',
  Phone = 'phone',
  ProfileImage = 'profileImage',
  Role = 'role',
  SocialId = 'socialId',
  SocialProvider = 'socialProvider',
  UpdatedAt = 'updatedAt',
  UpdatedUserId = 'updatedUserId',
}

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  createdUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updatedUserId?: Maybe<Scalars['Float']>;
};

export type AccountInfoDto = {
  __typename?: 'accountInfoDto';
  /** 이메일 (아이디) */
  email: Scalars['String'];
  /** 소셜 로그인 여부 */
  isSocialLogin: Scalars['Boolean'];
  /** 소셜 로그인 프로바이더 */
  socialProvider?: Maybe<SocialProvider>;
};

export type ComposeParamDto = {
  __typename?: 'composeParamDto';
  /** 30일간의 검색량 */
  count: Scalars['Float'];
  /** 영어 번역 */
  en: Scalars['String'];
  /** 한국어 번역 */
  ko: Scalars['String'];
  /** Quality Score, 10점 만점 */
  relevance: Scalars['Float'];
  /** 검색 단어 (원문) */
  text: Scalars['String'];
  /** 검색한 이미지 주소 최대 3개 */
  thumbnailLink: Array<Scalars['String']>;
  /** 선택된 국가의 언어로 번역 */
  translated: Scalars['String'];
  /** uuid */
  uuid: Scalars['String'];
};

export type ResponseCompose = {
  __typename?: 'responseCompose';
  /** 키워드 정보 리스트 */
  keywordInfos: Array<ComposeParamDto>;
  /** 전송 결과 */
  statusCode: Scalars['Float'];
};

export type ResponseSearch = {
  __typename?: 'responseSearch';
  /** 메인 검색 결과 */
  main: SearchDto;
  /** 연관 검색 결과 */
  relations: Array<SearchDto>;
};

export type SearchDto = {
  __typename?: 'searchDto';
  /** 30일간의 검색량 */
  count?: Maybe<Scalars['Float']>;
  /** 영어 번역 */
  en: Scalars['String'];
  /** 식별자 */
  id: Scalars['Float'];
  /** 한국어 번역 */
  ko: Scalars['String'];
  /** Quality Score, 10점 만점 */
  relevance: Scalars['Float'];
  /** 검색 단어 (원문) */
  text: Scalars['String'];
  /** 검색한 이미지 주소 최대 3개 */
  thumbnailLink: Array<Scalars['String']>;
  /** 선택된 국가의 언어로 번역 */
  translated: Scalars['String'];
};

export type SearchResultDto = {
  /** 30일간의 검색량 */
  count: Scalars['Float'];
  /** 영어 번역 */
  en: Scalars['String'];
  /** 한국어 번역 */
  ko: Scalars['String'];
  /** Quality Score, 10점 만점 */
  relevance: Scalars['Float'];
  /** 검색 단어 (원문) */
  text: Scalars['String'];
  /** 검색한 이미지 주소 최대 3개 */
  thumbnailLink: Array<Scalars['String']>;
  /** 선택된 국가의 언어로 번역 */
  translated: Scalars['String'];
};

export type SendSmsVerificationCodeMutationVariables = Exact<{
  country: CountryType;
  phone: Scalars['String'];
}>;

export type SendSmsVerificationCodeMutation = {
  __typename?: 'Mutation';
  sendSmsVerificationCode: boolean;
};

export type SignupMutationVariables = Exact<{
  user: SignUpInput;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: { __typename?: 'LoginToken'; token: string };
};

export type LoginMutationVariables = Exact<{
  login: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginPassword'; token: string };
};

export type GoogleLoginMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;

export type GoogleLoginMutation = {
  __typename?: 'Mutation';
  googleLogin: { __typename?: 'LoginToken'; token: string };
};

export type GoogleSignupMutationVariables = Exact<{
  socialSignUpDto: GoogleSignUpInput;
}>;

export type GoogleSignupMutation = {
  __typename?: 'Mutation';
  googleSignUp: { __typename?: 'LoginToken'; token: string };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    email: string;
    role: Role;
    name: string;
    nickName?: string | null;
    phone?: string | null;
    profileImage?: string | null;
    joinedAt?: Date | null;
    isSocialLogin: boolean;
    socialProvider?: SocialProvider | null;
  };
};

export type ExistsUserEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;

export type ExistsUserEmailQuery = { __typename?: 'Query'; existsUserEmail: boolean };

export type FindAccountQueryVariables = Exact<{
  user: FindAccountInput;
  country: CountryType;
}>;

export type FindAccountQuery = {
  __typename?: 'Query';
  findAccount: {
    __typename?: 'FindAccountResponse';
    accounts: Array<{
      __typename?: 'accountInfoDto';
      email: string;
      isSocialLogin: boolean;
      socialProvider?: SocialProvider | null;
    }>;
  };
};

export type SearchQueryVariables = Exact<{
  country: CountryType;
  translateType?: InputMaybe<TranslateType>;
  text: Scalars['String'];
}>;

export type SearchQuery = {
  __typename?: 'Query';
  search: {
    __typename?: 'responseSearch';
    main: {
      __typename?: 'searchDto';
      id: number;
      text: string;
      ko: string;
      en: string;
      translated: string;
      count?: number | null;
      relevance: number;
      thumbnailLink: Array<string>;
    };
    relations: Array<{
      __typename?: 'searchDto';
      id: number;
      text: string;
      ko: string;
      en: string;
      translated: string;
      count?: number | null;
      relevance: number;
      thumbnailLink: Array<string>;
    }>;
  };
};

export const SendSmsVerificationCodeDocument = `
    mutation SendSmsVerificationCode($country: CountryType!, $phone: String!) {
  sendSmsVerificationCode(country: $country, phone: $phone)
}
    `;
export const useSendSmsVerificationCodeMutation = <
  TError extends unknown,
  TContext extends unknown,
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SendSmsVerificationCodeMutation,
    TError,
    SendSmsVerificationCodeMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    SendSmsVerificationCodeMutation,
    TError,
    SendSmsVerificationCodeMutationVariables,
    TContext
  >(
    ['SendSmsVerificationCode'],
    (variables?: SendSmsVerificationCodeMutationVariables) =>
      fetcher<SendSmsVerificationCodeMutation, SendSmsVerificationCodeMutationVariables>(
        client,
        SendSmsVerificationCodeDocument,
        variables,
        headers,
      )(),
    options,
  );
export const SignupDocument = `
    mutation Signup($user: SignUpInput!) {
  signup(user: $user) {
    token
  }
}
    `;
export const useSignupMutation = <TError extends unknown, TContext extends unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<SignupMutation, TError, SignupMutationVariables, TContext>,
  headers?: RequestInit['headers'],
) =>
  useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
    ['Signup'],
    (variables?: SignupMutationVariables) =>
      fetcher<SignupMutation, SignupMutationVariables>(
        client,
        SignupDocument,
        variables,
        headers,
      )(),
    options,
  );
export const LoginDocument = `
    mutation Login($login: LoginInput!) {
  login(login: $login) {
    token
  }
}
    `;
export const useLoginMutation = <TError extends unknown, TContext extends unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
  headers?: RequestInit['headers'],
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ['Login'],
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        client,
        LoginDocument,
        variables,
        headers,
      )(),
    options,
  );
export const GoogleLoginDocument = `
    mutation GoogleLogin($idToken: String!) {
  googleLogin(idToken: $idToken) {
    token
  }
}
    `;
export const useGoogleLoginMutation = <TError extends unknown, TContext extends unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    GoogleLoginMutation,
    TError,
    GoogleLoginMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<GoogleLoginMutation, TError, GoogleLoginMutationVariables, TContext>(
    ['GoogleLogin'],
    (variables?: GoogleLoginMutationVariables) =>
      fetcher<GoogleLoginMutation, GoogleLoginMutationVariables>(
        client,
        GoogleLoginDocument,
        variables,
        headers,
      )(),
    options,
  );
export const GoogleSignupDocument = `
    mutation GoogleSignup($socialSignUpDto: GoogleSignUpInput!) {
  googleSignUp(socialSignUpDto: $socialSignUpDto) {
    token
  }
}
    `;
export const useGoogleSignupMutation = <TError extends unknown, TContext extends unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    GoogleSignupMutation,
    TError,
    GoogleSignupMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<GoogleSignupMutation, TError, GoogleSignupMutationVariables, TContext>(
    ['GoogleSignup'],
    (variables?: GoogleSignupMutationVariables) =>
      fetcher<GoogleSignupMutation, GoogleSignupMutationVariables>(
        client,
        GoogleSignupDocument,
        variables,
        headers,
      )(),
    options,
  );
export const MeDocument = `
    query Me {
  me {
    email
    role
    name
    nickName
    phone
    profileImage
    joinedAt
    isSocialLogin
    socialProvider
  }
}
    `;
export const useMeQuery = <TData extends MeQuery, TError extends unknown>(
  client: GraphQLClient,
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<MeQuery, TError, TData>(
    variables === undefined ? ['Me'] : ['Me', variables],
    fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
    options,
  );
export const ExistsUserEmailDocument = `
    query ExistsUserEmail($email: String!) {
  existsUserEmail(email: $email)
}
    `;
export const useExistsUserEmailQuery = <
  TData extends ExistsUserEmailQuery,
  TError extends unknown,
>(
  client: GraphQLClient,
  variables: ExistsUserEmailQueryVariables,
  options?: UseQueryOptions<ExistsUserEmailQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<ExistsUserEmailQuery, TError, TData>(
    ['ExistsUserEmail', variables],
    fetcher<ExistsUserEmailQuery, ExistsUserEmailQueryVariables>(
      client,
      ExistsUserEmailDocument,
      variables,
      headers,
    ),
    options,
  );
export const FindAccountDocument = `
    query FindAccount($user: FindAccountInput!, $country: CountryType!) {
  findAccount(user: $user, country: $country) {
    accounts {
      email
      isSocialLogin
      socialProvider
    }
  }
}
    `;
export const useFindAccountQuery = <
  TData extends FindAccountQuery,
  TError extends unknown,
>(
  client: GraphQLClient,
  variables: FindAccountQueryVariables,
  options?: UseQueryOptions<FindAccountQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<FindAccountQuery, TError, TData>(
    ['FindAccount', variables],
    fetcher<FindAccountQuery, FindAccountQueryVariables>(
      client,
      FindAccountDocument,
      variables,
      headers,
    ),
    options,
  );
export const SearchDocument = `
    query Search($country: CountryType!, $translateType: TranslateType, $text: String!) {
  search(country: $country, translateType: $translateType, text: $text) {
    main {
      id
      text
      ko
      en
      translated
      count
      relevance
      thumbnailLink
    }
    relations {
      id
      text
      ko
      en
      translated
      count
      relevance
      thumbnailLink
    }
  }
}
    `;
export const useSearchQuery = <TData extends SearchQuery, TError extends unknown>(
  client: GraphQLClient,
  variables: SearchQueryVariables,
  options?: UseQueryOptions<SearchQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<SearchQuery, TError, TData>(
    ['Search', variables],
    fetcher<SearchQuery, SearchQueryVariables>(
      client,
      SearchDocument,
      variables,
      headers,
    ),
    options,
  );
