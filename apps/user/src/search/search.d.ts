type TSearchPayload = {
  [key: 'country' | 'sortBy' | 'keyword' | 'images']:
    | TSearchCountry
    | TSortBy
    | string
    | TGetProductImageResponse
    | null;
  country: TSearchCountry;
  sortBy: TSortBy;
  keyword: string;
  images: TGetProductImageResponse | null;
};
