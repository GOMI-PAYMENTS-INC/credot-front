import { CountryType } from '@/generated/graphql';

export enum ActionKind {
  GetKeyword = 'GET_KEYWORD',
  SearchKeyword = 'SEARCH_KEYWORD',
  SwitchMode = 'SWITCH_MODE',
  GetSearchResults = 'GET_SEARCH_RESULTS',
  InitializeState = 'INITIALIZE_STATE',
}

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
      console.log(action.payload);

      state.text = action.payload;
      console.log('state', state);
      return state;
    case ActionKind.SearchKeyword:
      if (action.payload) {
        state.keyword = action.payload;
      } else {
        state.keyword = state.text;
      }
      window.store = Object.assign({}, state);
      return state;
    case ActionKind.SwitchMode:
      state.isSearched = action.payload;
      return state;
    case ActionKind.InitializeState:
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
      return state;
    default:
      return state;
  }
};

export { initialState, reducer };
