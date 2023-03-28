import { Dispatch } from 'react';
import { CountryType, SearchDto, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';

import { HTTP } from '@/api/axiosConfig';
import { isFalsy } from '@/utils/isFalsy';
import { getProductImages } from '@/containers/search/search.container';
import {
  _keywordReportKeywordSearched,
  _keywordReportKeywordSearchedFailed,
  _keywordReportKeywordSearchedSucceeded,
} from '@/amplitude/amplitude.service';

export const getQueryResult = (
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const { data, isLoading, isFetching, isError } = useSearchQuery(
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
            keyword: keyword,
          });

          if (images && images.data.data !== null) {
            getProductImages(images.data, _dispatch);
          }
          //앰플리튜드 이벤트 - 키워드 검색 성공
          _keywordReportKeywordSearchedSucceeded(keyword, res.search.relations);
          return;
        } catch (error) {
          console.error(error, 'error');
        }
      },
      onError: (error) => {
        //앰플리튜드 이벤트 - 키워드 검색 실패 시
        _keywordReportKeywordSearchedFailed(keyword, error.response.errors[0].message);
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

export const _getProductImages = async (queryString: { keyword: string }) => {
  try {
    const url = REPORT_URL.getProductImage + queryString.keyword + '/image';
    return await HTTP.get<TGetProductImageResponseType>(url);
  } catch (error) {
    console.error(error);
  }
};
