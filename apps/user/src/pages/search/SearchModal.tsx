import { Dispatch, Fragment } from 'react';
import { switchModal } from '@/containers/search';

export enum MODAL_TYPE_ENUM {
  SameKeywordReportExisted = 'SameKeywordReportExisted',
  LessMonthlyKeywordVolumn = 'LessMonthlyKeywordVolumn',
  NotBeOverDayReport = 'NotBeOverDayReport',
}

interface ICancelClickEvent {
  name: string;
  cancelEvent: () => void;
}
interface IConfirmClickEvent {
  name: string;
  confirmEvent: () => void;
}
interface IModalType {
  title: string;
  content: JSX.Element;
  onCancel: ICancelClickEvent;
  onConfirm?: IConfirmClickEvent;
}

interface ISearchModalPrpos {
  data?: any;
  _state: TState;
  _dispatch: Dispatch<TAction>;
}

export const SearchModal = ({ _state, _dispatch, data }: ISearchModalPrpos) => {
  const { createdAt } = _state;
  const modalType = () => {
    switch (_state.modalType) {
      case MODAL_TYPE_ENUM.LessMonthlyKeywordVolumn:
        return {
          title: '키워드 수요가 많지 않아요!',
          content: <p>다른 키워드로 리포트를 생성하는걸 권장드려요.</p>,
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
            <p>
              생성일 : {`${createdAt}`}
              <br />
              다른 키워드로 다시 검색해주세요.
            </p>
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
            <p>
              최근 생성일 : {`${createdAt}`}
              <br />
              리포트를 새로 생성할까요?
            </p>
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
      <header>
        <h3 className='text-center text-2XL/Bold'>{modal.title}</h3>
      </header>
      {modal.content && <section className='pt-6 text-L/Medium'>{modal.content}</section>}

      <footer className='flex justify-between pt-8'>
        <button
          type='button'
          className='button-filled-normal-large-primary-false-false-true h-[48px] w-[172px] border-none bg-grey-200 text-grey-800'
          onClick={() => modal.onCancel.cancelEvent()}
        >
          {modal.onCancel.name}
        </button>
        {modal.onConfirm && (
          <button
            type='button'
            className='button-filled-normal-large-primary-false-false-true h-[48px] w-[172px] border-none bg-orange-500'
            onClick={() => modal.onConfirm!.confirmEvent()}
          >
            {modal.onConfirm.name}
          </button>
        )}
      </footer>
    </Fragment>
  );
};
