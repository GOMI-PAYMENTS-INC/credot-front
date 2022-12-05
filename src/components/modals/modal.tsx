import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Icons } from '@/components/icons';

/*
handleOk : 모달이 완료된 다음 일어날 일
handleCancel : 모달을 닫을 때 일어날 일
* */
interface ModalComponentProps {
  children: ReactNode;
  hide: () => void;
  title: string;
  onCancel: () => void;
}

const ModalComponent = ({ hide, title, children, onCancel }: ModalComponentProps) =>
  ReactDOM.createPortal(
    <React.Fragment>
      <div
        id='authentication-modal'
        aria-hidden='true'
        className='h-modal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-primary-black/60 p-4 md:inset-0 md:h-full'
      >
        <div className='relative h-full w-full max-w-md md:h-auto'>
          <div className='relative rounded bg-white  px-5 py-10 '>
            <button
              type='button'
              className=' absolute right-6 top-6 cursor-pointer'
              onClick={hide}
            >
              <Icons.Close onClick={onCancel} />
              <span className='sr-only'>Close modal</span>
            </button>
            <div>
              <h3 className='mb-5 text-center text-2xl-bold'>{title}</h3>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body,
  );

export default ModalComponent;
