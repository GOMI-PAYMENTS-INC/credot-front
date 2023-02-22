import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';

import { HTTP } from '@/api/axiosConfig';
import { snakeize } from 'casing';
import { STATUS_CODE } from '@/types/enum.code';

import { isFalsy } from '@/utils/isFalsy';

export const GetQueryResult = (keyword: string) => {
  const { data, isLoading, isError } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      text: keyword,
    },
    {
      //FIXME: 검색어를 입력한 후 매 이벤트마다 함수가 실행됨
      enabled: isFalsy(keyword) === false,
      refetchOnWindowFocus: false,
    },
  );
  const response = data?.search;
  return [response, isLoading, isError];
};

const REPORT_URL = {
  postCreateReport: 'api/v1/report',
  getReportExisted: 'api/v1/report/exist',
};

type TPostCreateReport = {
  code: STATUS_CODE;
  message: string;
  data: null;
};

export const postCreateReport = async (params: TCreateReportParamsType) => {
  try {
    return await HTTP.post<TCreateReportParamsType, TPostCreateReport>(
      REPORT_URL.postCreateReport,
      params,
    );
  } catch (error) {
    console.error(error);
  }
};

type TReportExistedResponseType = {
  code: STATUS_CODE;
  message: string;
  data: { is_daily: boolean; created_at: Date } | null;
};

export const getReportExisted = async (queryString: { text: string }) => {
  try {
    return await HTTP.get<TReportExistedResponseType>(REPORT_URL.getReportExisted, {
      params: queryString,
    });
  } catch (error) {
    console.error(error);
  }
};
