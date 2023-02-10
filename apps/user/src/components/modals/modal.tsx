import { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

/*
handleOk : 모달이 완료된 다음 일어날 일
handleCancel : 모달을 닫을 때 일어날 일
* */
interface ModalComponentProps {
  children: ReactNode;
  isOpen: boolean;
  content?: string;
  action?: () => void;
}
export const ModalComponent = ({ isOpen, children }: ModalComponentProps) => {
  return ReactDOM.createPortal(
    isOpen ? (
      <div className='fixed top-0 z-50 flex  h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 p-4 text-center md:inset-0 md:h-full'>
        <div className='relative h-[244px] w-[400px] max-w-md md:h-auto'>
          <div className='relative rounded bg-white  px-5 py-7 '>{children}</div>
        </div>
      </div>
    ) : null,
    document.body,
  );
};
