import { CountryType } from '@/generated/graphql';

export enum ActionKind {
  GetKeyword = 'GET_KEYWORD',
  SearchKeyword = 'SEARCH_KEYWORD',
  SwitchMode = 'SWITCH_MODE',
  GetSearchResults = 'GET_SEARCH_RESULTS',
  InitializeState = 'INITIALIZE_STATE',
  SwitchModal = 'SWITCH_MODAL',
}

const initialState: TState = {
  country: CountryType.Vn,
  text: '',
  keyword: '',
  isSearched: false,
  isModalOpen: false,
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
    case ActionKind.SwitchModal:
      state.isModalOpen = action.payload;
    default:
      return state;
  }
};

export { initialState, reducer };
