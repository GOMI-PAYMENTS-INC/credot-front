/**
 @number 판별해야할 값
 실수인 경우 true 반환, 0인 경우 false
 */
export const isInteger = (number: number) => {
  return number % 1 === 0;
};
