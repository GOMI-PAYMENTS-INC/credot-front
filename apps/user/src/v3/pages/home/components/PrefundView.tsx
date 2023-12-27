import { isMobile } from 'react-device-detect';

import { useTodayFutureFundHook } from '@/v3/pages/home/hooks/future-fund.hook';
import { useTodayPrefundHook } from '@/v3/pages/home/hooks/prefund.hook';

function noPrefund(totalFund: number) {
  return totalFund !== 0;
}

export const PrefundView = () => {
  const { data: prefund } = useTodayPrefundHook();
  const { data: futureFund } = useTodayFutureFundHook();

  const prefundPrice = prefund?.prefund || 0;
  const futureFundPrice = futureFund?.applyPrice || 0;
  const totalFund = prefundPrice + futureFundPrice;
  return (
    <div className={`${isMobile ? 'py-[63px] pl-[34px]' : ''}`}>
      <div
        className={`${
          isMobile ? 'text-[30px] leading-[40px]' : 'text-[40px] leading-[50px]'
        } font-[400]  text-white`}
      >
        {noPrefund(totalFund) ? (
          <>
            오늘은 {isMobile ? <br /> : ''}
            <span className='font-[900] text-[#FFD872]'>
              {totalFund.toLocaleString()}원
            </span>
            을 <br />
            미리 정산 받을 예정이에요!
          </>
        ) : (
          <>
            오늘은 {isMobile ? <br /> : ''}
            선정산 받을 금액이 <br />
            존재하지 않아요.
          </>
        )}
      </div>
      <div className='mt-[24px] text-M/Regular leading-[24px] text-white'>
        선정산금 : {prefundPrice.toLocaleString()}원 {isMobile ? <br /> : 'ㅣ'} 미래
        정산금 {futureFundPrice.toLocaleString()}원
      </div>
    </div>
  );
};
