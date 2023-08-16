import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';

import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate } from '@/report/container';
import { roundNumber } from '@/report/container';
import { CountryType } from '@/generated/graphql';
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

export const isOverArea = (xAxis: number, tag: HTMLElement) => {
  const { offsetLeft, offsetWidth } = tag;
  console.log();
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
