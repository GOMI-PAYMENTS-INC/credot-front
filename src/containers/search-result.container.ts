import { CountryType, TranslateType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

export const SearchResultContainer = () => {
  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    refetch: refetchSearch,
  } = useSearchQuery(graphQLClient, {
    country: CountryType.Kr,
    translateType: TranslateType.Order,
    text: 'text',
  });

  console.log(searchResults);
  console.log(isLoadingSearch);
  // console.log(refetchSearch);

  return {
    main: searchResults?.search.main,
    relations: searchResults?.search.relations,
    isLoadingSearch,
  };
};
