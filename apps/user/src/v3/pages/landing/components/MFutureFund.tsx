import { clickIcon, shakeHandIcon, starIcon } from '@/v3/pages/landing/assets';
import { FutureFundItem } from '@/v3/pages/landing/components/FutureFund';

export const MFutureFund = () => {
  return (
    <div className='relative inline-block w-full bg-[#621A9D] py-[86px]'>
      <div className='mx-auto'>
        <div className='text-center text-2XL/Bold leading-[40px] text-white'>
          익일 정산을 넘어, <br /> 미래의 매출에 대한 정산까지!
        </div>
        <div className='mt-[40px] text-center text-XL/Medium leading-[32px] text-white'>
          미래 정산 서비스는 미래에 발생할 <br /> 매출을 예측하여 미리 정산 <br /> 받을 수
          있는 서비스입니다.
        </div>
        <div className='mt-[50px] flex flex-col items-center gap-10'>
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
        <div className='mt-[60px] text-center'>
          <button className='h-[48px] rounded-[8px] border-[#F5F5F5] bg-white px-[46px] text-M/Bold leading-[48px] text-grey-900 shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
            자세히 알아보기
          </button>
        </div>
      </div>
    </div>
  );
};
