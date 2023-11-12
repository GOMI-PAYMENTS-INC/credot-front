import minusIcon from '@/v2/breakdown/assets/minus-icon.png';
import plusIcon from '@/v2/breakdown/assets/plus-icon.png';
import { useTodayPrefundHook } from '@/v2/breakdown/hooks/prefund.hook';

const MinusIcon = () => {
  return (
    <div className='self-center'>
      <img src={minusIcon} />
    </div>
  );
};

const PlusIcon = () => {
  return (
    <div className='self-center'>
      <img src={plusIcon} />
    </div>
  );
};

export const MTodayPreFundCard = () => {
  const { data: summary } = useTodayPrefundHook();
  return (
    <div className='w-full px-[20px]'>
      <div className='text-2XL/Bold text-grey-900'>오늘 선정산금</div>
      <div className='mt-[40px] text-L/Bold text-grey-800'>선정산 금액</div>
      <div className='mt-[4px] text-3XL/Bold text-orange-400'>
        {(summary?.prefund || 0).toLocaleString()}원
      </div>
      <div className='mt-[24px] flex justify-between rounded-[8px] bg-grey-50 px-[14px] py-[14px]'>
        <div className='flex justify-start'>
          <PlusIcon />
          <div className='ml-[14px] text-S/Medium'>카드 매출</div>
        </div>
        <div className='text-S/Bold text-grey-800'>
          {(summary?.prefund || 0).toLocaleString()}원
        </div>
      </div>
      <div className='mt-[12px] flex justify-between rounded-[8px] bg-grey-50 px-[14px] py-[14px]'>
        <div className='flex justify-start'>
          <MinusIcon />
          <div className='ml-[14px] text-S/Medium'>카드사 수수료</div>
        </div>
        <div className='text-S/Regular text-grey-800'>
          {(summary?.preCardCommission || 0).toLocaleString()}원
        </div>
      </div>
      <div className='mt-[12px] flex justify-between rounded-[8px] bg-grey-50 px-[14px] py-[14px]'>
        <div className='flex justify-start'>
          <MinusIcon />
          <div className='ml-[14px] text-S/Medium'>서비스 수수료</div>
        </div>
        <div className='text-S/Regular text-grey-800'>
          {(summary?.serviceCommission || 0).toLocaleString()}원
        </div>
      </div>
      <div className='mt-[12px] flex justify-between rounded-[8px] bg-grey-50 px-[14px] py-[14px]'>
        <div className='flex justify-start'>
          <MinusIcon />
          <div className='ml-[14px] text-S/Medium'>과정산 금액</div>
        </div>
        <div className='text-S/Regular text-grey-800'>
          {(summary?.setoff || 0).toLocaleString()}원
        </div>
      </div>
    </div>
  );
};
