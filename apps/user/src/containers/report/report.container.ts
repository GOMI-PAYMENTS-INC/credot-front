import { Dispatch } from 'react';
import { deleteReportList, getMainReport, getRelationReport } from './report.api';
import {
  REPORT_ACTION,
  TReportAction,
  ReportListActionKind,
} from '@/containers/report/report.reducer';
import { TITLE } from '@/types/enum.code';

import { getReportList } from '@/containers/report/report.api';
import { STATUS_CODE } from '@/types/enum.code';

import { TAG_SENTIMENT_STATUS, BATCH_STATUS } from '@/types/enum.code';
import { convertBatchStatus } from '@/utils/convertEnum';
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
    default:
      return id;
  }
};

export const _getReportInfo = async (id: string, _dispatch: Dispatch<TReportAction>) => {
  try {
    const response = await Promise.all([getMainReport(id), getRelationReport(id)]);
    response.forEach((chunk, idx) => {
      if (chunk) {
        const type = idx === 0 ? 'main' : 'relation';
        const { data } = chunk.data;
        _dispatch({
          type: REPORT_ACTION.INITIALIZE_DATA,
          payload: { type: type, data: data },
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
      _dispatch({ type: ReportListActionKind.GetReportList, payload: _state });
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

export const _deleteReportList = async (ids: number[]) => {
  try {
    const response = await deleteReportList({
      ids: ids,
    });
    if (response?.data) {
      const { data } = response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteReports = (
  checkedItems: number[],
  _dispatch: Dispatch<TReportListAction>,
) => {
  if (checkedItems.length) {
    console.log(checkedItems);
    _deleteReportList(checkedItems).then((res) => {
      console.log('결과나옴!');
      console.log('@@', res);
      const result = res?.data;
      if (result?.data.code === STATUS_CODE.SUCCESS) {
        _dispatch({
          type: ReportListActionKind.DeleteReport,
          payload: {
            data: result,
          },
        });
        toast.success(`리포트를 삭제했어요.`, {
          autoClose: 4000,
        });
      }
    });
  } else {
    toast.warn('리포트를 선택해주세요.');
  }
};

export const roundNumber = (number: number) => {
  const fixedNumber = number.toFixed(1);
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
