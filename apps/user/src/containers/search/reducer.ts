import { CountryType } from '@/generated/graphql';
import { MODAL_TYPE_ENUM, CACHING_KEY } from '@/types/enum.code';
import { useSessionStorage } from '@/utils/useSessionStorage';

export enum SEARCH_ACTION {
  GET_KEYWORD = 'GET_KEYWORD',
  SEARCH_KEYWORD = 'SEARCH_KEYWORD',
  SEARCH_MODE = 'SEARCH_MODE',
  GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS',
  INITIALIZE_STATE = 'INITIALIZE_STATE',
  SWITCH_MODAL = 'SWITCH_MODAL',
  UPDATE_CREATED_AT = 'UPDATE_CREATED_AT',
  GET_PRODUCT_IMAGES = 'GET_PRODUCT_IMAGES',
  INITIALIZE_IMAGES = 'INITIALIZE_IMAGES',
  USE_TRANSLATION = 'USE_TRANSLATION',
}

const searchInitialState: TSearchState = {
  country: CountryType.Vn,
  text: '',
  keyword: '',
  isSearched: false,
  isModalOpen: false,
  modalType: MODAL_TYPE_ENUM.SameKeywordReportExisted,
  createdAt: '',
  productImages: null,
};

const searchReducer = (_state: TSearchState, action: TSearchActionType) => {
  const state = structuredClone(_state);
  switch (action.type) {
    case SEARCH_ACTION.GET_KEYWORD:
      state.text = action.payload;
      return state;

    case SEARCH_ACTION.UPDATE_CREATED_AT:
      state.createdAt = action.payload;
      return state;

    case SEARCH_ACTION.SEARCH_KEYWORD:
      if (action.payload) {
        state.keyword = action.payload.toLowerCase();
      } else {
        state.keyword = state.text.toLowerCase().trim();
      }

      useSessionStorage.setItem(
        CACHING_KEY.STORED_KEYWORD,
        Object.assign({}, state, { productImages: null }),
      );

      return state;

    case SEARCH_ACTION.SEARCH_MODE:
      state.isSearched = action.payload;
      return state;

    case SEARCH_ACTION.INITIALIZE_STATE:
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
      return state;

    case SEARCH_ACTION.SWITCH_MODAL:
      if (action.payload.modalType) {
        state.modalType = action.payload.modalType;
      } else {
        state.modalType = searchInitialState.modalType;
      }

      state.isModalOpen = action.payload.isModalOpen;
      return state;

    case SEARCH_ACTION.GET_PRODUCT_IMAGES:
      state.productImages = action.payload;
      return state;

    case SEARCH_ACTION.INITIALIZE_IMAGES:
      if (action.payload.trim() !== _state.keyword) {
        state.productImages = searchInitialState.productImages;
      }
      return state;

    default:
      return state;
  }
};

export enum RECOMMANDER_ACTION {
  USE_TRANSLATION = 'USE_TRANSLATION',
  STORE_KEYWORD_RESULT = 'STORE_KEYWORD_RESULT',
  SWITCH_LOADING = 'SWITCH_LOADING',
  INITIALIZE_LIST = 'INITIALIZE_LIST',
}

const recommanderInitialState = {
  useTranslation: false,
  keyword: '',
  data: null,
  isLoading: false,
};

const recommanderReducer = (
  _state: TTranslationKeywordType,
  action: TRecommanderActionType,
) => {
  const state = structuredClone(_state);
  switch (action.type) {
    case RECOMMANDER_ACTION.USE_TRANSLATION:
      state.useTranslation = action.payload;
      return state;
    case RECOMMANDER_ACTION.STORE_KEYWORD_RESULT:
      state.data = action.payload;
      state.keyword = action.payload.keyword;
      useSessionStorage.setItem(CACHING_KEY.STORED_TRANSLATION, action.payload);
      return state;
    case RECOMMANDER_ACTION.SWITCH_LOADING:
      state.isLoading = action.payload;
      return state;
    // case RECOMMANDER_ACTION.INITIALIZE_LIST:
    //   useSessionStorage.removeItem(CACHING_KEY.STORED_TRANSLATION);
    //   state.data = null;
    //   return state;
    default:
      return state;
  }
};

export { searchInitialState, searchReducer, recommanderInitialState, recommanderReducer };
