import { ReactSVG } from 'react-svg';
import type { CSSProperties } from 'react';

interface IBackforwardButton {
  callback: Function;
  style: string;
  originStyle?: CSSProperties;
  hidden?: boolean;
}
export const BackforwardButton = ({
  callback,
  style,
  originStyle,
  hidden = false,
}: IBackforwardButton) => {
  return (
    <button
      className={`${style} ${
        hidden ? 'hidden' : ''
      } absolute z-10 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[52px] border-[1px] bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)]`}
      onClick={() => callback()}
      style={originStyle}
    >
      <ReactSVG
        src='/assets/icons/filled/LeftArrow.svg'
        beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-300')}
      />
    </button>
  );
};
