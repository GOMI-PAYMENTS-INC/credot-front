import { formatNumber } from '@/utils/formatNumber';
import { _amplitudeKeywordReportDeleted } from '@/amplitude/amplitude.service';

export const convertExchangeRate = (
  currencyUnit: number,
  itemPriceMin: number,
  basePrice: number,
) => {
  return Math.floor((itemPriceMin / currencyUnit) * basePrice);
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
    return pre.concat([`${_cur}\n ~${_next}`]);
  }, init);
};
