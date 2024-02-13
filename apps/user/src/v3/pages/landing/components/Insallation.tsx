import { useNavigate } from 'react-router-dom';

import { PATH } from '@/common/constants';
import { installationImage1 } from '@/v3/pages/landing/assets';

export const Insallation = () => {
  const navigation = useNavigate();
  return (
    <div className='bg-purple-50 py-[100px]'>
      <div className='mx-auto flex w-[1100px] justify-center'>
        <div>
          <img src={installationImage1} />
        </div>
        <div className='ml-[100px] mt-[120px]'>
          <div className='text-L/Bold text-purple-600'>간단해요!</div>
          <div className='mt-[10px] text-XL/Medium leading-[34px] text-grey-700'>
            신청서만 작성하시면 <br />
            무료 방문 설치를 도와드려요.
          </div>
          <div className='mt-[50px] flex'>
            <button
              onClick={() => navigation(PATH.APPLY)}
              className='h-[48px] rounded-[8px] bg-purple-600 px-[24px] text-M/Bold leading-[48px] text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'
            >
              도입 문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
