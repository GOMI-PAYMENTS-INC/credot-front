import { CountryType, useSearchQuery } from '@/generated/graphql';
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
) => {
  const { data, isLoading, isFetching, isError } = useSearchQuery(
    {
      country: country,
      text: keyword,
    },
    {
      enabled: isFalsy(keyword) === false,
      refetchOnWindowFocus: false,
      onSuccess: async (res) => {
        try {
          //   const images = await getProductImages({
          //     keyword: keyword,
          //   });

          //   if (images && images.data.data !== null) {
          //     _getProductImages(images.data, _dispatch);
          //   }
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
