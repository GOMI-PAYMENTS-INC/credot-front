import { Dispatch, SetStateAction } from 'react';
import { CountryType, useSearchQuery } from '@/generated/graphql';
import { updateSearchPayload, initailizeSearchProps } from '@/search/container';
import { getProductImages } from '@/search/api';
import { isFalsy } from '@/utils/isFalsy';
import { _getProductImages } from '@/search/container';

import {
  _amplitudeKeywordSearchedFailed,
  _amplitudeKeywordSearchedSucceeded,
} from '@/amplitude/amplitude.service';

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
          const images = await getProductImages({ keyword });

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
