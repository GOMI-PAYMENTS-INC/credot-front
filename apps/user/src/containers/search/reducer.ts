import { CountryType } from '@/generated/graphql';
import { MODAL_TYPE_ENUM } from '@/pages/search/SearchModal';
import { useSesstionStorage } from '@/utils/useSessionStorage';

export enum SearchAction {
  GetKeyword = 'GET_KEYWORD',
  SearchKeyword = 'SEARCH_KEYWORD',
  SearchMode = 'SEARCH_MODE',
  GetSearchResults = 'GET_SEARCH_RESULTS',
  InitializeState = 'INITIALIZE_STATE',
  SwitchModal = 'SWITCH_MODAL',
  UpdateCreatedAt = 'UPDATE_CREATED_AT',
  GetProductImages = 'GET_PRODUCT_IMAGES',
  InitialIzeImages = 'INITIALIZE_IMAGES',
}

const initialState: TState = {
  country: CountryType.Vn,
  text: '',
  keyword: '',
  isSearched: false,
  isModalOpen: false,
  modalType: MODAL_TYPE_ENUM.SameKeywordReportExisted,
  createdAt: '',
  productImages: null,
};

const reducer = (_state: TState, action: TAction) => {
  const state = structuredClone(_state);
  switch (action.type) {
    case SearchAction.GetKeyword:
      state.text = action.payload;
      return state;

    case SearchAction.UpdateCreatedAt:
      state.createdAt = action.payload;
      return state;

    case SearchAction.SearchKeyword:
      if (action.payload) {
        state.keyword = action.payload;
      } else {
        state.keyword = state.text.trim();
      }
      useSesstionStorage.setItem('keyword', Object.assign({}, state));

      return state;

    case SearchAction.SearchMode:
      state.isSearched = action.payload;
      return state;

    case SearchAction.InitializeState:
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
      return state;

    case SearchAction.SwitchModal:
      if (action.payload.modalType) {
        state.modalType = action.payload.modalType;
      } else {
        state.modalType = initialState.modalType;
      }

      state.isModalOpen = action.payload.isModalOpen;
      return state;

    case SearchAction.GetProductImages:
      state.productImages = action.payload;
      return state;

    case SearchAction.InitialIzeImages:
      state.productImages = initialState.productImages;
      return state;

    default:
      return state;
  }
};

export { initialState, reducer };
