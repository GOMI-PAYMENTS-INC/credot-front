const rateRoundConvert = (rate: number, toFixedNum: number) => {
  const round = rate.toFixed(toFixedNum);
  return Number(round) % 1 ? round : parseInt(round);
};

export const formatNumber = (number: any): string => {
  if (typeof number === 'number') {
    let result = rateRoundConvert(number, 1);

    return Intl.NumberFormat().format(Number(result));
  }

  const changedValue = parseInt(number);
  if (isNaN(changedValue) === false) {
    return rateRoundConvert(changedValue, 1).toLocaleString();
  }
  if (!number) return '';
  return '';
};
