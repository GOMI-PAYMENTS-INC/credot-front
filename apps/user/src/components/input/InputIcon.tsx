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
};

export const InputIcon = ({ status }: TInputIcon) => {
  let iconPath = null;

  switch (status) {
    case INPUTSTATUS.ERROR:
      iconPath = '/assets/icons/outlined/ExclamationCircle.svg';
      break;
    case INPUTSTATUS.COMPLETED:
      iconPath = '/assets/icons/outlined/Check.svg';
      break;
    default:
  }

  return (
    <Fragment>
      {iconPath ? (
        <ReactSVG
          src={iconPath}
          className='inputCustom-icon'
          beforeInjection={(svg) => {
            svg.setAttribute('class', `w-4 h-4 fill-orange-500`);
          }}
        />
      ) : null}
    </Fragment>
  );
};
