import { useState } from 'react';

import { authReturnUrl } from '@/auth/container';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { useInterval } from '@/components/useInterval';
import { PATH } from '@/types/enum.code';
import { isTruthy } from '@/utils/isTruthy';
interface IWelcomeModal {
  closingTime: number | null;
  path: PATH;
}

export const WelcomeModal = (props: IWelcomeModal) => {
  const { closingTime, path } = props;
  const [isOpen, setIsOpen] = useState(true);
  const { moveToMain } = authReturnUrl();

  useInterval(() => {
    setIsOpen(false);
    moveToMain(path);
  }, closingTime);

  return (
    <ModalComponent isOpen={isTruthy(closingTime) || isOpen}>
      <div className='flex h-full max-h-[283px] w-full max-w-[293px] flex-col items-center overflow-hidden rounded-[10px] bg-white'>
        <div className='px-6 pt-6'>
          <h1 className='text-L/Bold text-grey-900'>회원가입 완료!</h1>
        </div>
        <div className='h-[200px] w-[200px]'>
          <img src='/assets/images/Success.gif' />
        </div>
      </div>
    </ModalComponent>
  );
};
