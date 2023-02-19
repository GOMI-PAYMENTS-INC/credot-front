import { useState, useLayoutEffect, Dispatch } from 'react';
import { getMainReport, getRelationReport } from './report.api';
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

export const _getMainReport = async (id: string, _dispatch: Dispatch<TReportAction>) => {
  try {
    const response = await getMainReport(id);
    if (response?.data) {
      const { data } = response.data;
      _dispatch({
        type: REPORT_ACTION.INITIALIZE_DATA,
        payload: { type: 'main', data: data },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const convertToDesc = () => {};

export const convertExachangeRate = (vnd: number, krw: number) => {
  return Math.floor((vnd / 100) * krw);
};

// Restrict value to be between the range [0, value]
const clamp = (value: number) => Math.max(0, value);

// Check if number is between two values
const isBetween = (value: number, floor: number, ceil: number) =>
  value >= floor && value <= ceil;

export const useScrollspy = (ids: string[], offset: number = 0) => {
  const [activeId, setActiveId] = useState('');

  useLayoutEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));

      setActiveId(position?.id || '');
    };

    listener();

    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  }, [ids, offset]);

  return activeId;
};

export const updateTitle = (
  curLocation: number,
  _dispatch: Dispatch<TReportAction>,
  name?: string,
) => {
  if (curLocation < 100) {
    _dispatch({ type: REPORT_ACTION.SCROLL_EVENT, payload: TITLE.REPORT });
    return;
  }
  if (curLocation > 100 && curLocation < 299) {
    _dispatch({ type: REPORT_ACTION.SCROLL_EVENT, payload: name });
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: '' });
  }
  if (curLocation > 299 && curLocation < 599) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.MARTKET_SIZE });
  }
  if (curLocation > 600) {
    _dispatch({ type: REPORT_ACTION.UPDATE_CURRENT, payload: TITLE.KEYWORD_INFO });
  }
};

export const isToggleOpen = (_dispatch: Dispatch<TReportAction>) => {
  _dispatch({ type: REPORT_ACTION.TOGGLE_CONTROL });
};

type TGetReportList = {
  _dispatch: Dispatch<TReportListAction>;
  _state: TReportListState;
};

export const setReportList = async ({ _state, _dispatch }: TGetReportList) => {
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
