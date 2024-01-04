import { useRecoilState } from 'recoil';

import minusIcon from '@/v2/prefund/assets/minus-icon.png';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { usePrefundSummary } from '@/v2/prefund/hooks';

const MinusIcon = () => {
  return (
    <div className='mx-[50px] self-center'>
      <img src={minusIcon} />
    </div>
  );
};

export const SummaryPreFundCard = () => {
  const [filter] = useRecoilState(PrefundFilterAtom);
  const { data: summaryData } = usePrefundSummary(
    filter.termRange[0].format('YYYY-MM-DD'),
    filter.userId,
  );

  return (
    <div className='w-full py-[20px]'>
      <div className='mx-auto flex w-[1280px] flex-col justify-start'>
        <div className='mt-[14px] flex'>
          <div className='mr-[28px] w-full max-w-[232px] border border-grey-300 bg-grey-50 px-[24px] py-[28px]'>
            <div className='text-M/Bold'>선정산 금액</div>
            <div className='mt-[10px] text-XL/Bold text-purple-400'>
              {(summaryData?.prefundPrice || 0).toLocaleString()}원
            </div>
          </div>
          <div className='ml-[-1px] flex w-full border border-grey-300 bg-grey-50 px-[30px] py-[28px]'>
            <div className='w-[230px]'>
              <div className='text-M/Medium text-grey-800'>카드 매출</div>
              <div className='mt-[10px] text-XL/Bold text-grey-800'>
                {(summaryData?.salesPrice || 0).toLocaleString()}원
              </div>
            </div>
            <MinusIcon />
            <div className='w-[130px]'>
              <div className='text-M/Medium text-grey-800'>카드사 수수료</div>
              <div className='mt-[10px] text-XL/Regular text-grey-800'>
                {(summaryData?.cardCommission || 0).toLocaleString()}원
              </div>
            </div>
            <MinusIcon />
            <div>
              <div className='text-M/Medium text-grey-800'>서비스 수수료</div>
              <div className='mt-[10px] text-XL/Regular text-grey-800'>
                {(summaryData?.serviceCommission || 0).toLocaleString()}원
              </div>
            </div>
            <MinusIcon />
            <div>
              <div className='text-M/Medium text-grey-800'>과정산 금액</div>
              <div className='mt-[10px] text-XL/Regular text-grey-800'>
                {(summaryData?.setoff || 0).toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[14px] flex'>
          <div className='mr-[28px] w-full max-w-[232px] border border-grey-300 bg-grey-50 px-[24px] py-[28px]'>
            <div className='text-M/Bold'>실제 입금액</div>
            <div className='mt-[10px] text-XL/Bold text-purple-400'>
              {(summaryData?.depositPrice || 0).toLocaleString()}원
            </div>
          </div>
          <div className='ml-[-1px] flex w-full border border-grey-300 bg-grey-50 px-[30px] py-[28px]'>
            <div className='w-[230px]'>
              <div className='text-M/Medium text-grey-800'>선정산 금액</div>
              <div className='mt-[10px] text-XL/Bold text-grey-800'>
                {(summaryData?.prefundPrice || 0).toLocaleString()}원
              </div>
            </div>
            <MinusIcon />
            <div className='w-[130px]'>
              <div className='text-M/Medium text-grey-800'>미래정산 상환</div>
              <div className='mt-[10px] text-XL/Regular text-grey-800'>
                {(summaryData?.repaymentPrice || 0).toLocaleString()}원
              </div>
            </div>
            <MinusIcon />
            <div>
              <div className='text-M/Medium text-grey-800'>미래정산금 수수료</div>
              <div className='mt-[10px] text-XL/Regular text-grey-800'>
                {(summaryData?.repaymentFees || 0).toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
