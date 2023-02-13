import { HTTP, defaultOptions } from '@/utils/axiosConfig';
import { camelize, snakeize } from 'casing';
import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';
import { isFalsy } from '@/utils/isFalsy';

export type TReportItem = {
  id: Number;
  userId: Number;
  reportUniqueId: String;
  countryCode: String;
  channel: String;
  keyword: String;
  isMain: Boolean;
  sortBy: String;
  itemCount: Number;
  totalItemCount: Number;
  averagePrice: Number;
  createdAt: Date;
  updatedAt: Date;
};

export type TReportListParamsType = {
  lastId?: number; // 페이징용 리포트id
  limit?: number; // 페이징용 리스트 사이즈
};

export type TCreateReportParamsType = {
  country: string; // 국가코드
  text: string; // 키워드
};

export type TCreateReportReponseType = {
  code: string;
  message: string;
  data: any;
};
const REPORT_URL = 'api/v1/report';

export const getReportList = (queryString: TReportListParamsType = {}) =>
  HTTP.get<{ results: TReportItem }>(REPORT_URL, {
    ...defaultOptions,
    params: snakeize(queryString),
  });
