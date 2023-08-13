export const rankLabelStyleClass = (rank: number) => {
  let style = 'fill-transparent text-black';

  if (rank === 1) {
    style = 'fill-orange-500 text-white';
  }
  if (rank === 2) {
    style = 'fill-[#B1B1B1] text-white';
  }
  if (rank === 3) {
    style = 'fill-grey-800 text-white';
  }

  return style;
};
