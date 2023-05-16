import {
  deleteReportList,
  getMainReport,
  getOverseaProduct,
  getRelationReport,
  getSalePrice,
} from './report.api';
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';

import {
  REPORT_ACTION,
  REPORT_LIST_ACTION,
  reportListInitialState,
  TReportAction,
} from '@/containers/report/report.reducer';
import { scrollController } from '@/utils/scrollController';

import {
  GRADE_ITEMS,
  BATCH_STATUS,
  STATUS_CODE,
  TAG_SENTIMENT_STATUS,
  TITLE,
  REPORT_DETAIL_TYPE,
} from '@/types/enum.code';
import { convertTime } from '@/utils/parsingTimezone';
import { getReportList } from '@/containers/report/report.api';
import { formatNumber } from '@/utils/formatNumber';
import {
  convertBatchStatus,
  convertCountry,
  convertCountryIconPath,
} from '@/utils/convertEnum';
import { toast } from 'react-toastify';
import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';
import {
  _amplitudeKeywordReportDeleted,
  _amplitudeKeywordReportViewed,
} from '@/amplitude/amplitude.service';

export const openBrowser = (url: string) => {
  window.open(url);
};

export const _getReportInfo = async (id: string, _dispatch: Dispatch<TReportAction>) => {
  try {
    const response = await Promise.all([
      getMainReport(id),
      getRelationReport(id),
      getSalePrice(id),
      getOverseaProduct(id),
    ]);
    const dataName = Object.values(REPORT_DETAIL_TYPE);

    const [first] = response;
    if (first) {
      _amplitudeKeywordReportViewed(id, first.data);
    }

    response.forEach((chunk, idx) => {
      if (chunk) {
        const { data } = chunk.data;
        _dispatch({
          type: REPORT_ACTION.INITIALIZE_DATA,
          payload: { type: dataName[idx], data: data },
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const _getRelationReport = async (
  id: string,
  _dispatch: Dispatch<TReportAction>,
) => {
  try {
    const response = await getRelationReport(id);
    if (response?.data) {
      const { data } = response.data;
      _dispatch({
        type: REPORT_ACTION.INITIALIZE_DATA,
        payload: { type: 'relation', data: data },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const convertExchangeRate = (
  currencyUnit: number,
  itemPriceMin: number,
  basePrice: number,
) => {
  return Math.floor((itemPriceMin / currencyUnit) * basePrice);
};

export const isToggleOpen = (
  _dispatch: Dispatch<TReportAction>,
  isContent: boolean,
  id?: number,
) => {
  if (isContent) {
    _dispatch({ type: REPORT_ACTION.TOGGLE_CONTROL });
  } else {
    _dispatch({ type: REPORT_ACTION.RECOMMENDATION_TOGGLE_EVENT, payload: { id: id } });
  }
};

// #### 리포트 목록 시작 ####
export const _getReportList = async ({ _state, _dispatch }: TGetReportList) => {
  try {
    //isLoading 준비중
    _dispatch({
      type: REPORT_LIST_ACTION.SPINNER_EVENT,
      payload: { spinnerEvent: false },
    });

    const res = await getReportList({
      page: _state.page,
      limit: _state.limit,
    });
    const reportInfo = res?.data;
    if (reportInfo?.code === STATUS_CODE.SUCCESS) {
      //데이터 담기
      _state.data = reportInfo.data;
      _dispatch({ type: REPORT_LIST_ACTION.GET_REPORT_LIST, payload: _state });

      //isLoading 완료
      _dispatch({
        type: REPORT_LIST_ACTION.SPINNER_EVENT,
        payload: { spinnerEvent: true },
      });
    }

    return reportInfo;
  } catch (error) {
    console.error(error);
  }
};

//리포트 목록 내용 컨버터
export const reportListConverter = (item: TReportItem) => {
  const result = {
    status: {
      text: convertBatchStatus(item.status),
      sentiment: TAG_SENTIMENT_STATUS.ATTENTIVE,
    },
    countryCode: {
      text: convertCountry(item.countryCode),
      iconPath: convertCountryIconPath(item.countryCode),
    },
    channel: { iconPath: '/assets/icons/shop/Shopee.svg' },
  };

  if (item.status === BATCH_STATUS.DONE || item.status === BATCH_STATUS.REPLICATE) {
    result.status.sentiment = TAG_SENTIMENT_STATUS.POSITIVE;
  }
  return result;
};

//체크된 리스트 모두 해제
export const onUncheckReportList = (_dispatch: Dispatch<TReportListAction>) => {
  _dispatch({
    type: REPORT_LIST_ACTION.CHECKED_ITEM,
    payload: { checkedItems: reportListInitialState.checkedItems },
  });
  _dispatch({
    type: REPORT_LIST_ACTION.CHECKED_ALL_ITEM,
    payload: { isCheckedAll: reportListInitialState.isCheckedAll },
  });
};

//모든 약관 동의 체크 핸들러
export const onCheckAllReportList = (
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
  checked: boolean,
) => {
  //전체 선택
  if (checked) {
    const checkedItemsArray: TReportItem[] = [];
    _state.data.reports?.forEach(
      (report) =>
        isIncluded(report.status, BATCH_STATUS.DONE, BATCH_STATUS.REPLICATE) &&
        checkedItemsArray.push(report),
    );
    _dispatch({
      type: REPORT_LIST_ACTION.CHECKED_ITEM,
      payload: { checkedItems: checkedItemsArray },
    });
    _dispatch({
      type: REPORT_LIST_ACTION.CHECKED_ALL_ITEM,
      payload: { isCheckedAll: true },
    });
  } else {
    onUncheckReportList(_dispatch);
  }
};

//약관 동의 체크 박스 핸들러
export const onCheckReportList = (
  _dispatch: Dispatch<TReportListAction>,
  data: TReportListResponseData,
  checkedItems: TReportItem[],
  code: TReportItem,
  isChecked: boolean,
) => {
  if (isChecked) {
    //체크 추가할때
    _dispatch({
      type: REPORT_LIST_ACTION.CHECKED_ITEM,
      payload: { checkedItems: [...checkedItems, code] },
    });
    //모두 체크되었을 때
    if (
      data.reports.filter(
        (report) =>
          report.status === BATCH_STATUS.DONE || report.status === BATCH_STATUS.REPLICATE,
      ).length ===
      checkedItems.length + 1
    ) {
      _dispatch({
        type: REPORT_LIST_ACTION.CHECKED_ALL_ITEM,
        payload: { isCheckedAll: true },
      });
    }
  } else if (isChecked === false && checkedItems.find((one) => one.id === code.id)) {
    //체크 해제할때 checkedItems에 있을 경우
    const filter = checkedItems.filter((one) => one.id !== code.id);
    _dispatch({
      type: REPORT_LIST_ACTION.CHECKED_ITEM,
      payload: { checkedItems: [...filter] },
    });
    _dispatch({
      type: REPORT_LIST_ACTION.CHECKED_ALL_ITEM,
      payload: { isCheckedAll: false },
    });
  }
};

//리포트 목록 삭제 api
export const _deleteReportList = async (ids: number[]) => {
  try {
    const response = await deleteReportList({
      ids: ids,
    });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

//리포트 목록 삭제 container
export const deleteReports = async (
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
) => {
  const ids = [..._state.checkedItems].map((value) => {
    return value.id;
  });
  //삭제 실행
  const result = await _deleteReportList(ids);
  if (result?.code === STATUS_CODE.SUCCESS) {
    //모달 닫기
    switchDeleteModal(_dispatch, false);

    // 총 페이지 갯수
    const numPages = Math.ceil(_state.data.totalCount / _state.limit);
    //페이지에서 모든 item을 삭제한 경우, 하나 작은 숫자의 페이지로 이동한다.
    if (1 < numPages && _state.data.reports.length === _state.checkedItems.length) {
      _state.page = _state.page - 1;
    }

    //목록 다시 불러오기
    await _getReportList({ _state: _state, _dispatch });

    //선택된 체크박스 목록 비우기
    onUncheckReportList(_dispatch);

    toast.success(`리포트를 삭제했어요.`);

    _amplitudeKeywordReportDeleted(_state.checkedItems);
  } else {
    toast.error(`리포트를 삭제할 수 없습니다.`);
  }
};

//리포트 목록 삭제 확인 confirm 모달 상태 변경
export const switchDeleteModal = (
  _dispatch: Dispatch<TReportListAction>,
  isOpen: boolean,
) => {
  _dispatch({
    type: REPORT_LIST_ACTION.DELETE_REPORT,
    payload: {
      isDeleteConfirmModalOpen: isOpen,
    },
  });
};

//리포트 목록 삭제 확인 confirm 모달
export const openDeleteModal = (
  checkedItems: TReportItem[],
  _dispatch: Dispatch<TReportListAction>,
) => {
  //선택된 상품이 있는지 판단
  if (checkedItems.length) {
    switchDeleteModal(_dispatch, true);
  } else {
    toast.error('삭제할 리포트를 먼저 선택해주세요.');
  }
};

//선택 삭제 버튼 클릭 시
export const onClickDeleteReport = (
  checkedItems: TReportItem[],
  _dispatch: Dispatch<TReportListAction>,
) => {
  // 삭제 모달 노출
  openDeleteModal(checkedItems, _dispatch);
};

//리포트 목록 > 새로고침 버튼 클릭시
export const onClickReload = async (
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
) => {
  //목록 가져오기
  await _getReportList({ _state, _dispatch });
  //선택된 체크박스 목록 비우기
  onUncheckReportList(_dispatch);
};

//리스트 > 페이지 변경시
export const getReportListByPage = async (
  _dispatch: Dispatch<TReportListAction>,

  limit: number,
  goPage: number,
) => {
  await _getReportList({
    _state: { limit: limit, page: goPage },
    _dispatch,
  } as TGetReportList);
  //선택된 체크박스 목록 비우기
  onUncheckReportList(_dispatch);
};

//리스트 > 출력 개수 변경시
export const getReportListByLimit = async (
  limit: number,
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
  total: number,
) => {
  //변경 할 출력 갯수
  if (limit && _state.page && _state.limit) {
    const oldOffset = _state.page * _state.limit;
    const newOffset = _state.page * limit;
    let goPage;
    if (oldOffset < newOffset) {
      goPage = Math.ceil(oldOffset / limit);
    } else {
      if (Math.ceil(total / limit) < Math.ceil(oldOffset / limit)) {
        // 총 페이지 갯수
        goPage = Math.ceil(total / limit);
      } else {
        goPage = Math.ceil(oldOffset / limit);
      }
    }

    await _getReportList(<TGetReportList>{
      _state: {
        page: goPage,
        limit: limit,
      },
      _dispatch,
    });
    //선택된 체크박스 목록 비우기
    onUncheckReportList(_dispatch);
  }
};
// #### 리포트 목록 끝 ####

export const roundNumber = (number: number | string) => {
  if ((number + '').split('.').length === 1) return number;

  let originNumber = number;
  if (typeof originNumber === 'string') {
    originNumber = Number(originNumber);
  }

  const fixedNumber = originNumber.toFixed(1);
  const [firstPlaceNumber, secondPlaceNumber] = fixedNumber.split('.');

  if (secondPlaceNumber[0] === '0' && isFalsy(secondPlaceNumber[1]))
    return firstPlaceNumber + '.0';
  return fixedNumber;
};

export const delayEvent = (callback: () => void, time: number) => {
  setTimeout(() => {
    callback();
  }, time);
};

export const buttonSpinnerEvent = (_dispatch: Dispatch<TReportAction>) => {
  _dispatch({ type: REPORT_ACTION.SPINNER_EVENT });
};

export const countProductsByPrice = (scope: number[], items: TSalePriceItems[]) => {
  const store = new Set();
  const res = scope.map((price, idx) =>
    items.filter((item, itemIdx) => {
      if ((idx === 0 || itemIdx === items.length - 1) && item.itemPriceMin <= price) {
        store.add(item.id);
        return item;
      } else if (
        store.has(item.id) === false &&
        item.itemPriceMin < scope[idx + 1] &&
        item.itemPriceMin > price
      ) {
        store.add(item.id);
        return item;
      }

      return;
    }),
  );

  return res.map((data) => data.length);
};

export const selectSalePriceCompetitionType = (
  focus: GRADE_TYPE,
  _dispatch: Dispatch<TReportAction>,
) => {
  _dispatch({ type: REPORT_ACTION.FOCUS_ITEMS, payload: { focus: focus } });
};

export const convertGrade = (item: GRADE_ITEMS) => {
  switch (item) {
    case GRADE_ITEMS.HIGH:
      return '낮은';
    case GRADE_ITEMS.MEDIUM:
      return '보통';
    default:
      return '높은';
  }
};

export const removeOutlinerinItems = (items: TSalePriceItems[], basePrice: number) => {
  const median = Math.floor(items.length / 2);
  const scope = Math.floor(items.length / 4);
  let Q3: number, Q1: number;
  const lowLength = median - scope - 1;
  const highLength = median + scope;

  if (lowLength % 2 === 1) {
    Q1 = (items[lowLength].itemPriceMin + items[lowLength + 1].itemPriceMin) / 2;
    Q3 = (items[highLength].itemPriceMin + items[highLength + 1].itemPriceMin) / 2;
  } else {
    Q1 = items[lowLength].itemPriceMin;
    Q3 = items[highLength].itemPriceMin;
  }

  const IQR = Q3 - Q1;

  const removedOutliner = items.filter((item) => {
    if (Q1 - 1.5 * IQR < item.itemPriceMin && Q3 + 1.5 * IQR > item.itemPriceMin) {
      return item;
    }

    return false;
  });
  return removedOutliner;
};

export const changeSalePriceData = (items: TSalePriceItems[], basePrice: number) => {
  const removedOutlinerItmes = removeOutlinerinItems(items, basePrice);
  const min = removedOutlinerItmes[0].itemPriceMin;
  const max = removedOutlinerItmes[removedOutlinerItmes.length - 1].itemPriceMin;

  const levelBound = (max - min) / 10;
  const avg =
    removedOutlinerItmes.reduce((pre, item) => pre + item.itemPriceMin, 0) /
    removedOutlinerItmes.length;

  return {
    min: min,
    max: max,
    levelBound: levelBound,
    avg: avg,
    removedOutlinerItmes: removedOutlinerItmes,
  };
};

export const onScrollDetail = (
  _state: TScrollEvent,
  _setState: Dispatch<SetStateAction<TScrollEvent>>,
  name: string = '',
): void => {
  const { scrollY } = _state;
  const [first, second, third, fourth] = document.getElementsByClassName(
    'detailReport-h1-header',
  );

  //FIXME: 수동으로 추가하지 않아도 인식할수 있도록 추후 개선
  const [marketSize, keywordInfo, salePrice, overseaProduct] = [
    first,
    second,
    third,
    fourth,
  ].map((element) => (element as HTMLElement).offsetTop - 100);

  if (scrollY < 100) {
    _setState(Object.assign({}, _state, { current: TITLE.REPORT, title: TITLE.REPORT }));
    return;
  }

  if (scrollY >= marketSize && scrollY < keywordInfo) {
    _setState(Object.assign({}, _state, { title: name, current: TITLE.MARTKET_SIZE }));
  }

  if (scrollY >= keywordInfo && scrollY < salePrice) {
    _setState(Object.assign({}, _state, { title: name, current: TITLE.KEYWORD_INFO }));
  }

  if (scrollY >= salePrice && scrollY < overseaProduct) {
    _setState(Object.assign({}, _state, { title: name, current: TITLE.SALE_PRICE }));
  }
  if (scrollY >= overseaProduct) {
    _setState(Object.assign({}, _state, { title: name, current: TITLE.OVERSEA_PRODUCT }));
  }
};

export const switchContents = (
  _state: TScrollEvent,
  _setState: Dispatch<SetStateAction<TScrollEvent>>,
) => {
  _setState(Object.assign({}, _state, { isOpen: !_state.isOpen }));
};

export const scrollToTop = (
  _setState: Dispatch<SetStateAction<TScrollEvent>>,
  scrollInfo: RefObject<HTMLDivElement> | RefObject<HTMLTableRowElement>,
) => {
  scrollController(scrollInfo, 0, 0, 'smooth');

  if (scrollInfo.current?.tagName === 'TBODY') return;
  _setState({
    scrollY: 0,
    title: 'Report',
    isOpen: true,
    current: 'Report',
  });
};

export const setChartLabels = (
  currencyUnit: number,
  salePriceScope: number[],
  basePrice: number,
): string[][] => {
  const init: string[][] = [];
  return salePriceScope.reduce((pre, cur, idx) => {
    const _cur = formatNumber(convertExchangeRate(currencyUnit, cur, basePrice));
    const _next = formatNumber(
      convertExchangeRate(currencyUnit, salePriceScope[idx + 1], basePrice) - 1,
    );
    if (idx === salePriceScope.length - 1) {
      return pre.concat([_cur]);
    }
    return pre.concat([[_cur, `~${_next}`]]);
  }, init);
};

export const convertedData = (trend: TGoogleTrendDataType) => {
  const minTurnoverMonth: string[] = [],
    maxTurnoverMonth: string[] = [];

  if (trend.length === 0) {
    minTurnoverMonth.push('-');
    maxTurnoverMonth.push('-');
    return { interest: [], date: [], minTurnoverMonth, maxTurnoverMonth };
  }

  const originInterest = trend.map((data) => data.interest);
  let min = Math.min(...originInterest);
  let max = Math.max(...originInterest);
  const percentage = max / 100;

  const interest = originInterest.map((originInterest) =>
    Math.round(originInterest / percentage),
  );

  const date = trend.map((data) => {
    if (data.interest === min) {
      minTurnoverMonth.push(convertTime(data.trendDate, 'MM'));
    }
    if (data.interest === max) {
      maxTurnoverMonth.push(convertTime(data.trendDate, 'MM'));
    }
    return convertTime(data.trendDate, 'YY.MM');
  });

  return { interest, date, minTurnoverMonth, maxTurnoverMonth };
};
