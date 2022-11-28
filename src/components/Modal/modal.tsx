import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Icons } from '@/components/icons';

interface ModalComponentProps {
  children: ReactNode;
  isModalVisible: boolean;
  hide: () => void;
  title: string;
}

const ModalComponent = ({ isModalVisible, hide, title, children }: ModalComponentProps) =>
  isModalVisible
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            id='authentication-modal'
            aria-hidden='true'
            className='h-modal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-primary-black/60 p-4 md:inset-0 md:h-full'
          >
            <div className='relative h-full w-full max-w-md md:h-auto'>
              <div className='relative max-w-[25rem] rounded bg-white  px-5 py-10 '>
                <button
                  type='button'
                  className=' absolute right-6 top-6 cursor-pointer'
                  onClick={hide}
                >
                  <Icons.Close />
                  <span className='sr-only'>Close modal</span>
                </button>
                <div>
                  <h3 className='pb-4 text-center text-600-bold'>{title}</h3>
                  <div>{children}</div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;

export default ModalComponent;
