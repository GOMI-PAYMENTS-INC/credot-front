import type { ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
interface IUseTooltip {
  content: ReactNode;
}
const UseTooltip = ({ content }: IUseTooltip) => {
  const randomKey = Math.random() * 100;
  return (
    <div className='tooltip-container ml-1 xs:hidden'>
      <a data-tooltip-id={`anchor-keyword-search-volum_${randomKey}`}>
        <ReactSVG
          src='/assets/icons/outlined/QuestionCircle.svg'
          className=''
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'fill-grey-800 h-[18px] w-[18px]');
          }}
        />
      </a>
      <Tooltip
        style={{ opacity: 1, background: 'content-box', border: 'none' }}
        render={() => {
          return (
            <div className='rounded-lg bg-grey-800 p-[15px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)]'>
              <div className='flex flex-col justify-start'>{content}</div>
            </div>
          );
        }}
        id={`anchor-keyword-search-volum_${randomKey}`}
        place='right'
        variant='light'
      />
    </div>
  );
};

export default UseTooltip;
