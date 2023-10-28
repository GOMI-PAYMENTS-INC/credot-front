import minusIcon from '@/v2/breakdown/assets/minus-icon.png';

const MinusIcon = () => {
  return (
    <div className='mx-[50px] self-center'>
      <img src={minusIcon} />
    </div>
  );
};

export const TodayPreFundCard = () => {
  return (
    <div>
      <div className='text-XL/Bold'>오늘 선정산금</div>
      <div className='mt-[14px] flex'>
        <div className='w-full max-w-[232px] border border-grey-300 bg-grey-50 px-[24px] py-[28px]'>
          <div className='text-M/Bold'>선정산 금액</div>
          <div className='mt-[10px] text-2XL/Bold text-orange-400'>50,000,000원</div>
        </div>
        <div className='ml-[-1px] flex w-full border border-grey-300 bg-grey-50 px-[30px] py-[28px]'>
          <div>
            <div className='text-M/Medium text-grey-800'>선정산 금액</div>
            <div className='mt-[10px] text-2XL/Bold text-grey-800'>50,000,000원</div>
          </div>
          <MinusIcon />
          <div>
            <div className='text-M/Medium text-grey-800'>선정산 금액</div>
            <div className='mt-[10px] text-2XL/Regular text-grey-800'>50,000,000원</div>
          </div>
          <MinusIcon />
          <div>
            <div className='text-M/Medium text-grey-800'>선정산 금액</div>
            <div className='mt-[10px] text-2XL/Regular text-grey-800'>50,000,000원</div>
          </div>
          <MinusIcon />
          <div>
            <div className='text-M/Medium text-grey-800'>선정산 금액</div>
            <div className='mt-[10px] text-2XL/Regular text-grey-800'>50,000,000원</div>
          </div>
        </div>
      </div>
    </div>
  );
};
