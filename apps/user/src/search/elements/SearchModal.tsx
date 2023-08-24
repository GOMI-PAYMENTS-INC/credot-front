import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { switchModal } from '@/search/elements/container';

import { MODAL_SIZE_ENUM, MODAL_TYPE_ENUM } from '@/types/enum.code';
import { ReportModalType } from '@/search/elements/ReportModalType';
interface ISearchModalPrpos {
  data?: any;
  _state: TSearchState;
  _dispatch: Dispatch<TSearchActionType>;
  size: string;
  _setTrigger: Dispatch<SetStateAction<boolean>>;
}

export const SearchModal = ({
  _state,
  _dispatch,
  data,
  size,
  _setTrigger,
}: ISearchModalPrpos) => {
  const [eventTrigger, setEventTrigger] = useState(false);
  const [isDisalbed, setIsDisalbed] = useState(false);

  useEffect(() => {
    if (eventTrigger === false) return;
    const switchModalAsync = async () => {
      switchModal({ _setTrigger, _dispatch });
      setEventTrigger(false);
    };
    switchModalAsync();
  }, [eventTrigger]);

  useEffect(() => {
    if (_state.modalType === MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses) {
      setIsDisalbed(false);
    }
  }, [_state.modalType]);

  const { modalType, newReportId } = _state;
  const modal: IModalType = ReportModalType({
    modalType,
    createdAt: _state.createdAt,
    newReportId,
    switchModalProps: { _setTrigger, _dispatch },
    parameter: data,
    _state,
  });

  return (
    <Fragment>
      <div
        className={`${
          size === MODAL_SIZE_ENUM.LARGE ? ' h-[244px] w-[400px]' : 'h-[211px] w-[298px]'
        } relative max-w-md md:h-auto`}
      >
        <div className='relative rounded-[10px] bg-white p-6'>
          <header className='pb-2'>
            <h3
              className={`${
                size === MODAL_SIZE_ENUM.LARGE ? ' text-2XL/Bold' : 'text-L/Bold'
              } text-center text-grey-900`}
            >
              {modal.title}
            </h3>
          </header>
          {modal.content && (
            <section
              className={`${
                size === MODAL_SIZE_ENUM.LARGE ? 'text-L/Medium' : 'text-M/Medium'
              } py-2 text-grey-800`}
            >
              {modal.content}
            </section>
          )}

          <footer className='flex justify-between pt-4'>
            {modal.onCancel && (
              <button
                type='button'
                className='button-filled-normal-large-grey-false-false-true w-full'
                onClick={() => modal.onCancel?.cancelEvent()}
                disabled={eventTrigger}
              >
                {modal.onCancel.name}
              </button>
            )}
            {modal.onConfirm && (
              <Fragment>
                <div className='w-4' />
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full'
                  disabled={isDisalbed}
                  onClick={() => {
                    setIsDisalbed(true);
                    modal.onConfirm?.confirmEvent() || setEventTrigger(true);
                  }}
                >
                  {eventTrigger ? (
                    <div className=' scale-[0.2]'>
                      <div id='loader-white' />
                    </div>
                  ) : (
                    <Fragment>{modal.onConfirm.name}</Fragment>
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
