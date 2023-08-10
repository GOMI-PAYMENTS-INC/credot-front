export const dateConvertor = (date: string) => {
  const [year, month] = date.split('.');

  if (month === undefined) return `${year} 월`;
  return `${year}년 ${month}월`;
};
