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
