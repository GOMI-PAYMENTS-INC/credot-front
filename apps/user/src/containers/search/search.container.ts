import { SearchAction } from '@/containers/search';
import { ChangeEvent, KeyboardEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { STATUS_CODE } from '@/types/enum.code';
import { MODAL_TYPE_ENUM } from '@/pages/search/SearchModal';
import { postCreateReport, getReportExisted } from '@/containers/search/search.api';
import { toast } from 'react-toastify';
import {
  _keywordReportKeywordReportRequested,
  _keywordReportKeywordSearched,
  _keywordReportRecKeywordSearched,
} from '@/amplitude/amplitude.service';

export const getKeyword = (
  event: ChangeEvent<HTMLInputElement>,
  _dispatch: Dispatch<TAction>,
): void => {
  const { value } = event.target;

  _dispatch({ type: SearchAction.GetKeyword, payload: value });
};

//추천 키워드를 눌러서 키워드 검색한 경우
export const queryKeywordByClick = (text: string, _dispatch: Dispatch<TAction>) => {
  if (text) _dispatch({ type: SearchAction.InitialIizeImages, payload: text });
  _dispatch({ type: SearchAction.GetKeyword, payload: text });
  _dispatch({ type: SearchAction.SearchKeyword, payload: text });

  //앰플리튜드 이벤트 - 검색어로 추천된 키워드를 클릭해서 검색 시도 시
  _keywordReportRecKeywordSearched(text);
};

//input text에 검색어를 적고 검색한 경우
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
  if (_switch === false) {
    toast.error('리포트를 생성할 키워드를 입력해주세요.');
  }
  _dispatch({ type: SearchAction.InitialIizeImages, payload: text });
  _dispatch({ type: SearchAction.SearchMode, payload: _switch });
  _dispatch({ type: SearchAction.SearchKeyword });

  //앰플리튜드 이벤트 - 사용자가 키워드 검색 요청 시
  _keywordReportKeywordSearched(text);
};

export const initializeState = (sessionStorage: any, _dispatch: Dispatch<TAction>) => {
  _dispatch({ type: SearchAction.InitializeState, payload: sessionStorage });
};

export const isSearched = (_dispatch: Dispatch<TAction>, status: boolean) => {
  _dispatch({ type: SearchAction.SearchMode, payload: status });
};

type TSwitchModal = {
  _dispatch: Dispatch<TAction>;
  _setTrigger: Dispatch<SetStateAction<boolean>>;
  data?: any; // FIXME: any -> 타입으로 변경
  _state?: TState;
};

type TCreateReport = {
  _dispatch: Dispatch<TAction>;
  _setTrigger: Dispatch<SetStateAction<boolean>>;
  data: any; // FIXME: any -> 타입으로 변경
  _state: TState;
};

const dailyChecker = (isDaily: boolean) => {
  return isDaily
    ? MODAL_TYPE_ENUM.NotBeOverDayReport
    : MODAL_TYPE_ENUM.SameKeywordReportExisted;
};

const createReport = async ({ _state, data, _dispatch, _setTrigger }: TCreateReport) => {
  //FIXME: 조건문이 너무 많음 리펙터링 필요
  const { reportInvokeId } = data;
  const { keyword, country } = _state;
  const actionType = SearchAction.SwitchModal;
  try {
    if (_state.isModalOpen === false) {
      const res = await getReportExisted({ text: keyword });
      // 리포트가 없을 경우
      const reportInfo = res?.data;

      //FIXME: 요청과 재요청 로직 줄일 수 있는 방법 생각하기
      if (reportInfo?.data === null || reportInfo?.data === undefined) {
        const postReport = await postCreateReport({
          reportInvokeId: reportInvokeId,
          country: country,
        });

        if (postReport?.data.code === STATUS_CODE.SUCCESS) {
          _setTrigger(false);

          _dispatch({
            type: actionType,
            payload: {
              isModalOpen: false,
            },
          });
          toast.success(`'${keyword}'리포트 생성을 시작할께요.(최대 24시간 소요)`, {
            autoClose: 4000,
          });

          //앰플리튜드 이벤트 - 키워드 리포트 생성 요청 시
          _keywordReportKeywordReportRequested(1, keyword);
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
      toast.success(`'${keyword}'리포트 생성을 시작할께요.(최대 24시간 소요)`, {
        autoClose: 4000,
      });
    }

    return postReport;
  } catch (error) {
    console.error(error);
  }
};

export const switchModal = ({ _dispatch, _state, data, _setTrigger }: TSwitchModal) => {
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

    return createReport({ _state, _dispatch, data, _setTrigger });
  }

  _setTrigger(false);

  _dispatch({
    type: SearchAction.SwitchModal,
    payload: { isModalOpen: false },
  });
};

export const getProductImages = (
  data: TGetProductImageResponseType,
  _dispatch: Dispatch<TAction>,
) => {
  _dispatch({
    type: SearchAction.GetProductImages,
    payload: data,
  });
};

export const initializeImages = (_dispatch: Dispatch<TAction>, keyword: string) =>
  _dispatch({ type: SearchAction.InitialIizeImages, payload: keyword });
