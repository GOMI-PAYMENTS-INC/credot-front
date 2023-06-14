type TSearchActionType = {
  type: SEARCH_ACTION;
  payload?: any;
};

type TRecommanderActionType = {
  type: RECOMMANDER_ACTION;
  payload?: any;
};

type TSearchModalType =
  | 'MakeReportSuccesses'
  | 'SameKeywordReportExisted'
  | 'LessMonthlyKeywordVolume'
  | 'NotBeOverDayReport';

type TSearchState = {
  [key: string]: string | boolean | null | CountryType | TSortBy;
  country: CountryType;
  sortBy: TSortBy;
  text: string;
  isSearched: boolean;
  keyword: string;
  isModalOpen: boolean;

  modalType: TSearchModalType;
  createdAt: string;
  productImages: TGetProductImageResponseType | null;
};

type TSearchRef = { current: Omit<TSearchState, 'translateType' | 'isSearched'> };

type TCreateReportReponseType = {
  code: string;
  message: string;
  data: any;
};

type TPostCreateReport = {
  code: STATUS_CODE;
  message: string;
  data: null;
};

type TReportExistedResponseType = {
  code: STATUS_CODE;
  message: string;
  data: { isDaily: boolean; createdAt: Date } | null;
};

type TGetProductImageResponseType = {
  code: string;
  message: string;
  data: TProductImageType[];
};

type TProductImageType = {
  keywrod: string;
  imageUrl: string[];
};

type TProductImageStatus = {
  isSuccess: boolean;
  productInvokedId: string;
};

type TGetTranslationOfKeywordResponse = {
  code: string;
  message: string;
  data: TDictionaryType;
};

type TDictionaryType = {
  country: CountryType;
  keyword: string;
  dictionaries: { country: CountryType; text: string; translate: string }[];
};

type TTranslationKeywordType = {
  useTranslation: boolean;
  keyword: string;
  data: TDictionaryType | null;
  isLoading: boolean;
  isError: boolean;
};

type TGetTranslationOfKeywordParamsType = {
  term: string;
  country: CountryType;
};
