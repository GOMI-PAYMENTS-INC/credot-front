import { Dispatch, Fragment } from 'react';
import { switchModal } from '@/containers/search';
import { convertTime } from '@/utils/parsingTimezone';
import { MODAL_SIZE_ENUM } from '@/types/enum.code';

export enum MODAL_TYPE_ENUM {
  SameKeywordReportExisted = 'SameKeywordReportExisted',
  LessMonthlyKeywordVolumn = 'LessMonthlyKeywordVolumn',
  NotBeOverDayReport = 'NotBeOverDayReport',
}

interface ISearchModalPrpos {
  data?: any;
  _state: TState;
  _dispatch: Dispatch<TAction>;
  size: string;
}

export const SearchModal = ({ _state, _dispatch, data, size }: ISearchModalPrpos) => {
  const createdAt = convertTime(_state.createdAt, 'YYYY.MM.DD');
  const modalType = () => {
    switch (_state.modalType) {
      case MODAL_TYPE_ENUM.LessMonthlyKeywordVolumn:
        return {
          title: '키워드 수요가 많지 않아요!',
          content: <Fragment>다른 키워드로 리포트를 생성하는걸 권장드려요. </Fragment>,
          onCancel: {
            name: '다른 키워드 검색',
            cancelEvent: () => switchModal({ _dispatch }),
          },
          onConfirm: {
            name: '그래도 생성하기',
            confirmEvent: () => switchModal({ _dispatch, _state, data }),
          },
        };

      case MODAL_TYPE_ENUM.NotBeOverDayReport:
        return {
          title: '24시간 이내로 발행한 동일한 키워드 리포트가 있어요.',
          content: (
            <Fragment>
              생성일 : {`${createdAt}`}
              <br />
              다른 키워드로 다시 검색해주세요.
            </Fragment>
          ),
          onCancel: {
            name: '다른 키워드 검색',
            cancelEvent: () => switchModal({ _dispatch }),
          },
        };

      default:
        return {
          title: '동일한 키워드 리포트가 있어요.',
          content: (
            <Fragment>
              최근 생성일 : {`${createdAt}`}
              <br />
              리포트를 새로 생성할까요?
            </Fragment>
          ),
          onCancel: {
            name: '다른 키워드 검색',
            cancelEvent: () => switchModal({ _dispatch }),
          },
          onConfirm: {
            name: '새로 생성하기',
            confirmEvent: () => {
              switchModal({ _dispatch, _state, data });
            },
          },
        };
    }
  };

  const modal: IModalType = modalType();

  return (
    <Fragment>
      <div
        className={`${
          size === MODAL_SIZE_ENUM.LARGE ? ' h-[244px] w-[400px]' : 'h-[211px] w-[298px]'
        } relative max-w-md md:h-auto`}
      >
        <div className='relative rounded bg-white  px-5 py-7 '>
          <header>
            <h3
              className={`${
                size === MODAL_SIZE_ENUM.LARGE ? ' text-2XL/Bold' : 'text-L/Bold'
              } text-center`}
            >
              {modal.title}
            </h3>
          </header>
          {modal.content && (
            <section
              className={`${
                size === MODAL_SIZE_ENUM.LARGE ? 'text-L/Medium' : 'text-M/Medium'
              } pt-6  text-grey-800`}
            >
              {modal.content}
            </section>
          )}

          <footer className='flex justify-between pt-8'>
            <button
              type='button'
              className='button-filled-normal-large-grey-false-false-true w-full'
              onClick={() => modal.onCancel.cancelEvent()}
            >
              {modal.onCancel.name}
            </button>
            {modal.onConfirm && (
              <Fragment>
                <div className='w-4' />
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full'
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
