export const formatNumber = (number: any): string => {
  if (typeof number === 'number') {
    return number.toLocaleString();
  }

  const changedValue = parseInt(number);
  if (isNaN(changedValue) === false) {
    return changedValue.toLocaleString();
  }
  if (!number) return '';
  return '';
};
