import {
  deleteReportList,
  getMainReport,
  getRelationReport,
  getSalePrice,
} from './report.api';
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';

import {
  REPORT_ACTION,
  REPORT_LIST_ACTION,
  TReportAction,
} from '@/containers/report/report.reducer';
import {
  GRADE_ITEMS,
  BATCH_STATUS,
  STATUS_CODE,
  TAG_SENTIMENT_STATUS,
  TITLE,
} from '@/types/enum.code';

import { getReportList } from '@/containers/report/report.api';
import { formatNumber } from '@/utils/formatNumber';
import { convertBatchStatus, convertCountry } from '@/utils/convertEnum';
import { toast } from 'react-toastify';

export const openBrowser = (url: string) => {
  window.open(url);
};

export const convertTitle = (id: string) => {
  switch (id) {
    case TITLE.REPORT:
      return '리포트';
    case TITLE.MARTKET_SIZE:
      return '시장규모';
    case TITLE.RECOMMEND_KEYWORD:
      return '추천 키워드';
    case TITLE.KEYWORD_INFO:
      return '키워드 정보';
    case TITLE.SALE_PRICE:
      return '가격 분석';
    default:
      return id;
  }
};

export const _getReportInfo = async (id: string, _dispatch: Dispatch<TReportAction>) => {
  try {
    const response = await Promise.all([
      getMainReport(id),
      getRelationReport(id),
      getSalePrice(id),
    ]);
    const dataName = ['main', 'relation', 'price'];
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

export const convertExachangeRate = (vnd: number, krw: number) => {
  return Math.floor((vnd / 100) * krw);
};

export const updateTitle = (
  curHeight: number,
  _dispatch: Dispatch<TReportAction>,
  name?: string,
) => {};

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

export const reportListConverter = (item: TReportItem) => {
  const result = {
    status: {
      text: convertBatchStatus(item.status),
      sentiment: TAG_SENTIMENT_STATUS.ATTENTIVE,
    },
    countryCode: {
      text: convertCountry(item.countryCode),
      iconPath: '/assets/icons/flag/Vietnam.svg',
    },
    channel: { iconPath: '/assets/icons/shop/Shopee.svg' },
  };

  if (item.status === BATCH_STATUS.DONE || item.status === BATCH_STATUS.REPLICATE) {
    result.status.sentiment = TAG_SENTIMENT_STATUS.POSITIVE;
  }
  return result;
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

//TODO: setCheckedItems reducer로 관리하게 변경 할 것 - casey 23.02.22
//리포트 목록 삭제 container
export const deleteReports = (
  checkedItems: number[],
  setCheckedItems: Dispatch<number[]>,
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
) => {
  //삭제 실행
  _deleteReportList(checkedItems).then((result) => {
    if (result?.code === STATUS_CODE.SUCCESS) {
      //모달 닫기
      switchDeleteModal(_dispatch, false);

      // 총 페이지 갯수
      const numPages = Math.ceil(_state.data.totalCount / _state.limit);
      //페이지에서 모든 item을 삭제한 경우, 하나 작은 숫자의 페이지로 이동한다.
      if (1 < numPages && _state.data.reports.length === checkedItems.length) {
        _state.page = _state.page - 1;
      }

      //목록 다시 불러오기
      _getReportList({ _state: _state, _dispatch }).then(() => {
        //선택된 체크박스 목록 비우기
        setCheckedItems([]);
      });

      //토스트 알림
      toast.success(`리포트를 삭제했어요.`);
    } else {
      toast.error(`리포트를 삭제할 수 없습니다.`);
    }
  });
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
  checkedItems: number[],
  _dispatch: Dispatch<TReportListAction>,
) => {
  //선택된 상품이 있는지 판단
  if (checkedItems.length) {
    switchDeleteModal(_dispatch, true);
  } else {
    toast.warn('리포트를 선택해주세요.');
  }
};

//선택 삭제 버튼 클릭 시
export const onClickDeleteReport = (
  checkedItems: number[],
  _dispatch: Dispatch<TReportListAction>,
) => {
  // 삭제 모달 노출
  openDeleteModal(checkedItems, _dispatch);
};

//리포트 목록 > 새로고침 버튼 클릭시
export const onClickReload = (
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
) => {
  _getReportList({ _state, _dispatch });
};

export const roundNumber = (number: number | string) => {
  if ((number + '').split('.').length === 1) return number;

  let originNumber = number;
  if (typeof originNumber === 'string') {
    originNumber = parseInt(originNumber);
  }

  const fixedNumber = originNumber.toFixed(1);
  const [firstPlaceNumber, secondPlaceNumber] = fixedNumber.split('.');

  if (secondPlaceNumber === '0') return 0;
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
//리스트 > 출력 개수 변경시
export const onChangeOffsetCount = (
  event: ChangeEvent<HTMLSelectElement>,
  _state: TReportListState,
  _dispatch: Dispatch<TReportListAction>,
  total: number,
) => {
  //변경 할 출력 갯수
  const limit = Number(event.target.value);
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

    _getReportList(<TGetReportList>{
      _state: {
        page: goPage,
        limit: limit,
      },
      _dispatch,
    });
  }
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

export const removeOutlinerinItems = (items: TSalePriceItems[]) => {
  const median = Math.floor(items.length / 2);
  const scope = Math.floor(items.length / 4);
  const Q3 = items[median + scope].itemPriceMin;
  const Q1 = items[median - scope].itemPriceMin;
  const IQR = Q3 - Q1;

  const removedOutliner = items.filter((item) => {
    if (Q1 - 1.5 * IQR < item.itemPriceMin && Q3 + 1.5 * IQR > item.itemPriceMin) {
      return item;
    }

    return false;
  });

  return removedOutliner;
};

export const changeSalePriceData = (items: TSalePriceItems[]) => {
  const removedOutlinerItmes = removeOutlinerinItems(items);
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
  const [marketSize, keywordInfo, recommendKeyword, salePrice] = [
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
  if (scrollY >= keywordInfo && scrollY < recommendKeyword) {
    _setState(Object.assign({}, _state, { title: name, current: TITLE.KEYWORD_INFO }));
  }

  if (scrollY >= recommendKeyword && scrollY < salePrice) {
    _setState(
      Object.assign({}, _state, { title: name, current: TITLE.RECOMMEND_KEYWORD }),
    );
  }

  if (scrollY >= salePrice) {
    _setState(Object.assign({}, _state, { title: name, current: TITLE.SALE_PRICE }));
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
  scrollInfo.current?.scroll(0, 0);
  if (scrollInfo.current?.tagName === 'TBODY') return;
  _setState({
    scrollY: 0,
    title: 'Report',
    isOpen: true,
    current: 'Report',
  });
};

export const setChartLabels = (
  salePriceScope: number[],
  basePrice: number,
): string[][] => {
  const init: string[][] = [];
  return salePriceScope.reduce((pre, cur, idx) => {
    const _cur = formatNumber(convertExachangeRate(cur, basePrice));
    const _next = formatNumber(
      convertExachangeRate(salePriceScope[idx + 1], basePrice) - 1,
    );
    if (idx === salePriceScope.length - 1) {
      return pre.concat([_cur]);
    }
    return pre.concat([[_cur, `~${_next}`]]);
  }, init);
};
