import { Dispatch, Fragment } from 'react';
import { deleteReports, switchDeleteModal } from '@/containers/report';
import { MODAL_SIZE_ENUM } from '@/types/enum.code';

interface IReportListDeleteModalPrpos {
  _state: TReportListState;
  _dispatch: Dispatch<TReportListAction>;
  size: string;
}

export const ReportListDeleteModal = ({
  _state,
  _dispatch,
  size,
}: IReportListDeleteModalPrpos) => {
  const modalType = () => {
    return {
      title: (
        <Fragment>
          선택하신 <span className='text-orange-500'>{_state.checkedItems.length}개</span>
          의 키워드 리포트를
          <br />
          영구 삭제할까요?
        </Fragment>
      ),
      content: <Fragment>삭제된 리포트는 복구가 불가능해요</Fragment>,
      onCancel: {
        name: '취소',
        cancelEvent: () => switchDeleteModal(_dispatch, false),
      },
      onConfirm: {
        name: '삭제',
        confirmEvent: () => deleteReports(_state, _dispatch),
      },
    };
  };

  const modal: IModalType = modalType();

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
            <button
              type='button'
              className='button-outlined-normal-large-grey-false-false w-full '
              onClick={() => modal.onCancel.cancelEvent()}
            >
              {modal.onCancel.name}
            </button>
            {modal.onConfirm && (
              <Fragment>
                <div className='w-4' />
                <button
                  type='button'
                  className='button-filled-normal-large-red-false-false-true w-full'
                  onClick={() => modal.onConfirm!.confirmEvent()}
                >
                  {modal.onConfirm.name}
                </button>
              </Fragment>
            )}
          </footer>
        </div>
      </div>
    </Fragment>
  );
};
