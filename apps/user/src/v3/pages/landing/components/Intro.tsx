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

export const Intro = () => {
  const navigation = useNavigate();
  return (
    <div className='h-[820px] w-full overflow-hidden bg-purple-50 pt-[59px] text-center'>
      <div className='mx-auto w-[1100px]'>
        <div className='relative'>
          <div className='animation-ico absolute left-[-50px] top-[67px]'>
            <img src={floatingImg1} width={187} />
          </div>
          <div className='animation-ico absolute left-[-140px] top-[340px]'>
            <img src={floatingImg2} width={197} />
          </div>
          <div className='animation-ico absolute right-0 top-[40px]'>
            <img src={floatingImg3} width={200} />
          </div>
          <div className='animation-ico absolute top-[370px] right-[-100px]'>
            <img src={floatingImg4} width={197} />
          </div>
        </div>
        <div className='text-2XL/Bold text-purple-600'>
          오늘 매출, 내일 정산 받는 카드 단말기
        </div>
        <div className='text-[70px] font-black text-purple-600'>크레닷.</div>
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
        <div className='mt-[70px] flex justify-center'>
          <div className='relative'>
            <img
              src={prefund}
              className='absolute left-[30px] top-[29px] min-w-[651px] max-w-[651px]'
            />
            <img src={monitor} className='min-w-[710px] max-w-[710px]' />
          </div>
        </div>
      </div>
    </div>
  );
};
