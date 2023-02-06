import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

export const SearchResultContainer = () => {
  const [searchParams] = useSearchParams();
  const [isSearchQuery, SetIsSearchQuery] = useState<boolean>(true);
  const keywordParam = searchParams.get('keyword') ? searchParams.get('keyword') : '';

  const { data: searchResults, isError: searchQueryError } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      text: String(keywordParam),
    },
    {
      enabled: !!keywordParam && isSearchQuery,
      refetchOnWindowFocus: false,
    },
  );

  const { data: subSearchResults, isLoading: isSubLoadingSearch } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      text: String(searchResults?.search.main.text),
    },
    {
      enabled:
        !!searchResults &&
        searchResults.search.main.text !== searchResults.search.main.text,
      refetchOnWindowFocus: false,
    },
  );

  return {
    main: searchResults?.search.main,
    relations: searchResults?.search.relations,
    SetIsSearchQuery,
    searchQueryError,
    subSearchResults,
    isSubLoadingSearch,
    keywordParam,
  };
};
