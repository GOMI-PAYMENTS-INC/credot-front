import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';

import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate } from '@/report/container';
import { roundNumber } from '@/report/container';
import { CountryType } from '@/generated/graphql';
import { Dispatch, SetStateAction } from 'react';
import { SEARCH_ACTION } from '@/search/reducer';

import { createJobId } from '@/utils/createJobId';
import { isFalsy } from '@/utils/isFalsy';
import { MODAL_TYPE_ENUM, STATUS_CODE } from '@/types/enum.code';
import { getReportExisted, postCreateReport } from '@/search/api';

import {
  _amplitudeKeywordReportRequested,
  _amplitudeKeywordSearched,
} from '@/amplitude/amplitude.service';

export const getConversionRate = (rate: number) => {
  if (rate < 0.3) {
    return 'E';
  }
  if (rate >= 0.3 && rate < 0.5) {
    return 'D';
  }
  if (rate >= 0.5 && rate < 1.5) {
    return 'C';
  }
  if (rate >= 1.5 && rate < 3) {
    return 'B';
  }

  return 'A';
};

export const convertToWon = (currencyUnit: number, price: number, basePrice: number) => {
  return formatNumber(roundNumber(convertExchangeRate(currencyUnit, price, basePrice)));
};

export const cardTextParser = (id: TToolTipKey) => {
  switch (id) {
    case 'Search':
      return {
        title: '검색량',
        rateText: '최근 30일 검색량',
        subRateText: '',
        secondSubRateText: '',
      };
    case 'Conversion':
      return {
        title: '구매 전환',
        rateText: '구매전환 빈도',
        subRateText: '검색량',
        secondSubRateText: '판매량 합계',
      };
    case 'Competition':
      return {
        title: '노출 경쟁',
        rateText: '노출 경쟁률',
        subRateText: '검색량',
        secondSubRateText: '경쟁상품 수',
      };
    default:
      return {
        title: '광고 경쟁',
        rateText: 'CPC 비율',
        subRateText: 'CPC 비용',
        secondSubRateText: '평균 판매가',
      };
  }
};

export const isOverArea = (xAxis: number, tag: HTMLElement | null) => {
  if (tag === null) return false;
  const { offsetLeft, offsetWidth } = tag;

  if (xAxis > offsetLeft - 1 && xAxis <= offsetLeft + offsetWidth) return true;

  return false;
};

export const moveToShopee = (
  country: CountryType,
  text: string,
  sorted: TSortBy,
  amplitudeData?: TAmplitudeDetailData,
) => {
  openBrowser(`${convertShopeeSiteUrl(country!)}/search?keyword=${text}`, sorted);
  amplitudeData &&
    _amplitudeMovedToSERP(amplitudeData.param, amplitudeData.keyword, text);
};

export const updateSortingType = (
  id: string,
  init: TReportGeneratorType[],
  _dispatch: Dispatch<SetStateAction<TReportGeneratorType>>,
) => {
  const [_state] = init.filter((option) => option.value === id);
  _dispatch(_state);
};

export const initializeModal = (
  _state: TSearchTrigger,
  _dispatch: Dispatch<SetStateAction<TSearchTrigger>>,
) => {
  const INIT_VALUE = Object.assign({}, _state, { isOpen: false, text: '' });
  _dispatch(INIT_VALUE);
};

const updateModalType =
  (_dispatch: Dispatch<SetStateAction<TModalStatus>>) => (type: TModalStatus) => {
    _dispatch(type);
  };

const requestReport = async ({ _state, parameter, _dispatch }: TRequestReportModa) => {
  const { keyword, country, sortBy } = _state;
  const { count } = parameter;
  const updateModal = updateModalType(
    _dispatch as Dispatch<SetStateAction<TModalStatus>>,
  );
  try {
    if (_state.modalType === '') {
      const res = await getReportExisted({
        country: country,
        sortBy: sortBy,
        text: keyword,
      });

      const reportInfo = res?.data;

      if (isFalsy(reportInfo?.data) === false) {
        const { isDaily, createdAt } = reportInfo!.data!;
        if (isDaily) {
          updateModal({ modalType: MODAL_TYPE_ENUM.NotBeOverDayReport });
        } else {
          updateModal({
            modalType: MODAL_TYPE_ENUM.SameKeywordReportExisted,
            response: createdAt,
          });
        }
        return;
      }

      if (isFalsy(count) || count! < 300) {
        updateModal({
          modalType: MODAL_TYPE_ENUM.LessMonthlyKeywordVolume,
        });

        return;
      }
    }
    return await createReport({
      _dispatch: updateModal,
      _state,
      parameter,
    });
  } catch (error) {
    console.error(error);
  }
};

const createReport = async (props: TRequestReportModa) => {
  const {
    parameter: { reportInvokeId },
    _state,
    _dispatch,
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
        _dispatch({
          modalType: MODAL_TYPE_ENUM.MakeReportSuccesses,
          data: reportId,
        });
      } else {
        _dispatch({
          modalType: MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses,
          data: reportId,
        });
      }

      _amplitudeKeywordReportRequested(reportId, country, sortBy, keyword, jobId);
    }

    return postReport;
  } catch (error) {
    console.error(error);
  }
};

export const searchRequestHandler = (props: TRequestReportModa) => {
  requestReport({ ...props });
};

export const switchModal = ({ _dispatch, _setTrigger }: TSwitchModal) => {
  _setTrigger ?? _setTrigger(false);
  _dispatch({
    type: SEARCH_ACTION.SWITCH_MODAL,
    payload: { isModalOpen: false },
  });
};
