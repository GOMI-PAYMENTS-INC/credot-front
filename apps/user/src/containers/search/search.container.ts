import { SEARCH_ACTION, searchInitialState } from '@/containers/search';
import { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { CACHING_KEY, MODAL_TYPE_ENUM, STATUS_CODE } from '@/types/enum.code';
import { UseFormSetValue } from 'react-hook-form';
import { postCreateReport, getReportExisted } from '@/containers/search/search.api';
import { toast } from 'react-toastify';
import { useSessionStorage } from '@/utils/useSessionStorage';
import {
  _amplitudeKeywordReportRequested,
  _amplitudeKeywordSearched,
} from '@/amplitude/amplitude.service';
import { CountryType } from '@/generated/graphql';

export const queryKeywordByClick = (
  country: CountryType,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
  setValue: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>,
) => {
  if (keyword) _dispatch({ type: SEARCH_ACTION.INITIALIZE_IMAGES, payload: keyword });
  setValue('keyword', keyword);
  _dispatch({ type: SEARCH_ACTION.GET_KEYWORD, payload: keyword });
  _dispatch({
    type: SEARCH_ACTION.SEARCH_KEYWORD,
    payload: { keyword: keyword, country: country },
  });
};

export const queryKeyword = (
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const _switch = isFalsy(keyword) === false;

  if (_switch === false) {
    toast.error('리포트를 생성할 키워드를 입력해주세요.');
  }
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.STORED_KEYWORD);

  if (
    isFalsy(preKeyword) === false &&
    keyword === preKeyword.keyword &&
    country === preKeyword.country
  ) {
    toast.success(`${keyword}에 대한 키워드 정보에요`);
  }
  _dispatch({ type: SEARCH_ACTION.GET_KEYWORD, payload: keyword.toLowerCase() });
  _dispatch({ type: SEARCH_ACTION.INITIALIZE_IMAGES, payload: keyword });
  _dispatch({ type: SEARCH_ACTION.SEARCH_MODE, payload: _switch });
  _dispatch({
    type: SEARCH_ACTION.SEARCH_KEYWORD,
    payload: { country: country },
  });

  _amplitudeKeywordSearched(country, sortBy, keyword);
};

export const initializeState = (
  cachingData: TSearchState,
  _dispatch: Dispatch<TSearchActionType>,
  setValue: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>,
) => {
  setValue('country', cachingData.country);
  setValue('keyword', cachingData.text);
  setValue('sortBy', cachingData.sortBy);

  _dispatch({ type: SEARCH_ACTION.INITIALIZE_STATE, payload: cachingData });
};

export const isSearched = (_dispatch: Dispatch<TSearchActionType>, status: boolean) => {
  _dispatch({ type: SEARCH_ACTION.SEARCH_MODE, payload: status });
};

type TSwitchModal = {
  _dispatch: Dispatch<TSearchActionType>;
  _setTrigger: Dispatch<SetStateAction<boolean>>;
  data?: any; // FIXME: any -> 타입으로 변경
  _state?: TSearchState;
};

type TCreateReport = {
  _dispatch: Dispatch<TSearchActionType>;
  _setTrigger: Dispatch<SetStateAction<boolean>>;
  data: any; // FIXME: any -> 타입으로 변경
  _state: TSearchState;
};

const dailyChecker = (isDaily: boolean) => {
  return isDaily
    ? MODAL_TYPE_ENUM.NotBeOverDayReport
    : MODAL_TYPE_ENUM.SameKeywordReportExisted;
};

const createReport = async ({ _state, data, _dispatch, _setTrigger }: TCreateReport) => {
  //FIXME: 조건문이 너무 많음 리펙터링 필요
  const { reportInvokeId, main } = data;
  const { keyword, country, sortBy } = _state;

  try {
    if (_state.isModalOpen === false) {
      const res = await getReportExisted({
        country: country,
        sortBy: sortBy,
        text: keyword,
      });
      // 만든 기록이 있는 경우
      const reportInfo = res?.data;

      //FIXME: 요청과 재요청 로직 줄일 수 있는 방법 생각하기
      //이전에 만들어 진적 있는 경우
      if (reportInfo?.data !== null && reportInfo?.data !== undefined) {
        // 최근 24시간 이내 동일한 리포트 or 이전 발행된 기록이 있는 리포트
        const { isDaily, createdAt } = reportInfo.data;
        if (isDaily) {
          _dispatch({
            type: SEARCH_ACTION.SWITCH_MODAL,
            payload: { isModalOpen: true, modalType: MODAL_TYPE_ENUM.NotBeOverDayReport },
          });
          return;
        } else {
          _dispatch({
            type: SEARCH_ACTION.SWITCH_MODAL,
            payload: {
              isModalOpen: true,
              modalType: MODAL_TYPE_ENUM.SameKeywordReportExisted,
            },
          });
          _dispatch({ type: SEARCH_ACTION.UPDATE_CREATED_AT, payload: createdAt });

          return;
        }
      }

      if (isFalsy(main.count) || main.count! < 300) {
        _dispatch({
          type: SEARCH_ACTION.SWITCH_MODAL,
          payload: {
            isModalOpen: true,
            modalType: MODAL_TYPE_ENUM.LessMonthlyKeywordVolume,
          },
        });
        return;
      }
    }

    const postReport = await postCreateReport({
      reportInvokeId: reportInvokeId,
      country: country,
      sortBy: sortBy,
    });

    if (postReport?.data.code === STATUS_CODE.SUCCESS) {
      _setTrigger(false);

      _dispatch({
        type: SEARCH_ACTION.SWITCH_MODAL,
        payload: {
          isModalOpen: true,
          modalType: MODAL_TYPE_ENUM.MakeReportSuccesses,
        },
      });
      _amplitudeKeywordReportRequested(1, country, sortBy, keyword);
    }

    return postReport;
  } catch (error) {
    console.error(error);
  }
};

export const switchModal = async ({
  _dispatch,
  _state,
  data,
  _setTrigger,
}: TSwitchModal) => {
  if (_state) {
    return await createReport({ _state, _dispatch, data, _setTrigger });
  }

  _setTrigger(false);

  _dispatch({
    type: SEARCH_ACTION.SWITCH_MODAL,
    payload: { isModalOpen: false },
  });
};

export const _getProductImages = (
  data: TGetProductImageResponseType,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  _dispatch({
    type: SEARCH_ACTION.GET_PRODUCT_IMAGES,
    payload: data,
  });
};

export const initializeImages = (
  _dispatch: Dispatch<TSearchActionType>,
  keyword: string,
) => _dispatch({ type: SEARCH_ACTION.INITIALIZE_IMAGES, payload: keyword });
