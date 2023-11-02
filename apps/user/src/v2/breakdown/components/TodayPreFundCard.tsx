import minusIcon from '@/v2/breakdown/assets/minus-icon.png';
import { useTodayPrefundHook } from '@/v2/breakdown/hooks/prefund.hook';

const MinusIcon = () => {
  return (
    <div className='mx-[50px] self-center'>
      <img src={minusIcon} />
    </div>
  );
};

export const TodayPreFundCard = () => {
  const { data: summary } = useTodayPrefundHook();
  return (
    <div>
      <div className='text-2XL/Bold text-grey-900'>오늘 선정산금</div>
      <div className='mt-[14px] flex'>
        <div className='w-full max-w-[232px] border border-grey-300 bg-grey-50 px-[24px] py-[28px]'>
          <div className='text-M/Bold'>선정산 금액</div>
          <div className='mt-[10px] text-2XL/Bold text-orange-400'>
            {(summary?.prefund || 0).toLocaleString()}원
          </div>
        </div>
        <div className='ml-[-1px] flex w-full border border-grey-300 bg-grey-50 px-[30px] py-[28px]'>
          <div>
            <div className='text-M/Medium text-grey-800'>전일 매출</div>
            <div className='mt-[10px] text-2XL/Bold text-grey-800'>
              {(summary?.preSalesPrice || 0).toLocaleString()}원
            </div>
          </div>
          <MinusIcon />
          <div>
            <div className='text-M/Medium text-grey-800'>전일 카드사 수수료</div>
            <div className='mt-[10px] text-2XL/Regular text-grey-800'>
              {Math.abs(summary?.preCardCommission || 0).toLocaleString()}원
            </div>
          </div>
          <MinusIcon />
          <div>
            <div className='text-M/Medium text-grey-800'>서비스 수수료</div>
            <div className='mt-[10px] text-2XL/Regular text-grey-800'>
              {Math.abs(summary?.serviceCommission || 0).toLocaleString()}원
            </div>
          </div>
          <MinusIcon />
          <div>
            <div className='text-M/Medium text-grey-800'>과정산 금액</div>
            <div className='mt-[10px] text-2XL/Regular text-grey-800'>
              {Math.abs(summary?.setoff || 0).toLocaleString()}원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
