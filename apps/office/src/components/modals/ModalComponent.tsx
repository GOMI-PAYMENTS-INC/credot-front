import type { JSX } from 'react';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
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
  return createPortal(
    isOpen ? (
      <div className='fixed top-0 z-50 flex  h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-20 p-4 text-center md:inset-0 md:h-full'>
        {children}
      </div>
    ) : null,
    document.body,
  ) as unknown as JSX.Element;
};
