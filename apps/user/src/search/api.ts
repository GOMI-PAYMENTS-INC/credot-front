import { Dispatch } from 'react';
import { CountryType, useSearchQuery } from '@/generated/graphql';

import { HTTP } from '@/api/axiosConfig';
import { isFalsy } from '@/utils/isFalsy';
import { _getProductImages } from '@/search/container';
import {
  _amplitudeKeywordSearchedFailed,
  _amplitudeKeywordSearchedSucceeded,
} from '@/amplitude/amplitude.service';

export const getQueryResult = (
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
  hackleState?: THackleState | null,
) => {
  const { data, isLoading, isFetching, isError } = useSearchQuery(
    {
      country: country,
      text: keyword,
    },
    {
      //FIXME: 검색어를 입력한 후 매 이벤트마다 함수가 실행됨
      enabled: isFalsy(keyword) === false,
      refetchOnWindowFocus: false,
      onSuccess: async (res) => {
        try {
          const images = await getProductImages({
            keyword: keyword,
          });

          if (images && images.data.data !== null) {
            _getProductImages(images.data, _dispatch);
          }
          _amplitudeKeywordSearchedSucceeded(
            country,
            sortBy,
            keyword,
            res.search.relations,
            res.search.main.count,
            hackleState,
          );
          return;
        } catch (error) {
          console.error(error, 'error');
        }
      },
      onError: (error) => {
        _amplitudeKeywordSearchedFailed(
          country,
          sortBy,
          keyword,
          error.response.errors[0].message,
        );
      },
    },
  );

  const response = data?.search;

  return { response, isLoading, isFetching, isError };
};

const REPORT_URL = {
  postCreateReport: 'api/v1/report',
  getReportExisted: 'api/v1/report/exist',
  getProductImage: `api/v1/keyword/`,
};

export const postCreateReport = async (params: TCreateReportParams) => {
  try {
    const response = await HTTP.post<TCreateReportParams, TPostCreateReportResponse>(
      REPORT_URL.postCreateReport,
      params,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReportExisted = async (params: TGetReportExistedParamsType) => {
  try {
    return await HTTP.get<TReportExistedResponse>(REPORT_URL.getReportExisted, {
      params,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProductImages = async (queryString: { keyword: string }) => {
  try {
    const URL = REPORT_URL.getProductImage + queryString.keyword + '/image';
    return await HTTP.get<TGetProductImageResponse>(URL);
  } catch (error) {
    console.error(error);
  }
};

export const getTranslationOfKeyword = async (
  queryString: TGetTranslationOfKeywordParams,
) => {
  try {
    const res = await HTTP.get<TGetTranslationOfKeywordResponse>(
      `/api/v1/gpt/translate`,
      {
        params: queryString,
      },
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
