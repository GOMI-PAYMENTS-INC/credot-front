import { Dispatch, SetStateAction } from 'react';
import { useSearchQuery, CountryType } from '@/generated/graphql';
import { HTTP } from '@/api/axiosConfig';
import { isFalsy } from '@/utils/isFalsy';
import { _getProductImages } from '@/search/container';
import {
  _amplitudeKeywordSearchedFailed,
  _amplitudeKeywordSearchedSucceeded,
} from '@/amplitude/amplitude.service';

import { updateSearchPayload } from '@/search/container';

export const deprecatedGetQueryResult = (
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
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
            country: country as TSearchCountry,
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

export const getQueryResult = (
  payload: TSearchProps,
  _dispatch: Dispatch<SetStateAction<TSearchProps>>,
) => {
  const { country, sortBy, keyword } = payload;

  const { data, isLoading, isFetching, isError } = useSearchQuery(
    { country, text: keyword },
    {
      enabled: isFalsy(keyword) === false,
      refetchOnWindowFocus: false,
      onSuccess: async (res) => {
        try {
          updateSearchPayload({
            _state: payload,
            _dispatch,
            key: 'images',
            params: null,
          });
          const images = await getProductImages({ keyword, country: payload.country });

          if (images && images.data.data !== null) {
            const [productImgs] = images.data.data;
            updateSearchPayload({
              _state: payload,
              _dispatch,
              key: 'images',
              params: productImgs,
            });
          }

          _amplitudeKeywordSearchedSucceeded(
            country,
            sortBy,
            keyword,
            res.search.relations,
            res.search.main.count,
          );
          return;
        } catch (error) {
          throw new Error('검색어 처리 중 문제가 발생하였습니다.');
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
  hotKeyword: 'api/v1/hot-keyword',
  getTranslate: 'api/v1/gpt/translate',
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

export const getProductImages = async (queryString: {
  keyword: string;
  country: TSearchCountry;
}) => {
  try {
    const URL =
      REPORT_URL.getProductImage +
      queryString.keyword +
      `/${queryString.country}` +
      '/image';
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
      REPORT_URL.getTranslate,
      {
        params: queryString,
      },
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getHotKeywords = async () => {
  try {
    const { data } = await HTTP.get<{ data: TGetKeywordsReponse }>(REPORT_URL.hotKeyword);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
