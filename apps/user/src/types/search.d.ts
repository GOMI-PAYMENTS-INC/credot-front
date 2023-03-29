type TSearchActionType = {
  type: SEARCH_ACTION;
  payload?: any;
};

type TRecommanderActionType = {
  type: RECOMMANDER_ACTION;
  payload?: any;
};

type TSearchModalType =
  | 'SameKeywordReportExisted'
  | 'LessMonthlyKeywordVolumn'
  | 'NotBeOverDayReport';

type TSearchState = {
  //TODO: 국가 선택 가능 시  옵셔널 -> 팔수값으로 변경 (현재는 옵션이 없어 고정값으로 주고 있음)
  [key: string]: string | boolean | null;
  country?: CountryType;
  text: string;
  isSearched: boolean;
  keyword: string;
  isModalOpen: boolean;

  modalType: TSearchModalType;
  createdAt: string;
  productImages: TGetProductImageResponseType | null;
};

type TSearchRef = { current: Omit<TSearchState, 'translateType' | 'isSearched'> };

type TCreateReportParamsType = {
  country: string; // 국가코드
  reportInvokeId: string; // 키워드 아이디
};

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

type TGetTranslationOfKeywordReponse = {
  code: string;
  message: string;
  data: TDictionaryType;
};

type TDictionaryType = {
  keyword: string;
  dictionaries: { text: string; translate: string }[];
};

type TTranslationKeywordType = {
  useTranslation: boolean;
  keyword: string;
  data: TDictionaryType | null;
  isLoading: boolean;
};
