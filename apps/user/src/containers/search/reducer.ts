import { CountryType } from '@/generated/graphql';
import { MODAL_TYPE_ENUM } from '@/pages/search/SearchModal';
import { useSesstionStorage } from '@/utils/useSessionStorage';

export enum ActionKind {
  GetKeyword = 'GET_KEYWORD',
  SearchKeyword = 'SEARCH_KEYWORD',
  SearchMode = 'SEARCH_MODE',
  GetSearchResults = 'GET_SEARCH_RESULTS',
  InitializeState = 'INITIALIZE_STATE',
  SwitchModal = 'SWITCH_MODAL',
  UpdateCreatedAt = 'UPDATE_CREATED_AT',
}

const initialState: TState = {
  country: CountryType.Vn,
  text: '',
  keyword: '',
  isSearched: false,
  isModalOpen: false,
  modalType: MODAL_TYPE_ENUM.SameKeywordReportExisted,
  createdAt: '',
};

const reducer = (_state: TState, action: TAction) => {
  const state = structuredClone(_state);
  switch (action.type) {
    case ActionKind.GetKeyword:
      state.text = action.payload;
      return state;

    case ActionKind.UpdateCreatedAt:
      state.createdAt = action.payload;
      return state;

    case ActionKind.SearchKeyword:
      if (action.payload) {
        state.keyword = action.payload;
      } else {
        state.keyword = state.text;
      }
      useSesstionStorage.setItem('keyword', Object.assign({}, state));

      return state;

    case ActionKind.SearchMode:
      state.isSearched = action.payload;
      return state;

    case ActionKind.InitializeState:
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
      return state;

    case ActionKind.SwitchModal:
      if (action.payload.modalType) {
        state.modalType = action.payload.modalType;
      } else {
        state.modalType = initialState.modalType;
      }

      state.isModalOpen = action.payload.isModalOpen;

    default:
      return state;
  }
};

export { initialState, reducer };
