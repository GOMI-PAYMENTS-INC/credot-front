export const getConversionRate = (rate: number) => {
  if (rate < 0.3) {
    return 'E';
  }
  if (rate >= 0.3 && rate < 0.5) {
    return 'D';
  }
  if (rate >= 0.5 && rate < 1) {
    return 'C';
  }
  if (rate >= 1 && rate < 1.5) {
    return 'B';
  }

  return 'A';
};
