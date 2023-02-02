import { CountryType, useSearchQuery } from '@/generated/graphql';
import { createElement } from 'react';

export enum ActionKind {
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
};

export type TSearchRef = { current: Omit<TState, 'translateType' | 'isSearched'> };

const initialState: TState = {
  country: CountryType.Vn,
  text: '',
  isSearched: false,
};

const reducer = (_state: TState, action: TAction) => {
  const state = structuredClone(_state);
  switch (action.type) {
    case ActionKind.SearchKeyword:
      state.text = action.payload;
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
