import { Dispatch, Fragment } from 'react';
import { switchModal } from '@/containers/search';
type TSearchModalType =
  | 'SameKeywordReportExisted'
  | 'LessMonthlyKeywordVolumn'
  | 'NotBeOverDayReport';

interface ISearchModalPrpos {
  type: TSearchModalType;
  createdAt: string;
  state: TState;
  dispatch: Dispatch<TAction>;
}

const modalConfig = (createdAt: string) => {
  return {
    SameKeywordReportExisted: {
      title: '동일한 키워드 리포트가 있어요.',
      content: `최근 생성일 : ${createdAt} \n 리포트를 새로 생성할까요?`,
      onCancel: {
        name: '다른 키워드 검색',
        cancelEvent: () => {
          console.log('cancel');
        },
      },
      onConfirm: {
        name: '새로 생성하기',
        confirmEvent: () => {},
      },
    },
    LessMonthlyKeywordVolumn: {
      title: '키워드 수요가 많지 않아요!',
      content: '다른 키워드로 리포트를 생성하는걸 권장드려요.',
      onCancel: {
        name: '그래도 생성하기',
        cancelEvent: () => {
          console.log('cancel');
        },
      },
      onConfirm: {
        name: '다른 키워드 검색',
        clickEvent: () => {},
      },
    },
    NotBeOverDayReport: {
      title: '24시간 이내로 발행한 동일한 키워드 리포트가 있어요.',
      content: `생성일 : ${createdAt} 다른 키워드로 다시 검색해주세요.`,
      onCancel: {
        name: '다른 키워드 검색',
        cancelEvent: () => {
          console.log('cancel');
        },
      },
    },
  };
};

export const SearchModal = ({ state, dispatch, type, createdAt }: ISearchModalPrpos) => {
  // const { state, dispatch, type, createdAt } = props;
  // type에 따라 값을 넣어주자
  const config = modalConfig(createdAt)[type];
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
          onClick={() => config.onCancel.cancelEvent}
        >
          {config.onCancel.name}
        </button>

        <button
          type='button'
          className='button-filled-normal-large-primary-false-false-true h-[48px] w-[172px] border-none bg-orange-500'
          onClick={() => console.log('액션 버튼')}
        >
          두번째 버튼
        </button>
      </footer>
    </Fragment>
  );
};
