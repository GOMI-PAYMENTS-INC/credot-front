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

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers'],
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
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

export type ChangePasswordInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 신규 비밀번호 */
  newPassword: Scalars['String'];
};

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

export type FindAccountInput = {
  /** 전화번호 */
  phone: Scalars['String'];
  /** 인증번호 서명 */
  verifyCodeSign: Scalars['String'];
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
  /** 인증번호 서명 */
  verifyCodeSign: Scalars['String'];
};

export type GoogleSignUpInput = {
  /** 소셜토큰 */
  idToken: Scalars['String'];
  /** 전화번호 */
  phone: Scalars['String'];
  /** 인증번호 서명 */
  verifyCodeSign: Scalars['String'];
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
  /** google 로그인 */
  googleLogin: LoginToken;
  /** google 로그인 가입 */
  googleSignUp: LoginToken;
  /** 로그인 */
  login: LoginPassword;
  /** 휴대폰 인증번호 발송 */
  sendSmsVerificationCode: Scalars['Boolean'];
  /** 유저 임시 비밀번호 발급 */
  sendTemporaryPassword: FindAccountResponse;
  /** 유저 회원가입 */
  signup: LoginToken;
};

export type MutationChangePasswordArgs = {
  pwd: ChangePasswordInput;
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

export type PopupDto = {
  __typename?: 'PopupDto';
  /** 모달 여부 */
  isModal: Scalars['Boolean'];
  /** 검색 단어 (원문) */
  typeName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  errorTest?: Maybe<Scalars['String']>;
  /** 유저 이메일 중복 조회 */
  existsUserEmail: Scalars['Boolean'];
  /** 유저 계정(ID) 찾기 */
  findAccount: FindAccountResponse;
  /** test query */
  helloWorld: Scalars['String'];
  /** 로그인된 내 정보 */
  me: User;
  /** 키워드 검색 */
  search: ResponseSearch;
  /** 인증번호 확인 */
  smsVerifyCodeConfirm: VerifyCodeSign;
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
};

export type QuerySmsVerifyCodeConfirmArgs = {
  phone: Scalars['String'];
  verifyCode: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

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
  /** 인증코드 서명 */
  verifyCodeSign: Scalars['String'];
};

export enum SocialProvider {
  Google = 'GOOGLE',
  Naver = 'NAVER',
  None = 'NONE',
}

export type User = {
  __typename?: 'User';
  /** 생성시각 */
  createdAt: Scalars['String'];
  /** 삭제여부 */
  deleted: Scalars['Boolean'];
  /** 삭제시각 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 아이디 */
  id: Scalars['ID'];
  /** 소셜로그인 회원가입 여부 */
  isSocialLogin: Scalars['Boolean'];
  /** 가입일 */
  joinedAt?: Maybe<Scalars['String']>;
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
  socialProvider?: Maybe<Scalars['String']>;
  /** 수정시각 */
  updatedAt: Scalars['String'];
};

export type UserEntity = AbstractBaseEntity & {
  __typename?: 'UserEntity';
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

export type VerifyCodeSign = {
  __typename?: 'VerifyCodeSign';
  /** 인증코드 서명값, (인증코드 확인시 발급 된 키) */
  signature: Scalars['String'];
};

export type AccountInfoDto = {
  __typename?: 'accountInfoDto';
  /** 이메일 (아이디) */
  email: Scalars['String'];
  /** 소셜 로그인 여부 */
  isSocialLogin: Scalars['Boolean'];
  /** 소셜 로그인 프로바이더 */
  socialProvider?: Maybe<Scalars['String']>;
};

export type ResponseSearch = {
  __typename?: 'responseSearch';
  /** 메인 검색 결과 */
  main: SearchDto;
  /** 연관 검색 결과 */
  relations: Array<SearchDto>;
  /** 리포트 생성 호출 식별자 */
  reportInvokeId: Scalars['String'];
};

export type SearchDto = {
  __typename?: 'searchDto';
  /** 30일간의 검색량 */
  count?: Maybe<Scalars['Float']>;
  /** 식별자 */
  id: Scalars['Float'];
  /** Quality Score, 10점 만점 */
  relevance?: Maybe<Scalars['Float']>;
  /** 검색 단어 (원문) */
  text: Scalars['String'];
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
  login: {
    __typename?: 'LoginPassword';
    token: string;
    popupInfo?: { __typename?: 'PopupDto'; typeName: string; isModal: boolean } | null;
  };
};

export type GoogleLoginMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;

export type GoogleLoginMutation = {
  __typename?: 'Mutation';
  googleLogin: { __typename?: 'LoginToken'; token: string };
};

export type ChangePasswordMutationVariables = Exact<{
  pwd: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: {
    __typename?: 'FindAccountResponse';
    accounts: Array<{
      __typename?: 'accountInfoDto';
      email: string;
      isSocialLogin: boolean;
      socialProvider?: string | null;
    }>;
  };
};

export type SendTemporaryPasswordMutationVariables = Exact<{
  user: FindPasswordInput;
  country: CountryType;
}>;

export type SendTemporaryPasswordMutation = {
  __typename?: 'Mutation';
  sendTemporaryPassword: {
    __typename?: 'FindAccountResponse';
    accounts: Array<{
      __typename?: 'accountInfoDto';
      email: string;
      isSocialLogin: boolean;
      socialProvider?: string | null;
    }>;
  };
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
    joinedAt?: string | null;
    isSocialLogin: boolean;
    socialProvider?: string | null;
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
      socialProvider?: string | null;
    }>;
  };
};

export type SmsVerifyCodeConfirmQueryVariables = Exact<{
  phone: Scalars['String'];
  verifyCode: Scalars['String'];
}>;

export type SmsVerifyCodeConfirmQuery = {
  __typename?: 'Query';
  smsVerifyCodeConfirm: { __typename?: 'VerifyCodeSign'; signature: string };
};

export type SearchQueryVariables = Exact<{
  country: CountryType;
  text: Scalars['String'];
}>;

export type SearchQuery = {
  __typename?: 'Query';
  search: {
    __typename?: 'responseSearch';
    reportInvokeId: string;
    main: {
      __typename?: 'searchDto';
      id: number;
      text: string;
      count?: number | null;
      relevance?: number | null;
    };
    relations: Array<{
      __typename?: 'searchDto';
      id: number;
      text: string;
      count?: number | null;
      relevance?: number | null;
    }>;
  };
};

export const SendSmsVerificationCodeDocument = `
    mutation SendSmsVerificationCode($country: CountryType!, $phone: String!) {
  sendSmsVerificationCode(country: $country, phone: $phone)
}
    `;
export const useSendSmsVerificationCodeMutation = <
  TError extends {
    response: {
      errors: [
        {
          message: string;
          locations: Array<{ line: number; column: number }>;
          path: [string];
          extensions: {
            code: number;
            status: 'UNAUTHORIZED' | 'BAD_REQUEST';
            classification: 'Exception';
          };
        },
      ];
      data: null;
    };
  },
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
    popupInfo {
      typeName
      isModal
    }
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
export const ChangePasswordDocument = `
    mutation ChangePassword($pwd: ChangePasswordInput!) {
  changePassword(pwd: $pwd) {
    accounts {
      email
      isSocialLogin
      socialProvider
    }
  }
}
    `;
export const useChangePasswordMutation = <
  TError extends unknown,
  TContext extends unknown,
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ChangePasswordMutation,
    TError,
    ChangePasswordMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
    ['ChangePassword'],
    (variables?: ChangePasswordMutationVariables) =>
      fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(
        client,
        ChangePasswordDocument,
        variables,
        headers,
      )(),
    options,
  );
export const SendTemporaryPasswordDocument = `
    mutation SendTemporaryPassword($user: FindPasswordInput!, $country: CountryType!) {
  sendTemporaryPassword(user: $user, country: $country) {
    accounts {
      email
      isSocialLogin
      socialProvider
    }
  }
}
    `;
export const useSendTemporaryPasswordMutation = <
  TError extends {
    response: {
      errors: [
        {
          message: string;
          locations: Array<{ line: number; column: number }>;
          path: [string];
          extensions: {
            code: number;
            status: 'UNAUTHORIZED' | 'BAD_REQUEST';
            classification: 'Exception';
          };
        },
      ];
      data: null;
    };
  },
  TContext extends unknown,
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SendTemporaryPasswordMutation,
    TError,
    SendTemporaryPasswordMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    SendTemporaryPasswordMutation,
    TError,
    SendTemporaryPasswordMutationVariables,
    TContext
  >(
    ['SendTemporaryPassword'],
    (variables?: SendTemporaryPasswordMutationVariables) =>
      fetcher<SendTemporaryPasswordMutation, SendTemporaryPasswordMutationVariables>(
        client,
        SendTemporaryPasswordDocument,
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
export const SmsVerifyCodeConfirmDocument = `
    query SmsVerifyCodeConfirm($phone: String!, $verifyCode: String!) {
  smsVerifyCodeConfirm(phone: $phone, verifyCode: $verifyCode) {
    signature
  }
}
    `;
export const useSmsVerifyCodeConfirmQuery = <
  TData extends SmsVerifyCodeConfirmQuery,
  TError extends {
    response: {
      errors: [
        {
          message: string;
          locations: Array<{ line: number; column: number }>;
          path: [string];
          extensions: {
            code: string;
            status: 'UNAUTHORIZED' | 'BAD_REQUEST';
            classification: 'Exception';
          };
        },
      ];
      data: null;
    };
  },
>(
  client: GraphQLClient,
  variables: SmsVerifyCodeConfirmQueryVariables,
  options?: UseQueryOptions<SmsVerifyCodeConfirmQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<SmsVerifyCodeConfirmQuery, TError, TData>(
    ['SmsVerifyCodeConfirm', variables],
    fetcher<SmsVerifyCodeConfirmQuery, SmsVerifyCodeConfirmQueryVariables>(
      client,
      SmsVerifyCodeConfirmDocument,
      variables,
      headers,
    ),
    options,
  );
export const SearchDocument = `
    query Search($country: CountryType!, $text: String!) {
  search(country: $country, text: $text) {
    reportInvokeId
    main {
      id
      text
      count
      relevance
    }
    relations {
      id
      text
      count
      relevance
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
