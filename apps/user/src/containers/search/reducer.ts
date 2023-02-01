import { CountryType, TranslateType, useSearchQuery } from '@/generated/graphql';
import { createElement } from 'react';

export enum ActionKind {
  GetKeyword = 'GET_KEYWORD',
  GetSearchResults = 'GET_SEARCH_RESULTS',
}

export type TAction = {
  type: ActionKind;
  payload: any;
};

type TState = {
  country: CountryType;
  translateType: TranslateType;
  text: string;
  component: JSX.Element | null;
};

const initialState: TState = {
  country: CountryType.Vn,
  translateType: TranslateType.Order,
  text: '',
  component: null,
};

const reducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case ActionKind.GetKeyword:
      state.text = action.payload;
      return state;
    default:
      return state;
  }
};

export { initialState, reducer };
