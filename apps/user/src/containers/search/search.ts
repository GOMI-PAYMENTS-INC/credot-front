import { CountryType, useSearchQuery, SearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';
import { ActionKind } from '@/containers/search';
import { ChangeEvent, KeyboardEvent, Dispatch, MouseEvent } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { HTTP, defaultOptions } from '@/utils/axiosConfig';
import { snakeize } from 'casing';
import { MODAL_TYPE_ENUM } from '@/pages/search/SearchModal';
import { toast } from 'react-toastify';

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

type TSwitchModal = {
  _dispatch: Dispatch<TAction>;
  data?: any; // FIXME: any -> 타입으로 변경
  _state?: TState;
};
export const switchModal = ({ _dispatch, _state, data }: TSwitchModal) => {
  const actionType = ActionKind.SwitchModal;
  if (_state) {
    const { main, reportInvokeId } = data;
    const { text, country } = _state;

    if (_state.isModalOpen === false && (isFalsy(main.count) || main.count! < 300)) {
      _dispatch({
        type: actionType,
        payload: {
          isModalOpen: true,
          modalType: MODAL_TYPE_ENUM.LessMonthlyKeywordVolumn,
        },
      });
      return;
    }
    // _dispatch({ type: actionType, payload: { isModalOpen: true } });
    createReport({ reportInvokeId: reportInvokeId, country: country }, text, _dispatch);
    return;
  }
  _dispatch({
    type: actionType,
    payload: {
      isModalOpen: false,
    },
  });
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
export const createReport = async (
  params: TCreateReportParamsType,
  text: string,
  _dispatch: Dispatch<TAction>,
) => {
  console.log({ params: snakeize({ report: params }) }, 'payload');
  _dispatch({
    type: ActionKind.SwitchModal,
    payload: { isModalOpen: false },
  });
  toast.success(`'${text}'가 리포트 조회 탭에 추가되었어요.`, { autoClose: 4000 });

  // try {
  //   const res = await HTTP.post(REPORT_URL, {
  //     ...defaultOptions,
  //     params: snakeize({ report: params }),
  //   });
  //   console.log(res);
  //   toast(`'${text}'가 리포트 조회 탭에 추가되었어요.`);
  // } catch (error) {
  //   console.error(error, 'error');
  // }
};
