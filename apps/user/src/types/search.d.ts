type TAction = {
  type: ActionKind;
  payload?: any;
};

type TSearchModalType =
  | 'SameKeywordReportExisted'
  | 'LessMonthlyKeywordVolumn'
  | 'NotBeOverDayReport';

type TState = {
  //TODO: 국가 선택 가능 시  옵셔널 -> 팔수값으로 변경 (현재는 옵션이 없어 고정값으로 주고 있음)
  [key: string]: string | boolean;
  country?: CountryType;
  text: string;
  isSearched: boolean;
  keyword: string;
  isModalOpen: boolean;
  modalType: TSearchModalType;
};

type TSearchRef = { current: Omit<TState, 'translateType' | 'isSearched'> };

type TCreateReportParamsType = {
  country: string; // 국가코드
  reportInvokeId: string; // 키워드 아이디
};

type TCreateReportReponseType = {
  code: string;
  message: string;
  data: any;
};
