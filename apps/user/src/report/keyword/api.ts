import { CountryType, useSearchQuery } from '@/generated/graphql';
import { _getProductImages } from '@/search/container';
import {
  _amplitudeKeywordSearchedFailed,
  _amplitudeKeywordSearchedSucceeded,
} from '@/amplitude/amplitude.service';
import { HackleId } from '@/atom/common/hackle.atom';
import { useRecoilValue } from 'recoil';

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
      onSuccess: async (res) => {
        const hackleId = useRecoilValue(HackleId);
        try {
          _amplitudeKeywordSearchedSucceeded(
            country,
            sortBy,
            text,
            res.search.relations,
            res.search.main.count,
            hackleId,
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
          text,
          error.response.errors[0].message,
        );
      },
    },
  );

  const response = data?.search;

  return { response, isLoading, isFetching, isError };
};
