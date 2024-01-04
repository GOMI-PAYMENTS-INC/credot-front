import { ReactElement } from 'react';

import {
  customerTypeCardImage1,
  customerTypeCardImage2,
} from '@/v3/pages/landing/assets';
import { CustomerTypeCard } from '@/v3/pages/landing/components/CustomerType';

export const MCustomerType = () => {
  return (
    <div className='py-[87px]'>
      <div className='mx-auto'>
        <div className='text-center text-2XL/Medium leading-[30px]'>
          <div>
            <span className='font-bold text-purple-600'>사업자분</span>들의 매출을
          </div>
          <div className='mt-[14px]'>
            <span className='bg-purple-100 font-bold text-purple-600'>단 하루</span>
            만에 정산해드려요.
          </div>
        </div>
        <div className='mt-[60px] flex flex-col items-center'>
          <CustomerTypeCard
            img={customerTypeCardImage1}
            title='예비 창업자'
            content={
              <>
                오프라인 매장을 창업하실 예정인가요? <br />
                카드 단말기 설치부터 익일 정산 서비스까지, <br />
                크레닷이 성공 파트너가 되어드릴께요.
              </>
            }
          />
          <div className='mt-[40px]' />
          <CustomerTypeCard
            img={customerTypeCardImage2}
            title='기존 사업자'
            content={
              <>
                매장을 운영중이신가요? 크래닷이 카드사 <br />
                정산 주기를 앞당겨드리고, 아직 발생하지 않은 <br />
                미래의 매출까지도 정산해드릴께요!
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};
