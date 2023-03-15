import { useState } from 'react';
import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';

import { HTTP } from '@/api/axiosConfig';
import { STATUS_CODE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

export const getQueryResult = (keyword: string) => {
  const [storeId, setStoreId] = useState('');
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

  if (data?.search.reportInvokeId && data?.search.reportInvokeId !== storeId) {
    setStoreId(data.search.reportInvokeId);
    getProductImages({ reportInvokeId: data.search.reportInvokeId });
  }

  return [response, isLoading, isError];
};

const REPORT_URL = {
  postCreateReport: 'api/v1/report',
  getReportExisted: 'api/v1/report/exist',
  getProductImage: `/api/v1/keyword/{reportInvokeId}/image`,
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

export const getReportExisted = async (queryString: { text: string }) => {
  try {
    return await HTTP.get<TReportExistedResponseType>(REPORT_URL.getReportExisted, {
      params: queryString,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProductImages = async (queryString: { reportInvokeId: string }) => {
  try {
    return await HTTP.get<TGetProductImageResponseType>(
      `/api/v1/keyword/${queryString.reportInvokeId}/image`,
    );
  } catch (error) {
    console.error(error);
  }
};
