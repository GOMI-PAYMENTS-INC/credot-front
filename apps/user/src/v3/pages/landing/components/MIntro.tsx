import { useNavigate } from 'react-router-dom';

import { PATH } from '@/common/constants';
import {
  floatingImg1,
  floatingImg2,
  floatingImg3,
  floatingImg4,
  monitor,
  prefund,
} from '@/v3/pages/landing/assets';

export const MIntro = () => {
  const navigation = useNavigate();
  return (
    <div className='h-[580px] w-full bg-purple-50 pt-[59px] text-center'>
      <div className='mx-auto w-full'>
        <div className='text-XL/Bold text-purple-600'>어제 매출, 오늘 정산 밧는닷!</div>
        <div className='mt-[10px] text-4XL/Bold text-purple-600'>크레닷.</div>
        <div className='mt-[50px] flex justify-center'>
          <button
            onClick={() => navigation(PATH.SIGN_IN)}
            className='h-[48px] rounded-[8px] border border-[#F5F5F5] bg-white px-[46px] text-M/Bold leading-[48px] text-grey-800 shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'
          >
            로그인
          </button>
          <div className='ml-[20px]'></div>
          <button
            onClick={() => navigation(PATH.APPLY)}
            className='h-[48px] rounded-[8px] bg-purple-600 px-[24px] text-M/Bold leading-[48px] text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'
          >
            도입 문의하기
          </button>
        </div>
        <div className='absolute top-[467px] left-[50%] translate-x-[-50%]'>
          <div className='relative'>
            <img src={prefund} width={294} className='absolute left-[13px] top-[13px]' />
            <img src={monitor} width={320} className='!max-w-none' />
            <div className='absolute left-[123px] bottom-[10px] h-[60px] w-[75px]  bg-gradient-to-b from-transparent to-purple-400/80' />
          </div>
        </div>
      </div>
    </div>
  );
};
