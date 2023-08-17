import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { ReportModalType } from '@/report/keyword/elements/ReportModalType';

export interface IRequestReportModalType {
  modalType: TSearchModalType;
  createdAt: string;
  successCallback: Function;
  failedCallback: Function;
}
export const Modal = (props: IRequestReportModalType) => {
  const [isDisalbed, setIsDisalbed] = useState(false);
  const { title, content, onCancel, onConfirm } = ReportModalType({ ...props });

  return (
    <Fragment>
      <div className=''>
        <div className='relative rounded-[10px] bg-white p-6'>
          <header className='pb-2'>
            <h3>{title}</h3>
          </header>

          <main>{content}</main>

          <footer className='flex justify-between pt-4'>
            <button
              type='button'
              className='button-filled-normal-large-grey-false-false-true w-full'
              onClick={() => onCancel.cancelEvent()}
              disabled={isDisalbed}
            >
              {onCancel.name}
            </button>

            {onConfirm && (
              <Fragment>
                <div className='w-4' />
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full'
                  disabled={isDisalbed}
                  onClick={() => {
                    setIsDisalbed(true);
                    onConfirm.confirmEvent();
                  }}
                >
                  {isDisalbed ? (
                    <div className=' scale-[0.2]'>
                      <div id='loader-white' />
                    </div>
                  ) : (
                    <Fragment>{onConfirm.name}</Fragment>
                  )}
                </button>
              </Fragment>
            )}
          </footer>
        </div>
      </div>
    </Fragment>
  );
};
