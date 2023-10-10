import { ReactSVG } from 'react-svg';

interface ISortingButton {
  type: TColumnType;
}

export const SortingButton = ({ type }: ISortingButton) => {
  const baseColor = type === 'type2' ? 'fill-white' : 'fill-grey-400';
  return (
    <div className='flex cursor-pointer flex-col gap-1'>
      <ReactSVG
        src='/assets/icons/filled/SetUp.svg'
        beforeInjection={(svg) => svg.setAttribute('class', baseColor)}
      />
      <ReactSVG
        src='/assets/icons/filled/SetDown.svg'
        beforeInjection={(svg) => svg.setAttribute('class', baseColor)}
      />
    </div>
  );
};
