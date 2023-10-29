import { useState } from 'react';

import Calculator from '@/v2/landing/assets/calculator.png';
import { SearchModal } from '@/v2/landing/components/SearchModal';

export const FloatingButton = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`${
          isOpen ? 'invisible translate-y-3' : 'visible -translate-y-3'
        } fixed right-[120px] bottom-[120px] w-[256px] w-full cursor-pointer rounded-[100px] bg-gradient-to-b from-grey-800 to-[#323131] py-[14px] px-[32px] text-white shadow-[0px_8px_16px_rgba(0,0,0,0.08)] transition-all`}
      >
        <div className='flex justify-center'>
          <div className='mr-[20px]'>
            <img src={Calculator} width={50} />
          </div>
          <div>
            <div className='text-L/Bold'>오늘 받을 수 있는</div>
            <div className='text-L/Bold'>정산금 조회하기</div>
          </div>
        </div>
      </div>
      <SearchModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};
