import { ReactElement } from 'react';

import { clickIcon, shakeHandIcon, starIcon } from '@/v3/pages/landing/assets';

function FutureFundItem({
  text,
  icon,
  iconWidth = 150,
}: {
  iconWidth?: number;
  icon: string;
  text: ReactElement;
}) {
  return (
    <div className='relative h-[164px] w-[164px] rounded-[100%] border-[2px] border-purple-400 bg-white'>
      <div className='flex h-[90px]'>
        <img src={icon} className='mx-auto self-center' width={iconWidth} />
      </div>
      <div className='relative z-[9999] pt-[10px] text-center text-M/Bold text-white'>
        {text}
      </div>
      <svg
        className='absolute left-0 bottom-0'
        xmlns='http://www.w3.org/2000/svg'
        width='158'
        height='79'
        viewBox='0 0 158 79'
        fill='none'
      >
        <path
          d='M158 0C158 43.6305 122.63 79 79 79C35.3695 79 0 43.6305 0 0C0 0.00223081 35.3695 12.5282 79 12.5282C122.63 12.5282 158 0 158 0Z'
          fill='#32114F'
        />
      </svg>
    </div>
  );
}

export const FutureFund = () => {
  return (
    <div className='relative mt-[90px] inline-block w-full bg-[#621A9D] py-[86px]'>
      <div className='mx-auto w-[1100px]'>
        <div className='text-center text-3XL/Bold leading-[56px] text-white'>
          D+1일 정산을 넘어, <br /> 미래 매출에 대한 정산까지!
        </div>
        <div className='mt-[40px] text-center text-XL/Medium leading-[32px] text-white'>
          미래 정산 서비스는 미래에 발생할 매출을 예측하여 <br />
          미리 정산 받을 수 있는 서비스입니다.
        </div>
        <div className='mt-[60px] text-center'>
          <button className='h-[48px] rounded-[8px] border-[#F5F5F5] bg-white px-[46px] text-M/Bold leading-[48px] text-grey-900 shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
            자세히 알아보기
          </button>
        </div>
        <div className='mt-[80px] flex justify-center gap-20'>
          <FutureFundItem
            icon={starIcon}
            text={
              <>
                신용도에 <br />
                영향 없이!
              </>
            }
            iconWidth={67}
          />
          <FutureFundItem
            icon={clickIcon}
            text={
              <>
                클릭 한 번이면 <br />
                당일 입금!
              </>
            }
            iconWidth={67}
          />
          <FutureFundItem
            icon={shakeHandIcon}
            text={
              <>
                필요할 때 <br />
                원하는 만큼!
              </>
            }
            iconWidth={67}
          />
        </div>
      </div>
    </div>
  );
};
