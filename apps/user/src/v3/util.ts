export const number = (value: number | undefined): number => {
  return value || 0;
};
export const localeString = (value: number): string => value.toLocaleString();
