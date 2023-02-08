import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';
import { ActionKind } from '@/containers/search';
import { ChangeEvent, KeyboardEvent, Dispatch, MouseEvent } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { HTTP, defaultOptions } from '@/utils/axiosConfig';
import { snakeize } from 'casing';
import { MODAL_TYPE_ENUM } from '@/pages/search/UseModal';

export const getKeyword = (
  event: ChangeEvent<HTMLInputElement>,
  _dispatch: Dispatch<TAction>,
): void => {
  const { value } = event.target;
  _dispatch({ type: ActionKind.GetKeyword, payload: value });
};

export const queryKeywordByClick = (text: string, _dispatch: Dispatch<TAction>) => {
  _dispatch({ type: ActionKind.GetKeyword, payload: text });
  _dispatch({ type: ActionKind.SearchKeyword, payload: text });
};

export const queryKeyword = (
  text: string,
  _dispatch: Dispatch<TAction>,
  event: KeyboardEvent | MouseEvent,
) => {
  if (event.type === 'keydown') {
    const { key } = event as KeyboardEvent;
    if (key !== 'Enter') return;
  }
  const _switch = isFalsy(text) === false;

  _dispatch({ type: ActionKind.SwitchMode, payload: _switch });
  _dispatch({ type: ActionKind.SearchKeyword });
};

export const initializeState = (window: Window, _dispatch: Dispatch<TAction>) => {
  _dispatch({ type: ActionKind.InitializeState, payload: window.store });
};

export const switchMode = (_dispatch: Dispatch<TAction>, status: boolean) => {
  _dispatch({ type: ActionKind.SwitchMode, payload: status });
};

export const switchModal = (
  _dispatch: Dispatch<TAction>,
  status: boolean,
  data?: any,
) => {
  // 검색량 300 미만
  const actionType = ActionKind.SwitchModal;
  console.log(data, 'data');
  if (status && data && data.main.count < 300) {
    _dispatch({
      type: actionType,
      payload: {
        isModalOpen: status,
        modalType: MODAL_TYPE_ENUM.LessMonthlyKeywordVolumn,
      },
    });
    return;
  }
  _dispatch({ type: actionType, payload: { isModalOpen: status } });
  // createReport
};

export const GetQueryResult = (keyword: string) => {
  const { data, isLoading, isError } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      text: keyword,
    },
    {
      enabled: isFalsy(keyword) === false,
      refetchOnWindowFocus: false,
    },
  );
  const response = data?.search;
  return [response, isLoading, isError];
};

const REPORT_URL = 'api/v1/report';
export const createReport = (params: TCreateReportParamsType) => {
  HTTP.post(REPORT_URL, { ...defaultOptions, params: snakeize({ report: params }) });
};
