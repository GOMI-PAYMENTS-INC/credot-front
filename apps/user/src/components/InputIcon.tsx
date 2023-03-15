import { ReactSVG } from 'react-svg';
import { Fragment } from 'react';

export enum INPUTSTATUS {
  NORMAL = 'normal',
  HOVER = 'hover',
  FOCUSED = 'focused',
  DISABLED = 'disabled',
  ERROR = 'error',
  FILLED = 'filled',
  COMPLETED = 'completed',
}

type TInputTimeIcon = {
  minutes: number;
  seconds: number;
};

type TInputIcon = {
  status?: INPUTSTATUS;
  iconSize?: number;
  time?: TInputTimeIcon;
};

export const InputIcon = ({ status, iconSize = 4, time }: TInputIcon) => {
  let iconPath = '';
  let iconStyle = '';

  switch (status) {
    case INPUTSTATUS.ERROR:
      iconStyle = 'fill-red-600';
      iconPath = '/assets/icons/outlined/ExclamationCircle.svg';
      break;
    case INPUTSTATUS.COMPLETED:
      iconStyle = 'fill-green-600';
      iconPath = '/assets/icons/outlined/Check.svg';
      break;
    default:
  }

  return (
    <Fragment>
      {time ? (
        <span className='absolute right-4 top-3 inline-block w-1/6 text-right text-orange-500'>
          {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
        </span>
      ) : (
        <ReactSVG
          src={iconPath}
          className='inputCustom-icon'
          beforeInjection={(svg) => {
            svg.setAttribute('class', `w-${iconSize} h-${iconSize} ${iconStyle}`);
          }}
        />
      )}
    </Fragment>
  );
};
