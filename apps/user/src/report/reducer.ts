import { GRADE_ITEMS, REPORT_DETAIL_TYPE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

const reportInitialState: TReportState = {
  main: null,
  relation: { id: 0, relations: null },
  salePrice: { data: null, focus: GRADE_ITEMS.HIGH, list: [] },
  oversea: null,
  brand: {
    focus: 0,
    data: null,
  },
  category: null,
  scrollEvent: { title: 'Report', isOpen: true, current: 'Report' },
  toggleEvent: [],
  spinnerEvent: false,
  shareToken: null,
};

enum REPORT_ACTION {
  INITIALIZE_DATA = 'INITIALIZE_DATA',
  SCROLL_EVENT = 'SCROLL_EVENT',
  TOGGLE_CONTROL = 'TOGGLE_CONTROL',
  UPDATE_CURRENT = 'UPDATE_CURRENT',
  RECOMMENDATION_TOGGLE_EVENT = 'RECOMMENDATION_TOGGLE_EVENT',
  INITIALIZE_SCROLL_EVENT = 'INITIALIZE_SCROLL_EVENT',
  SPINNER_EVENT = 'SPINNER_EVENT',
  FOCUS_ITEMS = 'FOCUS_ITEMS',
  FOCUS_BRAND = 'FOCUS_BRAND',
  GET_OVERSEA_PRODUCT = 'GET_OVERSEA_PRODUCT',
  CREAT_SHARE_TOKEN = 'CREAT_SHARE_TOKEN',
}

export type TReportAction = {
  type: REPORT_ACTION;
  payload?: any; // FIXME: any 지우기
};

const reportReducer = (_state: TReportState, action: TReportAction) => {
  const state = structuredClone(_state);
  switch (action.type) {
    case REPORT_ACTION.INITIALIZE_DATA: {
      const { type, data } = action.payload;
      if (type === REPORT_DETAIL_TYPE.MAIN) {
        state.main = data;
      }
      if (type === REPORT_DETAIL_TYPE.RELATION) {
        state.relation = data;
        const { relations } = data;

        const [first] = relations;
        if (first) {
          state.toggleEvent = state.toggleEvent.concat(first);
        }
      }
      if (type === REPORT_DETAIL_TYPE.PRICE) {
        state.salePrice.data = data;
        if (isFalsy(data.gradeItems) === false) {
          const [high] = data.gradeItems;
          state.salePrice.list = high;
        }
      }
      if (type === REPORT_DETAIL_TYPE.OVERSEA) {
        state.oversea = data;
      }
      if (type === REPORT_DETAIL_TYPE.BRAND) {
        state.brand.data = data;
      }
      if (type === REPORT_DETAIL_TYPE.CATEGORY) {
        state.category = data;
      }
      return state;
    }
    case REPORT_ACTION.SCROLL_EVENT: {
      state.scrollEvent.title = action.payload;
      return state;
    }
    case REPORT_ACTION.UPDATE_CURRENT: {
      state.scrollEvent.current = action.payload;
      return state;
    }
    case REPORT_ACTION.TOGGLE_CONTROL: {
      state.scrollEvent.isOpen = !state.scrollEvent.isOpen;
      return state;
    }
    case REPORT_ACTION.RECOMMENDATION_TOGGLE_EVENT: {
      const { id } = action.payload;
      const status = state.toggleEvent.find((status) => status.id === id) || false;

      if (status === false) {
        state.toggleEvent = state.toggleEvent.concat({ id: id, isOpen: true });
      } else {
        state.toggleEvent = state.toggleEvent.filter((key) => key.id !== id);
      }
      return state;
    }
    case REPORT_ACTION.INITIALIZE_SCROLL_EVENT: {
      state.scrollEvent = Object.assign({}, reportInitialState.scrollEvent, {
        isOpen: state.scrollEvent.isOpen,
      });
      return state;
    }
    case REPORT_ACTION.SPINNER_EVENT: {
      state.spinnerEvent = !state.spinnerEvent;
      return state;
    }
    case REPORT_ACTION.FOCUS_ITEMS: {
      state.salePrice.focus = action.payload.focus;

      const [high, medium, low] = state.salePrice.data?.gradeItems!;

      switch (action.payload.focus) {
        case GRADE_ITEMS.HIGH: {
          state.salePrice.list = high;
          break;
        }
        case GRADE_ITEMS.MEDIUM: {
          state.salePrice.list = medium;
          break;
        }
        default: {
          state.salePrice.list = low;
        }
      }
      return state;
    }
    case REPORT_ACTION.FOCUS_BRAND: {
      state.brand.focus = action.payload.focus;
      return state;
    }
    case REPORT_ACTION.CREAT_SHARE_TOKEN: {
      state.shareToken = action.payload;
      return state;
    }
    default:
      return state;
  }
};

enum REPORT_LIST_ACTION {
  //최초 리스트 가져오기
  REPORT_LIST = 'REPORT_LIST',
  //리포트 삭제
  DELETE_REPORT = 'DELETE_REPORT',
  SPINNER_EVENT = 'SPINNER_EVENT',
  //상품 목록 선택
  CHECKED_ITEM = 'CHECKED_ITEM',
  //상품 목록 전체 선택
  CHECKED_ALL_ITEM = 'CHECKED_ALL_ITEM',
}

const reportListInitialState: TReportListState = {
  page: 1,
  limit: 10,
  data: {
    reports: [],
    totalCount: 0,
  },
  isDeleteConfirmModalOpen: false,
  spinnerEvent: false,
  isCheckedAll: false,
  checkedItems: [],
};

const reportListReducer = (_state: TReportListState, action: TReportListAction) => {
  const state = structuredClone(_state);
  switch (action.type) {
    //리포트 목록 초기 출력
    case REPORT_LIST_ACTION.REPORT_LIST:
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.data = action.payload.data;
      return state;

    case REPORT_LIST_ACTION.DELETE_REPORT:
      state.isDeleteConfirmModalOpen = action.payload.isDeleteConfirmModalOpen;
      return state;

    case REPORT_LIST_ACTION.CHECKED_ITEM: {
      state.checkedItems = action.payload.checkedItems;
      return state;
    }

    case REPORT_LIST_ACTION.CHECKED_ALL_ITEM: {
      state.isCheckedAll = action.payload.isCheckedAll;
      return state;
    }

    case REPORT_LIST_ACTION.SPINNER_EVENT: {
      state.spinnerEvent = action.payload.spinnerEvent;
      return state;
    }

    default:
      return state;
  }
};

export {
  reportInitialState,
  reportReducer,
  reportListReducer,
  reportListInitialState,
  REPORT_LIST_ACTION,
  REPORT_ACTION,
};
