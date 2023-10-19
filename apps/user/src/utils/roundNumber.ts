const roundNumber = (number: number | string) => {
  if ((number + '').split('.').length === 1) return number;

  let originNumber = number;
  if (typeof originNumber === 'string') {
    originNumber = Number(originNumber);
  }

  const fixedNumber = originNumber.toFixed(1);
  const [firstPlaceNumber, secondPlaceNumber] = fixedNumber.split('.');

  if (secondPlaceNumber[0] === '0' && !secondPlaceNumber[1])
    return firstPlaceNumber + '.0';
  return fixedNumber;
};

export default roundNumber;
