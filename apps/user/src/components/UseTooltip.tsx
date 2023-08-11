import type { ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
interface IUseTooltip {
  content: ReactNode;
}
export const UseTooltip = ({ content }: IUseTooltip) => {
  return (
    <div className='tooltip-container ml-0 xs:hidden'>
      <a data-tooltip-id='anchor-keyword-search-volum'>
        <ReactSVG
          src='assets/icons/outlined/QuestionCircle.svg'
          className=''
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'fill-grey-800 h-4 w-4 ');
          }}
        />
      </a>
      <Tooltip
        render={() => {
          return (
            <div className='rounded-lg border-[1px] border-grey-500 bg-grey-800 p-[15px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)]'>
              {content}
            </div>
          );
        }}
        id='anchor-keyword-search-volum'
        place='right'
        variant='light'
      />
    </div>
  );
};
