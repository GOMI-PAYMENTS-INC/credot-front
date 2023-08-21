type TSearchProps = {
  [key: 'country' | 'sortBy' | 'keyword' | 'images']:
    | TSearchCountry
    | TSortBy
    | string
    | TProductImageType
    | null;
  country: TSearchCountry;
  sortBy: TSortBy;
  keyword: string;
  images: TProductImageType | null;
};

type TSearchResponse = {
  __typename?: 'responseSearch';
  reportInvokeId: string;
  main: {
    __typename?: 'searchDto';
    id: number;
    text: string;
    count?: number | null;
    relevance?: number | null;
  };
  relations: Array<{
    __typename?: 'searchDto';
    id: number;
    text: string;
    count?: number | null;
    relevance?: number | null;
  }>;
};
