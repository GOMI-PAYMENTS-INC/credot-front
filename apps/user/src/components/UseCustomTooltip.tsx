import type { ReactNode } from 'react';
import { Tooltip, PlacesType } from 'react-tooltip';

interface IUseCustomTooltip {
  component: ReactNode;
  content: ReactNode;
  place?: PlacesType;
}

const UseCustomTooltip = ({
  component,
  content,
  place = 'bottom',
}: IUseCustomTooltip) => {
  const randomKey = Math.random() * 100;
  return (
    <div className='tooltip-container ml-1 self-end xs:hidden'>
      <a data-tooltip-id={`anchor-keyword-search-volum_${randomKey}`}>{component}</a>
      <Tooltip
        style={{
          opacity: 1,
          background: 'content-box',
          border: 'none',
          zIndex: '100',
          top: '30px',
        }}
        render={() => {
          return (
            <div className='top-0 rounded-lg border-[1px] bg-white p-[15px]'>
              <div className='flex flex-col justify-start text-start'>{content}</div>
            </div>
          );
        }}
        id={`anchor-keyword-search-volum_${randomKey}`}
        place={place}
        variant='light'
      />
    </div>
  );
};

export default UseCustomTooltip;
