import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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

export type Query = {
  __typename?: 'Query';
  /** 키워드 검색 ( 구글 번역 api 사용 ) */
  search: ResponseSearch;
  /** 텍스트 번역 ( 구글 번역 api 사용 ) */
  translate: Scalars['String'];
};

export type QuerySearchArgs = {
  country: CountryType;
  text: Scalars['String'];
  translateType?: InputMaybe<TranslateType>;
};

export type QueryTranslateArgs = {
  country: Scalars['String'];
  text: Scalars['String'];
};

/** 번역 타입(optional), order(번역순서): 원문->영어->베트남어->한국어 */
export enum TranslateType {
  /** 번역 타입(optional), order(번역순서): 원문->영어->베트남어->한국어 */
  Order = 'ORDER',
}

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
      text: string;
      ko: string;
      en: string;
      translated: string;
      count: number;
      relevance: number;
      thumbnailLink: Array<string>;
    };
    relations: Array<{
      __typename?: 'searchDto';
      text: string;
      ko: string;
      en: string;
      translated: string;
      count: number;
      relevance: number;
      thumbnailLink: Array<string>;
    }>;
  };
};

export const SearchDocument = `
    query Search($country: CountryType!, $translateType: TranslateType, $text: String!) {
  search(country: $country, translateType: $translateType, text: $text) {
    main {
      text
      ko
      en
      translated
      count
      relevance
      thumbnailLink
    }
    relations {
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
