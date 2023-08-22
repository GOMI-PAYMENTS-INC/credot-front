import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { ReportModalType } from '@/report/keyword/elements/ReportModalType';
import { SORTING_TYPE } from '@/report/keyword/elements/constants';

export interface IRequestReportModalType {
  modalType: TSearchModalType | '';
  createdAt: string;
  successCallback: Function;
  failedCallback: Function;
  cleanUpFunction: Function;
}
export const Modal = (props: IRequestReportModalType) => {
  const [isDisalbed, setIsDisalbed] = useState(false);

  const { title, content, onCancel, onConfirm } = ReportModalType({ ...props });
  useEffect(() => {
    return () => props.cleanUpFunction();
  }, []);
  return (
    <Fragment>
      <div className=''>
        <div className='relative rounded-[10px] bg-white p-6'>
          <header className='w-[352px]'>
            <p className='text-2XL/Bold'>{title}</p>
          </header>

          <main className='mt-6 text-L/Medium text-grey-800'>{content}</main>

          <footer
            className={`mt-8 flex h-12 justify-between ${onConfirm ? 'gap-4' : ''}`}
          >
            <button
              type='button'
              className='button-filled-normal-large-grey-false-false-true w-full py-3 '
              onClick={() => onCancel.cancelEvent()}
            >
              {onCancel.name}
            </button>

            {onConfirm && (
              <Fragment>
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full py-3'
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
