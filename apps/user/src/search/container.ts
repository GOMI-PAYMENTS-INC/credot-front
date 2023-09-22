import { SEARCH_ACTION, searchInitialState } from '@/search/reducer';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { CACHING_KEY } from '@/types/enum.code';

import { UseFormSetValue } from 'react-hook-form';
import { SEARCH_STATE_INIT_VALUE } from '@/search/constants';
import { toast } from 'react-toastify';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { getHotKeywords } from '@/search/api';

import {
  _amplitudeKeywordSearched,
  _amplitudeKeywordReportRequested,
  _amplitudeMovedToSERP,
  _amplitudeCountryChanged,
  _amplitudeSortByChanged,
} from '@/amplitude/amplitude.service';
import { CountryType } from '@/generated/graphql';

import { createJobId } from '@/utils/createJobId';
import { MODAL_TYPE_ENUM, STATUS_CODE } from '@/types/enum.code';
import type { SetterOrUpdater } from 'recoil';
import { getReportExisted, postCreateReport } from '@/search/api';
import { _getSubscription } from '@/common/container';

type TSeachPayloadInType = TSearchPayload & {
  setSubscription: SetterOrUpdater<TGetSubscriptionResponse | null>;
};

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

export const convertSearchPlaceholder = (country: CountryType) => {
  switch (country) {
    case CountryType.SG:
      return 'shampoo';
    case CountryType.MY:
      return 'phone charger';
    case CountryType.TW:
      return '馬克杯收納';
    case CountryType.VN:
      return 'gấu bông';
    case CountryType.TH:
      return 'มะม่วงอบแห้ง';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

const isNotSamePayload = (prePayload: ReactNode, newPayload: ReactNode) => {
  if (isFalsy(prePayload)) return true;
  return prePayload === newPayload ? false : true;
};

const isDiffKeyword = (_state: TSearchProps, preKeyword: TSearchProps) => {
  if (
    isFalsy(preKeyword) === false &&
    _state.keyword === preKeyword.keyword &&
    _state.country === preKeyword.country &&
    _state.sortBy === preKeyword.sortBy
  ) {
    toast.success(`${_state.keyword}에 대한 키워드 정보에요`);
    return false;
  }
  return true;
};

export const updateSearchPayload = (props: {
  _state: TSearchProps;
  _dispatch: Dispatch<SetStateAction<TSearchProps>>;
  key: keyof TSearchProps;
  params: TSearchCountry | TSortBy | string | TProductImageType | null;
  calledByEvent?: boolean;
}) => {
  const { _state, _dispatch, params, key, calledByEvent } = props;
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.STORED_KEYWORD);
  const updatedState = Object.assign({}, _state, { [key]: params });

  if (calledByEvent && isDiffKeyword(_state, updatedState) === false) return; // 키워드가 같을 경우 이벤트 실행 무효

  if (key === 'keyword' && isNotSamePayload(preKeyword?.keyword, params as string)) {
    useSessionStorage.setItem(CACHING_KEY.STORED_KEYWORD, updatedState);
    _amplitudeKeywordSearched(_state.country, _state.sortBy, params as string);
  }
  if (
    key === 'country' &&
    isNotSamePayload(preKeyword?.country, params as TSearchCountry)
  ) {
    useSessionStorage.setItem(CACHING_KEY.STORED_KEYWORD, updatedState);
    _amplitudeCountryChanged(_state.country, params as TSearchCountry);
  }
  if (key === 'sortBy' && isNotSamePayload(preKeyword?.sortBy, params as TSortBy)) {
    useSessionStorage.setItem(CACHING_KEY.STORED_KEYWORD, updatedState);
    _amplitudeSortByChanged(_state.sortBy, params as TSortBy);
  }
  if (key === 'images' && preKeyword === null) {
    useSessionStorage.setItem(CACHING_KEY.STORED_KEYWORD, updatedState);
  }

  _dispatch(updatedState);
};

export const initailizeSearchProps = (
  _dispatch: Dispatch<SetStateAction<TSearchProps>>,
) => _dispatch(SEARCH_STATE_INIT_VALUE);

const updateModalType =
  (_dispatch: Dispatch<SetStateAction<TNSearchModalStatus>>) =>
  (type: TNSearchModalStatus) => {
    _dispatch(type);
  };

const requestReport = async (props: TSeachPayloadInType) => {
  const {
    _modalState: { modalType },
    parameter,
    _modalDispatch,
    _state,
  } = props;
  const { keyword, country, sortBy } = _state;
  const { count } = parameter;
  const updateModal = updateModalType(
    _modalDispatch as Dispatch<SetStateAction<TNSearchModalStatus>>,
  );
  try {
    if (modalType === '') {
      const res = await getReportExisted({
        country: country,
        sortBy: sortBy,
        text: keyword,
      });

      const reportInfo = res?.data;

      if (isFalsy(reportInfo?.data) === false) {
        const { isDaily, createdAt } = reportInfo!.data!;
        if (isDaily) {
          updateModal({ modalType: MODAL_TYPE_ENUM.NotBeOverDayReport, isOpen: true });
        } else {
          updateModal({
            modalType: MODAL_TYPE_ENUM.SameKeywordReportExisted,
            response: createdAt,
            isOpen: true,
          });
        }
        return;
      }

      if (isFalsy(count) || count! < 300) {
        updateModal({
          modalType: MODAL_TYPE_ENUM.LessMonthlyKeywordVolume,
          isOpen: true,
        });

        return;
      }
    }
    return await createReport({ ...props });
  } catch (error) {
    console.error(error);
  }
};

const createReport = async (props: TSeachPayloadInType) => {
  const {
    parameter: { reportInvokeId },
    _modalDispatch,
    _state,
    setSubscription,
  } = props;

  const { keyword, country, sortBy } = _state;
  const jobId = createJobId();
  if (isFalsy(reportInvokeId)) throw new Error('리포트 생성 로직에 문제가 있습니다.');
  try {
    const postReport = await postCreateReport({
      reportInvokeId: reportInvokeId!,
      country: country,
      sortBy: sortBy,
      jobId: jobId,
    });

    if (postReport?.code === STATUS_CODE.SUCCESS) {
      const { isSendSms, reportId } = postReport?.data;
      if (isSendSms) {
        _modalDispatch({
          modalType: MODAL_TYPE_ENUM.MakeReportSuccesses,
          data: reportId,
          isOpen: true,
        });
      } else {
        _modalDispatch({
          modalType: MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses,
          data: reportId,
          isOpen: true,
        });
      }
      _getSubscription(setSubscription);
      _amplitudeKeywordReportRequested(reportId, country, sortBy, keyword, jobId);
    }
  } catch (error) {
    console.error(error);
  }
};

export const searchRequestHandler = (props: TSeachPayloadInType) => {
  if (props._modalState.isOpen) requestReport({ ...props });
};

export const storeHotKeyords = async (
  setHotKeywords: Dispatch<SetStateAction<THotKeywords[]>>,
) => {
  try {
    const response = await getHotKeywords();
    const storedCountryCode =
      useSessionStorage.getItem(CACHING_KEY.STORED_KEYWORD)?.country || 'SG';
    if (response) {
      useSessionStorage.setItem(CACHING_KEY.HOT_KEYWORDS, response);
      const _state = response.hotKeywords.find(
        (country) => country.countryCode === storedCountryCode,
      )!.value;
      setHotKeywords(_state);
    }
  } catch (error) {
    throw new Error('인기검색어 저장 과정에서 에러가 발생했습니다.');
  }
};

export const switchHotKeyword = (
  country: TSearchCountry,
  setHotKeywords: Dispatch<SetStateAction<THotKeywords[]>>,
) => {
  const ITEM = sessionStorage.getItem(CACHING_KEY.HOT_KEYWORDS);
  if (isFalsy(ITEM)) throw new Error('인기 검색어에 문제가 있습니다.');

  const response = JSON.parse(ITEM!) as TGetKeywordsReponse;
  const _state = response.hotKeywords.find((item) => item.countryCode === country)!.value;
  setHotKeywords(_state);
};
