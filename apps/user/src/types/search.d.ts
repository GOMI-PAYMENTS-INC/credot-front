type TAction = {
  type: ActionKind;
  payload?: any;
};

type TState = {
  //TODO: 국가 선택 가능 시  옵셔널 -> 팔수값으로 변경 (현재는 옵션이 없어 고정값으로 주고 있음)
  [key: string]: string | boolean;
  country?: CountryType;
  text: string;
  isSearched: boolean;
  keyword: string;
};

type TSearchRef = { current: Omit<TState, 'translateType' | 'isSearched'> };
