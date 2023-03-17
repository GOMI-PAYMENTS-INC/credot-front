import { useState, Dispatch } from 'react';
import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';

import { HTTP } from '@/api/axiosConfig';
import { STATUS_CODE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';
import { isTruthy } from '@/utils/isTruthy';

import { getProductImages } from '@/containers/search/search';

export const getQueryResult = (keyword: string, _dispatch: Dispatch<TAction>) => {
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
      onSuccess: async (res) => {
        try {
          const images = await _getProductImages({
            reportInvokeId: res.search.reportInvokeId,
          });

          if (images && images.data.data !== null) {
            getProductImages(images.data, _dispatch);
          }
          return;
        } catch (error) {
          console.error(error, 'error');
        }
      },
    },
  );
  const response = data?.search;

  return { response, isLoading, isError };
};

const REPORT_URL = {
  postCreateReport: 'api/v1/report',
  getReportExisted: 'api/v1/report/exist',
  getProductImage: `/api/v1/keyword/`,
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

export const _getProductImages = async (queryString: { reportInvokeId: string }) => {
  try {
    const url = REPORT_URL.getProductImage + queryString.reportInvokeId + '/image';
    return await HTTP.get<TGetProductImageResponseType>(url);
  } catch (error) {
    console.error(error);
  }
};
