import { CountryType, useSearchQuery } from '@/generated/graphql';
import { _getProductImages } from '@/search/container';
import {
  _amplitudeKeywordSearchedFailed,
  _amplitudeKeywordSearchedSucceeded,
} from '@/amplitude/amplitude.service';

interface IGetQueryType {
  country: CountryType;
  sortBy: TSortBy;
  text: string;
  trigger: boolean;
}

export const getQueryResult = (props: IGetQueryType) => {
  const { country, text, trigger, sortBy } = props;

  const { data, isLoading, isFetching, isError } = useSearchQuery(
    {
      country: country,
      text,
    },
    {
      enabled: trigger,
      refetchOnWindowFocus: false,
      onError: (error) => {
        _amplitudeKeywordSearchedFailed(
          country,
          sortBy,
          text,
          error.response.errors[0].message,
        );
      },
    },
  );

  const response = data?.search;

  return { response, isLoading, isFetching, isError };
};
