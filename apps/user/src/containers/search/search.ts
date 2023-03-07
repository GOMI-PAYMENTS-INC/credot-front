import { SearchAction } from '@/containers/search';
import { ChangeEvent, KeyboardEvent, Dispatch, MouseEvent } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { STATUS_CODE } from '@/types/enum.code';
import { MODAL_TYPE_ENUM } from '@/pages/search/SearchModal';
import { postCreateReport, getReportExisted } from '@/containers/search/search.api';
import { toast } from 'react-toastify';

export const getKeyword = (
  event: ChangeEvent<HTMLInputElement>,
  _dispatch: Dispatch<TAction>,
): void => {
  const { value } = event.target;

  _dispatch({ type: SearchAction.GetKeyword, payload: value });
};

export const queryKeywordByClick = (text: string, _dispatch: Dispatch<TAction>) => {
  _dispatch({ type: SearchAction.GetKeyword, payload: text });
  _dispatch({ type: SearchAction.SearchKeyword, payload: text });
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

  _dispatch({ type: SearchAction.SearchMode, payload: _switch });
  _dispatch({ type: SearchAction.SearchKeyword });
};

export const initializeState = (sessionStorage: any, _dispatch: Dispatch<TAction>) => {
  _dispatch({ type: SearchAction.InitializeState, payload: sessionStorage });
};

export const isSearched = (_dispatch: Dispatch<TAction>, status: boolean) => {
  _dispatch({ type: SearchAction.SearchMode, payload: status });
};

type TSwitchModal = {
  _dispatch: Dispatch<TAction>;
  data?: any; // FIXME: any -> 타입으로 변경
  _state?: TState;
};

type TCreateReport = {
  _dispatch: Dispatch<TAction>;
  data: any; // FIXME: any -> 타입으로 변경
  _state: TState;
};

const dailyChecker = (isDaily: boolean) => {
  return isDaily
    ? MODAL_TYPE_ENUM.NotBeOverDayReport
    : MODAL_TYPE_ENUM.SameKeywordReportExisted;
};

const createReport = async ({ _state, data, _dispatch }: TCreateReport) => {
  //FIXME: 조건문이 너무 많음 리펙터링 필요
  const { reportInvokeId } = data;
  const { text, country } = _state;
  const actionType = SearchAction.SwitchModal;
  try {
    if (_state.isModalOpen === false) {
      const res = await getReportExisted({ text: text });
      // 리포트가 없을 경우
      const reportInfo = res?.data;
      //FIXME: 요청과 재요청 로직 줄일 수 있는 방법 생각하기
      if (reportInfo?.data === null || reportInfo?.data === undefined) {
        const postReport = await postCreateReport({
          reportInvokeId: reportInvokeId,
          country: country,
        });

        if (postReport?.data.code === STATUS_CODE.SUCCESS) {
          _dispatch({
            type: actionType,
            payload: {
              isModalOpen: false,
            },
          });
          toast.success(`'${text}'가 리포트 조회 탭에 추가되었어요.`, {
            autoClose: 4000,
          });
        }
        return postReport;
      }

      const { isDaily, createdAt } = reportInfo.data;

      _dispatch({
        type: actionType,
        payload: { isModalOpen: true, modalType: dailyChecker(isDaily) },
      });

      _dispatch({ type: SearchAction.UpdateCreatedAt, payload: createdAt });

      return res;
    }

    const postReport = await postCreateReport({
      reportInvokeId: reportInvokeId,
      country: country,
    });
    if (postReport?.data.code === STATUS_CODE.SUCCESS) {
      _dispatch({
        type: SearchAction.SwitchModal,
        payload: {
          isModalOpen: false,
        },
      });
      toast.success(`'${text}'가 리포트 조회 탭에 추가되었어요.`, { autoClose: 4000 });
    }

    return postReport;
  } catch (error) {
    console.error(error);
  }
};

export const switchModal = ({ _dispatch, _state, data }: TSwitchModal) => {
  if (_state) {
    const { main } = data;
    if (_state.isModalOpen === false && (isFalsy(main.count) || main.count! < 300)) {
      _dispatch({
        type: SearchAction.SwitchModal,
        payload: {
          isModalOpen: true,
          modalType: MODAL_TYPE_ENUM.LessMonthlyKeywordVolumn,
        },
      });
      return;
    }

    return createReport({ _state, _dispatch, data });
  }
  _dispatch({
    type: SearchAction.SwitchModal,
    payload: { isModalOpen: false },
  });
};
