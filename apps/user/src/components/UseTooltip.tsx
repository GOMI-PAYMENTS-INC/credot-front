import type { ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip, PlacesType } from 'react-tooltip';
interface IUseTooltip {
  content: ReactNode;
  place?: PlacesType;
}

interface IContentPack {
  title?: string;
  children: ReactNode;
  className?: string;
}
export const ContentPack = ({ title = '', children, className }: IContentPack) => {
  return (
    <div className='flex flex-col'>
      <p className={`text-M/Bold text-orange-500 ${className}`}>{title}</p>
      <div className='text-M/Medium text-white'>{children}</div>
    </div>
  );
};

export const ToolTipCombiner = (props: { children: ReactNode }) => {
  const { children } = props;
  return <div className='flex flex-col gap-5'>{children}</div>;
};

const UseTooltip = ({ content, place = 'right' }: IUseTooltip) => {
  const randomKey = Math.random() * 100;
  return (
    <div className='tooltip-container ml-1 xs:hidden'>
      <a data-tooltip-id={`anchor-keyword-search-volum_${randomKey}`}>
        <ReactSVG
          src='/assets/icons/outlined/QuestionCircle.svg'
          className=''
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'fill-grey-600 h-[14px] w-[14px]');
          }}
        />
      </a>
      <Tooltip
        style={{ opacity: 1, background: 'content-box', border: 'none' }}
        render={() => {
          return (
            <div className='rounded-lg bg-grey-800 p-[15px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)]'>
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

export default UseTooltip;
