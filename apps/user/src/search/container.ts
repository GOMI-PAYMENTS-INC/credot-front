import { SEARCH_ACTION, searchInitialState } from '@/search/reducer';
import type { Dispatch, SetStateAction, RefObject } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { CACHING_KEY, MODAL_TYPE_ENUM, STATUS_CODE } from '@/types/enum.code';
import { UseFormSetValue } from 'react-hook-form';
import { getReportExisted, postCreateReport } from '@/search/api';
import { toast } from 'react-toastify';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { scrollController } from '@/utils/scrollController';
import {
  _amplitudeKeywordReportRequested,
  _amplitudeKeywordSearched,
} from '@/amplitude/amplitude.service';
import { CountryType } from '@/generated/graphql';

export const queryKeywordByClick = (
  country: keyof typeof CountryType,
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
    return;
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

  //sortBy가 세션에 없던 이전 버전 대응
  if (isFalsy(cachingData.sortBy)) {
    cachingData.sortBy = searchInitialState.sortBy;
  }
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

    const makeJobId = () => {
      const prefix = 'cr_report_';
      const makeDateFormat = (number: number) => (number >= 10 ? number : '0' + number);

      const date = new Date();
      const yy = date.getFullYear() % 100;
      const MM = date.getMonth() + 1;
      const dd = date.getDate();
      const hh = date.getHours();
      const mm = date.getMinutes();
      const ss = date.getSeconds();

      const convertDateArray = [MM, dd, hh, mm, ss];
      const convertDateResult = convertDateArray.reduce(
        (previousValue, currentValue, currentIndex, array) =>
          previousValue + makeDateFormat(currentValue),
        '',
      );
      return prefix + String(yy) + convertDateResult;
    };

    const postReport = await postCreateReport({
      reportInvokeId: reportInvokeId,
      country: country,
      sortBy: sortBy,
      jobId: makeJobId(),
    });

    if (postReport?.data.code === STATUS_CODE.SUCCESS) {
      _setTrigger(false);

      const { isSendSms, reportId } = postReport?.data.data;
      if (isSendSms) {
        _dispatch({
          type: SEARCH_ACTION.SWITCH_MODAL,
          payload: {
            isModalOpen: true,
            modalType: MODAL_TYPE_ENUM.MakeReportSuccesses,
          },
        });
      } else {
        _dispatch({
          type: SEARCH_ACTION.SWITCH_MODAL,
          payload: {
            isModalOpen: true,
            modalType: MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses,
          },
        });
      }
      _dispatch({ type: SEARCH_ACTION.SET_NEW_REPORT_ID, payload: reportId });

      _amplitudeKeywordReportRequested(reportId, country, sortBy, keyword, makeJobId());
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
  data: TGetProductImageResponse,
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

export const scrollToTop = (scrollInfo: RefObject<HTMLDivElement>) => {
  scrollController(scrollInfo, 0, 0, 'smooth');
};
