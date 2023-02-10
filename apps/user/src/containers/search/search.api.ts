import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

import { HTTP, defaultOptions } from '@/utils/axiosConfig';
import { snakeize } from 'casing';
import { STATUS_CODE } from '@/types/statusCode';

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
  console.log('postCreateReport is called');
  try {
    return await HTTP.post<TCreateReportParamsType, TPostCreateReport>(
      REPORT_URL.postCreateReport,
      snakeize({ ...params }),
      defaultOptions,
    );
  } catch (error) {
    console.error(error);
  }
};

type TReportExistedResponseType = {
  code: STATUS_CODE;
  message: string;
  data: { isDaily: boolean; createdAt: Date }[] | null;
};

export const getReportExisted = async (queryString: { keyword: string }) => {
  console.log('getReportExisted is called');
  try {
    return await HTTP.get<{ response: TReportExistedResponseType }>(
      REPORT_URL.getReportExisted,
      {
        ...defaultOptions,
        params: snakeize(queryString),
      },
    );
  } catch (error) {
    console.error(error);
  }
};
