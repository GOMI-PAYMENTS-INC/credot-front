import { CountryType } from '@/generated/graphql';

export enum ActionKind {
  GetKeyword = 'GET_KEYWORD',
  SearchKeyword = 'SEARCH_KEYWORD',
  SwitchMode = 'SWITCH_MODE',
  GetSearchResults = 'GET_SEARCH_RESULTS',
  InitializeState = 'INITIALIZE_STATE',
}

export type TAction = {
  type: ActionKind;
  payload?: any;
};

type TState = {
  //TODO: 국가 선택 가능 시  옵셔널 -> 팔수값으로 변경 (현재는 옵션이 없어 고정값으로 주고 있음)
  country?: CountryType;
  text: string;
  isSearched: boolean;
  keyword: string;
};

export type TSearchRef = { current: Omit<TState, 'translateType' | 'isSearched'> };

const initialState: TState = {
  country: CountryType.Vn,
  text: '',
  keyword: '',
  isSearched: false,
};

const reducer = (_state: TState, action: TAction) => {
  const state = structuredClone(_state);
  switch (action.type) {
    case ActionKind.GetKeyword:
      state.text = action.payload;
      return state;
    case ActionKind.SearchKeyword:
      if (action.payload) {
        state.keyword = action.payload;
      } else {
        state.keyword = state.text;
      }
      return state;
    case ActionKind.SwitchMode:
      state.isSearched = action.payload;
      return state;
    case ActionKind.InitializeState:
      return initialState;
    default:
      return state;
  }
};

export { initialState, reducer };
