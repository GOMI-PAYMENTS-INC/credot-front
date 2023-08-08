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
