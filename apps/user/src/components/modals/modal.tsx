import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

/*
handleOk : 모달이 완료된 다음 일어날 일
handleCancel : 모달을 닫을 때 일어날 일
* */
interface ModalComponentProps {
  children: ReactNode;
  // hide: () => void;
  // title: string;
  // onCancel: () => void;
}
export const ModalComponent = () =>
  // const ModalComponent = ({ hide, title, children, onCancel }: ModalComponentProps) =>
  ReactDOM.createPortal(
    <div className='fixed top-0 z-50 flex  h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 p-4 text-center md:inset-0 md:h-full'>
      <div className='relative h-[244px] w-[400px] max-w-md md:h-auto'>
        <div className='relative rounded bg-white  px-5 py-7 '>
          <header>
            <h3 className='text-center text-2XL/Bold'>TEST이지요 호호호호호</h3>
          </header>
          <body className='pt-6 text-L/Medium'>
            최근 생성일 : 2022.01.09
            <br />
            리포트를 새로 생성할까요?
          </body>
          <footer className='flex justify-between pt-8'>
            <button
              type='button'
              className='button-filled-normal-large-primary-false-false-true h-[48px] w-[172px] border-none bg-grey-200 text-grey-800'
            >
              첫번째 버튼
            </button>

            <button
              type='button'
              className='button-filled-normal-large-primary-false-false-true h-[48px] w-[172px] border-none bg-orange-500'
            >
              두번째 버튼
            </button>
          </footer>
        </div>
      </div>
    </div>,
    document.body,
  );
