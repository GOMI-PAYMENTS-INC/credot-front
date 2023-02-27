import { Dispatch } from 'react';
import {
  deleteReportList,
  getMainReport,
  getRelationReport,
  getSalePrice,
} from './report.api';
import {
  REPORT_ACTION,
  TReportAction,
  REPORT_LIST_ACTION,
} from '@/containers/report/report.reducer';
import { TITLE } from '@/types/enum.code';

import { getReportList } from '@/containers/report/report.api';
import { STATUS_CODE } from '@/types/enum.code';

import { TAG_SENTIMENT_STATUS, BATCH_STATUS } from '@/types/enum.code';
import { convertBatchStatus } from '@/utils/convertEnum';
import { toast } from 'react-toastify';
import { isFalsy } from '@/utils/isFalsy';

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
  if (curLocation > 250 && curLocation < 489) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.MARTKET_SIZE });
  }
  if (curLocation > 490 && curLocation < 939) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.KEYWORD_INFO });
  }
  // if (curLocation > 940 && curLocation < 1034) {
  //   _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.KEYWORD_INFO });
  // }
  if (curLocation > 940) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.RECOMMEND_KEYWORD });
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

type TGetReportList = {
  _dispatch: Dispatch<TReportListAction>;
  _state: TReportListState;
};

export const _getReportList = async ({ _state, _dispatch }: TGetReportList) => {
  try {
    const res = await getReportList({
      page: _state.page,
      limit: _state.limit,
    });
    const reportInfo = res?.data;
    //FIXME: 요청과 재요청 로직 줄일 수 있는 방법 생각하기
    if (reportInfo?.code === STATUS_CODE.SUCCESS) {
      _state.data = reportInfo.data;
      _dispatch({ type: REPORT_LIST_ACTION.GetReportList, payload: _state });
    }

    return reportInfo;
  } catch (error) {
    console.error(error);
  }
};

export const scrollToTop = (_dispatch: Dispatch<TReportAction>) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  _dispatch({ type: REPORT_ACTION.INITIALIZE_SCROLL_EVENT });
};

export const reportListConverter = (item: TReportItem) => {
  const result = {
    status: {
      text: convertBatchStatus(item.status),
      sentiment: TAG_SENTIMENT_STATUS.ATTENTIVE,
    },
    countryCode: {
      text: convertBatchStatus(item.countryCode),
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

      //선택된 체크박스 목록 비우기
      setCheckedItems([]);

      //목록 다시 불러오기
      _getReportList({ _state: _state, _dispatch }).then(() => {});

      //토스트 알림
      toast.success(`리포트를 삭제했어요.`);
    } else {
      toast.error(`리포트를 삭제할 수 없습니다.`);
    }
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

//리포트 목록 삭제 확인 confirm 모달 상태 변경
export const switchDeleteModal = (
  _dispatch: Dispatch<TReportListAction>,
  isOpen: boolean,
) => {
  _dispatch({
    type: REPORT_LIST_ACTION.DeleteReport,
    payload: {
      isDeleteConfirmModalOpen: isOpen,
    },
  });
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

  return fixedNumber;
};

export const delayEvent = (callback: () => void, time: number) => {
  setTimeout(() => {
    callback();
  }, time);
};

export const buttonSpinnerEvent = (_dispatch: Dispatch<TReportAction>) => {
  _dispatch({ type: REPORT_ACTION.SPINNER_EVENT });
};
