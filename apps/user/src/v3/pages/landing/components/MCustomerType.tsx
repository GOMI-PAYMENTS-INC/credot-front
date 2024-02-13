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
        <div className='text-center text-XL/Medium leading-[32px] text-grey-800'>
          사용중인 단말기가 있어도 <br /> 크래닷 단말기를 사용할 수 있어요!
        </div>
        <div className='mt-[30px] flex flex-col items-center'>
          <CustomerTypeCard
            img={customerTypeCardImage1}
            title='예비 창업자'
            content={
              <>
                매장을 오픈하실 예정인가요? <br />
                빠른 정산이 가능한 크래닷 단말기를 통해 <br />
                사장님의 비즈니스를 성공시키세요.
              </>
            }
          />
          <div className='mt-[40px]' />
          <CustomerTypeCard
            img={customerTypeCardImage2}
            title='기존 사업자'
            content={
              <>
                이미 카드 단말기가 있으시다구요? 상관없 <br />
                어요! 사용하던 단말기 옆에 추가로 빠른 <br />
                정산용 크레닷 단말기를 설치해드릴게요.
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};
