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
  content: string;
  onCancel: ICancelClickEvent;
  onConfirm?: IConfirmClickEvent;
}

interface ISearchModalPrpos {
  createdAt: string;
  state: TState;
  dispatch: Dispatch<TAction>;
}

const modalType = (createdAt: string, state: TState, dispatch: Dispatch<TAction>) => {
  return {
    SameKeywordReportExisted: {
      title: '동일한 키워드 리포트가 있어요.',
      content: `최근 생성일 : ${createdAt} \n 리포트를 새로 생성할까요?`,
      onCancel: {
        name: '다른 키워드 검색',
        cancelEvent: () => switchModal(dispatch, false),
      },
      onConfirm: {
        name: '새로 생성하기',
        confirmEvent: () => {
          console.log('생성');
        },
      },
    },
    LessMonthlyKeywordVolumn: {
      title: '키워드 수요가 많지 않아요!',
      content: '다른 키워드로 리포트를 생성하는걸 권장드려요.',
      onCancel: {
        name: '다른 키워드 검색',
        cancelEvent: () => switchModal(dispatch, false),
      },
      onConfirm: {
        name: '그래도 생성하기',
        confirmEvent: () => {
          console.log('생성');
        },
      },
    },
    NotBeOverDayReport: {
      title: '24시간 이내로 발행한 동일한 키워드 리포트가 있어요.',
      content: `생성일 : ${createdAt} 다른 키워드로 다시 검색해주세요.`,
      onCancel: {
        name: '다른 키워드 검색',
        cancelEvent: () => switchModal(dispatch, false),
      },
    },
  };
};

export const SearchModal = ({ state, dispatch, createdAt }: ISearchModalPrpos) => {
  const config: IModalType = modalType(createdAt, state, dispatch)[state.modalType];

  return (
    <Fragment>
      <header>
        <h3 className='text-center text-2XL/Bold'>{config.title}</h3>
      </header>
      {config.content && (
        <section className='pt-6 text-L/Medium'>{config.content}</section>
      )}

      <footer className='flex justify-between pt-8'>
        <button
          type='button'
          className='button-filled-normal-large-primary-false-false-true h-[48px] w-[172px] border-none bg-grey-200 text-grey-800'
          onClick={() => config.onCancel.cancelEvent()}
        >
          {config.onCancel.name}
        </button>
        {config.onConfirm ? (
          <button
            type='button'
            className='button-filled-normal-large-primary-false-false-true h-[48px] w-[172px] border-none bg-orange-500'
            onClick={() => config.onConfirm!.confirmEvent()}
          >
            {config.onConfirm.name}
          </button>
        ) : null}
      </footer>
    </Fragment>
  );
};
