import { useNavigate } from 'react-router-dom';

import { PATH } from '@/common/constants';
import { serviceBenefitImage } from '@/v3/pages/landing/assets';

export const ServiceBenefit2 = () => {
  const navigation = useNavigate();

  return (
    <div className=''>
      <div className='py-[100px]'>
        <div className='mx-auto w-[1100px]'>
          <div className='text-center text-3XL/Medium leading-[40px] text-grey-800'>
            <div>크레닷 단말기의 특.별.함.</div>
            <div className='mt-[14px]'>여기서 끝이 아니에요!</div>
          </div>
        </div>
        <img
          src={serviceBenefitImage}
          alt='복잡한 절차 없이 가장 안전하고 빠른 정산 서비스를 제공해요 크레닷은 가맹점주분께 아래 행위들을 절대 요구하지 않아요!'
          className='mx-auto mt-[60px]'
        />
        <div className='mt-[50px] flex justify-center'>
          <button
            onClick={() => navigation(PATH.APPLY)}
            className='h-[48px] rounded-[8px] bg-purple-600 px-[24px] text-M/Bold leading-[48px] text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'
          >
            도입 문의하기
          </button>
        </div>
      </div>
    </div>
  );
};
