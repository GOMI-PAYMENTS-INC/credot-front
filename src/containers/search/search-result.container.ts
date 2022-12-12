import { useSearchParams } from 'react-router-dom';

import { CountryType, TranslateType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

export const SearchResultContainer = () => {
  const [searchParams] = useSearchParams();
  const keywordParam = searchParams.get('keyword') ? searchParams.get('keyword') : '';

  const { data: searchResults } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      translateType: TranslateType.Order,
      text: String(keywordParam),
    },
    {
      enabled: !!keywordParam,
    },
  );

  const { data: subSearchResults, isLoading: isLoadingSearch } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      translateType: TranslateType.Order,
      text: String(searchResults?.search.main.translated),
    },
    {
      enabled: !!searchResults,
    },
  );

  return {
    main: searchResults?.search.main,
    relations: searchResults?.search.relations,
    subSearchResults,
    isLoadingSearch,
    keywordParam,
  };
};
