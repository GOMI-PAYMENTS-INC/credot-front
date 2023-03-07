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
type TInputIcon = {
  status?: INPUTSTATUS;
  iconSize?: number;
};

export const InputIcon = ({ status, iconSize = 4 }: TInputIcon) => {
  let iconPath = '';
  let iconStyle = '';

  switch (status) {
    case INPUTSTATUS.ERROR:
      iconStyle = 'fill-red-600';
      iconPath = '/assets/icons/outlined/ExclamationCircle.svg';
      break;
    case INPUTSTATUS.COMPLETED:
      iconStyle = 'fill-red-600';
      iconPath = '/assets/icons/outlined/Check.svg';
      break;
    default:
  }

  return (
    <Fragment>
      {iconPath !== '' ? (
        <ReactSVG
          src={iconPath}
          className='inputCustom-icon'
          beforeInjection={(svg) => {
            svg.setAttribute('class', `w-${iconSize} h-${iconSize} ${iconStyle}`);
          }}
        />
      ) : null}
    </Fragment>
  );
};
