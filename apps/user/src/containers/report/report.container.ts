import {
  deleteReportList,
  getMainReport,
  getRelationReport,
  getSalePrice,
} from './report.api';
import { ChangeEvent, Dispatch, RefObject } from 'react';

import {
  REPORT_ACTION,
  REPORT_LIST_ACTION,
  TReportAction,
} from '@/containers/report/report.reducer';
import {
  GRADE_ITEMS,
  BATCH_STATUS,
  STATUS_CODE,
  TAG_SENTIMENT_STATUS,
  TITLE,
} from '@/types/enum.code';

import { getReportList } from '@/containers/report/report.api';

import { convertBatchStatus, convertCountry } from '@/utils/convertEnum';
import { toast } from 'react-toastify';

export const openBrowser = (url: string) => {
  window.open(url);
};

export const convertTitle = (id: string) => {
  switch (id) {
    case TITLE.REPORT:
      return '리포트';
    case TITLE.MARTKET_SIZE:
      return '시장규모';
    case TITLE.RECOMMEND_KEYWORD:
      return '추천 키워드';
    case TITLE.KEYWORD_INFO:
      return '키워드 정보';
    case TITLE.SALE_PRICE:
      return '판매 가격';
    default:
      return id;
  }
};

export const _getReportInfo = async (id: string, _dispatch: Dispatch<TReportAction>) => {
  try {
    const response = await Promise.all([
      getMainReport(id),
      getRelationReport(id),
      getSalePrice(id),
    ]);
    const dataName = ['main', 'relation', 'price'];
    response.forEach((chunk, idx) => {
      if (chunk) {
        const { data } = chunk.data;
        _dispatch({
          type: REPORT_ACTION.INITIALIZE_DATA,
          payload: { type: dataName[idx], data: data },
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const _getRelationReport = async (
  id: string,
  _dispatch: Dispatch<TReportAction>,
) => {
  try {
    const response = await getRelationReport(id);
    if (response?.data) {
      const { data } = response.data;
      _dispatch({
        type: REPORT_ACTION.INITIALIZE_DATA,
        payload: { type: 'relation', data: data },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const convertExachangeRate = (vnd: number, krw: number) => {
  return Math.floor((vnd / 100) * krw);
};

export const updateTitle = (
  curLocation: number,
  _dispatch: Dispatch<TReportAction>,
  name?: string,
) => {
  if (curLocation < 100) {
    _dispatch({ type: REPORT_ACTION.SCROLL_EVENT, payload: TITLE.REPORT });
    return;
  } else {
    _dispatch({ type: REPORT_ACTION.SCROLL_EVENT, payload: name });
  }
  if (curLocation > 210 && curLocation < 459) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.MARTKET_SIZE });
  }
  if (curLocation > 460 && curLocation < 884) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.KEYWORD_INFO });
  }

  if (curLocation > 885 && curLocation < 1934) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.RECOMMEND_KEYWORD });
  }

  if (curLocation > 1935) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.SALE_PRICE });
  }
};

export const isToggleOpen = (
  _dispatch: Dispatch<TReportAction>,
  isContent: boolean,
  id?: number,
) => {
  if (isContent) {
    _dispatch({ type: REPORT_ACTION.TOGGLE_CONTROL });
  } else {
    _dispatch({ type: REPORT_ACTION.RECOMMENDATION_TOGGLE_EVENT, payload: { id: id } });
  }
};
export const _getReportList = async ({ _state, _dispatch }: TGetReportList) => {
  try {
    //isLoading 준비중
    _dispatch({
      type: REPORT_LIST_ACTION.SPINNER_EVENT,
      payload: { spinnerEvent: false },
    });

    const res = await getReportList({
      page: _state.page,
      limit: _state.limit,
    });
    const reportInfo = res?.data;
    if (reportInfo?.code === STATUS_CODE.SUCCESS) {
      //데이터 담기
      _state.data = reportInfo.data;
      _dispatch({ type: REPORT_LIST_ACTION.GET_REPORT_LIST, payload: _state });

      //isLoading 완료
      _dispatch({
        type: REPORT_LIST_ACTION.SPINNER_EVENT,
        payload: { spinnerEvent: true },
      });
    }

    return reportInfo;
  } catch (error) {
    console.error(error);
  }
};

export const scrollToTop = (
  _dispatch: Dispatch<TReportAction>,
  personInfo: RefObject<HTMLDivElement>,
) => {
  personInfo.current?.scroll(0, 0);
  _dispatch({ type: REPORT_ACTION.INITIALIZE_SCROLL_EVENT });
};

export const reportListConverter = (item: TReportItem) => {
  const result = {
    status: {
      text: convertBatchStatus(item.status),
      sentiment: TAG_SENTIMENT_STATUS.ATTENTIVE,
    },
    countryCode: {
      text: convertCountry(item.countryCode),
      iconPath: '/assets/icons/flag/Vietnam.svg',
    },
    channel: { iconPath: '/assets/icons/shop/Shopee.svg' },
  };

  if (item.status === BATCH_STATUS.DONE) {
    result.status.sentiment = TAG_SENTIMENT_STATUS.POSITIVE;
  }
  return result;
};

//리포트 목록 삭제 api
export const _deleteReportList = async (ids: number[]) => {
  try {
    const response = await deleteReportList({
      ids: ids,
    });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

//TODO: setCheckedItems reducer로 관리하게 변경 할 것 - casey 23.02.22
//리포트 목록 삭제 container
export const deleteReports = (
  checkedItems: number[],
  setCheckedItems: Dispatch<number[]>,
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
) => {
  //삭제 실행
  _deleteReportList(checkedItems).then((result) => {
    if (result?.code === STATUS_CODE.SUCCESS) {
      //모달 닫기
      switchDeleteModal(_dispatch, false);

      // 총 페이지 갯수
      const numPages = Math.ceil(_state.data.totalCount / _state.limit);
      //페이지에서 모든 item을 삭제한 경우, 하나 작은 숫자의 페이지로 이동한다.
      if (1 < numPages && _state.data.reports.length === checkedItems.length) {
        _state.page = _state.page - 1;
      }

      //목록 다시 불러오기
      _getReportList({ _state: _state, _dispatch }).then(() => {
        //선택된 체크박스 목록 비우기
        setCheckedItems([]);
      });

      //토스트 알림
      toast.success(`리포트를 삭제했어요.`);
    } else {
      toast.error(`리포트를 삭제할 수 없습니다.`);
    }
  });
};

//리포트 목록 삭제 확인 confirm 모달 상태 변경
export const switchDeleteModal = (
  _dispatch: Dispatch<TReportListAction>,
  isOpen: boolean,
) => {
  _dispatch({
    type: REPORT_LIST_ACTION.DELETE_REPORT,
    payload: {
      isDeleteConfirmModalOpen: isOpen,
    },
  });
};

//리포트 목록 삭제 확인 confirm 모달
export const openDeleteModal = (
  checkedItems: number[],
  _dispatch: Dispatch<TReportListAction>,
) => {
  //선택된 상품이 있는지 판단
  if (checkedItems.length) {
    switchDeleteModal(_dispatch, true);
  } else {
    toast.warn('리포트를 선택해주세요.');
  }
};

//선택 삭제 버튼 클릭 시
export const onClickDeleteReport = (
  checkedItems: number[],
  _dispatch: Dispatch<TReportListAction>,
) => {
  // 삭제 모달 노출
  openDeleteModal(checkedItems, _dispatch);
};

//리포트 목록 > 새로고침 버튼 클릭시
export const onClickReload = (
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
) => {
  _getReportList({ _state, _dispatch });
};

export const roundNumber = (number: number | string) => {
  if ((number + '').split('.').length === 1) return number;

  let originNumber = number;
  if (typeof originNumber === 'string') {
    originNumber = parseInt(originNumber);
  }

  const fixedNumber = originNumber.toFixed(1);
  const [firstPlaceNumber, secondPlaceNumber] = fixedNumber.split('.');

  if (secondPlaceNumber === '0') return 0;

  return parseInt(fixedNumber);
};

export const delayEvent = (callback: () => void, time: number) => {
  setTimeout(() => {
    callback();
  }, time);
};

export const buttonSpinnerEvent = (_dispatch: Dispatch<TReportAction>) => {
  _dispatch({ type: REPORT_ACTION.SPINNER_EVENT });
};

export const countProductsByPrice = (scope: number[], items: TSalePriceItems[][]) => {
  const [low, medium, high] = items;

  const boundary = {
    low: { min: low[0].itemPriceMin, max: low[low.length - 1].itemPriceMin },
    medium: { min: medium[0].itemPriceMin, max: medium[medium.length - 1].itemPriceMin },
    high: { min: high[0].itemPriceMin, max: high[high.length - 1].itemPriceMin },
  };

  return scope.map((price, idx) => {
    if (idx === scope.length - 1) {
      return high.filter((item) => item.itemPriceMin === price);
    }
    const maxPrice = scope[idx + 1];

    if (boundary.low.max >= price) {
      low.filter(
        (item) => item.itemPriceMin >= price || item.itemPriceMin < maxPrice - 1,
      );
    }

    if (boundary.medium.min >= price && boundary.medium.max < maxPrice) {
      medium.filter(
        (item) => item.itemPriceMin > price || item.itemPriceMin < maxPrice - 1,
      );
    }

    if (
      boundary.high.min < price &&
      boundary.high.max < price &&
      boundary.high.max < maxPrice
    ) {
      high.filter(
        (item) => item.itemPriceMin > price || item.itemPriceMin < maxPrice - 1,
      );
    }
  });
};
//리스트 > 출력 개수 변경시
export const onChangeOffsetCount = (
  event: ChangeEvent<HTMLSelectElement>,
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
  total: number,
) => {
  //변경 할 출력 갯수
  const limit = Number(event.target.value);
  if (limit && _state.page && _state.limit) {
    const oldOffset = _state.page * _state.limit;
    const newOffset = _state.page * limit;
    let goPage;
    if (oldOffset < newOffset) {
      goPage = Math.ceil(oldOffset / limit);
    } else {
      if (Math.ceil(total / limit) < Math.ceil(oldOffset / limit)) {
        // 총 페이지 갯수
        goPage = Math.ceil(total / limit);
      } else {
        goPage = Math.ceil(oldOffset / limit);
      }
    }

    _getReportList(<TGetReportList>{
      _state: {
        page: goPage,
        limit: limit,
      },
      _dispatch,
    });
  }
};

// 상세페이지 > 스크롤 시 상단 헤더 내용 변경
export const onScrollDetail = (
  event: React.UIEvent<HTMLElement>,
  _dispatch: Dispatch<TReportAction>,
  main: KeywordInfo,
): void => {
  const scrollTop = (event.target as HTMLElement).scrollTop;
  updateTitle(scrollTop, _dispatch, main.text);
};

export const selectSalePriceCompetitionType = (
  focus: GRADE_TYPE,
  _dispatch: Dispatch<TReportAction>,
) => {
  _dispatch({ type: REPORT_ACTION.FOCUS_ITEMS, payload: { focus: focus } });
};

export const convertGrade = (item: GRADE_ITEMS) => {
  switch (item) {
    case GRADE_ITEMS.HIGH:
      return '높은';
    case GRADE_ITEMS.HIGH:
      return '보통';
    default:
      return '낮은';
  }
};
