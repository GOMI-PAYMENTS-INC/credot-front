import { convertTime } from '@/utils/parsingTimezone';
import type { Dispatch, SetStateAction } from 'react';
import { CountryType } from '@/preview/elements/keyword/constant';
import { isFalsy } from '@/utils/isFalsy';

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
