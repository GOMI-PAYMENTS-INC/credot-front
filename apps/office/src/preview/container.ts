import { convertTime } from '@/utils/parsingTimezone';
import type { Dispatch, SetStateAction } from 'react';
import { CountryType } from '@/preview/elements/keyword/constant';
import { isFalsy } from '@/utils/isFalsy';
import { GRADE_ITEMS } from '@/preview/elements/price/constant';
import { REPORT_CONTENT } from '@/preview/constants/reportData';

export const convertedGoogleTrendData = (trend: TGoogleTrendDataType) => {
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

export const _setOpenContent = (params: {
  _dipatch: Dispatch<SetStateAction<number[]>>;
  _state: number[];
  index: number;
}) => {
  const { _state, _dipatch, index } = params;

  if (_state.includes(index)) {
    return _dipatch(_state.filter((number) => number !== index));
  }
  return _dipatch(_state.concat(index));
};

export const convertShopeeSiteUrl = (country: CountryType) => {
  switch (country) {
    case CountryType.Sg:
      return 'https://shopee.sg';
    case CountryType.My:
      return 'https://shopee.com.my';
    case CountryType.Tw:
      return 'https://shopee.tw';
    case CountryType.Vn:
      return 'https://shopee.vn';
    case CountryType.Th:
      return 'https://shopee.co.th';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertExchangeRate = (
  currencyUnit: number,
  itemPriceMin: number,
  basePrice: number,
) => {
  return Math.floor((itemPriceMin / currencyUnit) * basePrice);
};

const rateRoundConvert = (rate: number, toFixedNum: number) => {
  const round = rate.toFixed(toFixedNum);
  return Number(round) % 1 ? round : parseInt(round);
};

export const formatNumber = (number: any): string => {
  if (typeof number === 'number') {
    let result = rateRoundConvert(number, 1);
    return result.toLocaleString();
  }

  const changedValue = parseInt(number);
  if (isNaN(changedValue) === false) {
    return rateRoundConvert(changedValue, 1).toLocaleString();
  }
  if (!number) return '';
  return '';
};

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

export const setChartLabels = (
  currencyUnit: number,
  salePriceScope: number[],
  basePrice: number,
): string[] => {
  const init: string[] = [];
  return salePriceScope.reduce((pre, cur, idx) => {
    const _cur = formatNumber(convertExchangeRate(currencyUnit, cur, basePrice));
    const _next = formatNumber(
      convertExchangeRate(currencyUnit, salePriceScope[idx + 1], basePrice) - 1,
    );
    if (idx === salePriceScope.length - 1) {
      return pre.concat(_cur);
    }
    return pre.concat([`${_cur}\n~ ${_next}`]);
  }, init);
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

  return items.filter((item) => {
    if (Q1 - 1.5 * IQR < item.itemPriceMin && Q3 + 1.5 * IQR > item.itemPriceMin) {
      return item;
    }

    return false;
  });
};

export const changeSalePriceData = (items: any) => {
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

export const onScrollDetail = (
  _state: TScrollEvent,
  _setState: Dispatch<SetStateAction<TScrollEvent>>,
): void => {
  const { scrollY } = _state;
  const header = document.getElementsByClassName('detailReport-h1-header');
  const titleName = Object.values(REPORT_CONTENT);
  // 현재 뷰포트의 높이
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  // 문서 전체의 높이
  const documentHeight = document.documentElement.scrollHeight;
  // 스크롤이 끝까지 도달했을 때의 임계값 (예: 20 픽셀)
  const threshold = 20;
  // 스크롤이 처음일 때
  // if (scrollY < threshold) {
  //   _setState(Object.assign({}, _state, { current: REPORT_CONTENT.MARKET }));
  // }

  [...header].map((element, index) => {
    const target = element as HTMLElement;
    const offsetTop = target.offsetTop;
    if (target.parentElement) {
      const parentElement = target.parentElement.closest('section');

      if (parentElement) {
        const space = 150;
        const sectionClientHeight = parentElement.clientHeight - space;
        if (offsetTop < scrollY && scrollY < offsetTop + sectionClientHeight) {
          _setState(Object.assign({}, _state, { current: titleName[index] }));
        }
      }
    }
  });
};
