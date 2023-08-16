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
  | 'MakeDuplicateReportSuccesses'
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
  productImages: TGetProductImageResponse | null;
  newReportId: number;
};

type TSearchRef = { current: Omit<TSearchState, 'translateType' | 'isSearched'> };

type TPostCreateReportResponse = {
  code: STATUS_CODE;
  message: string;
  data: TPostCreateReportResponseData;
};

type TPostCreateReportResponseData = {
  country: CountryType;
  reportInvokeId: string;
  reportId: number;
  isSendSms: boolean;
};

type TReportExistedResponse = {
  code: STATUS_CODE;
  message: string;
  data: { isDaily: boolean; createdAt: Date } | null;
};

type TGetProductImageResponse = {
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

type TGetTranslationOfKeywordParams = {
  term: string;
  country: CountryType;
};

type TSearchCountry = 'SG' | 'MY' | 'VN' | 'TW' | 'TH';

type TSwitchModal = {
  _dispatch: Dispatch<TSearchActionType>;
  _setTrigger?: Dispatch<SetStateAction<boolean>>;
};

type TRequestReport = {
  _setTrigger: Dispatch<SetStateAction<boolean>>;
  _dispatch: Dispatch<TSearchActionType>;
  parameter: TReportParams;
  _state: TSearchState;
};

type TReportParams = {
  reportInvokeId: string | undefined;
  count: number | null | undefined;
};
