import { SEARCH_ACTION } from '@/containers/search';
import { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { COUNTRY_TYPE, MODAL_TYPE_ENUM, STATUS_CODE } from '@/types/enum.code';
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
    keyword: string;
  }>,
) => {
  if (keyword) _dispatch({ type: SEARCH_ACTION.INITIALIZE_IMAGES, payload: keyword });
  setValue('country', country);
  setValue('keyword', keyword);
  _dispatch({ type: SEARCH_ACTION.GET_KEYWORD, payload: keyword });
  _dispatch({
    type: SEARCH_ACTION.SEARCH_KEYWORD,
    payload: { keyword: keyword, country: country },
  });
};

export const queryKeyword = (
  country: CountryType,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const _switch = isFalsy(keyword) === false;

  if (_switch === false) {
    toast.error('리포트를 생성할 키워드를 입력해주세요.');
  }
  const preKeyword = useSessionStorage.getItem('keyword');

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

  _amplitudeKeywordSearched(country, keyword);
};

export const initializeState = (
  cachingData: TSearchState,
  _dispatch: Dispatch<TSearchActionType>,
  setValue: UseFormSetValue<{
    country: CountryType;
    keyword: string;
  }>,
) => {
  setValue('keyword', cachingData.text);
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
  const { reportInvokeId } = data;
  const { keyword, country } = _state;
  const actionType = SEARCH_ACTION.SWITCH_MODAL;
  try {
    if (_state.isModalOpen === false) {
      const res = await getReportExisted({ country: country, text: keyword });
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
          toast.success(`'${keyword}'리포트 생성을 시작할께요.(최대 24시간 소요)`);
          _amplitudeKeywordReportRequested(1, country, keyword);
        }

        return postReport;
      }

      const { isDaily, createdAt } = reportInfo.data;

      _dispatch({
        type: actionType,
        payload: { isModalOpen: true, modalType: dailyChecker(isDaily) },
      });

      _dispatch({ type: SEARCH_ACTION.UPDATE_CREATED_AT, payload: createdAt });

      return res;
    }

    const postReport = await postCreateReport({
      reportInvokeId: reportInvokeId,
      country: country,
    });

    if (postReport?.data.code === STATUS_CODE.SUCCESS) {
      _dispatch({
        type: SEARCH_ACTION.SWITCH_MODAL,
        payload: {
          isModalOpen: false,
        },
      });
      toast.success(`'${keyword}'리포트 생성을 시작할께요.(최대 24시간 소요)`);
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
        type: SEARCH_ACTION.SWITCH_MODAL,
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
