import { ReactElement } from 'react';

import {
  customerTypeCardImage1,
  customerTypeCardImage2,
} from '@/v3/pages/landing/assets';

export function CustomerTypeCard({
  img,
  title,
  content,
}: {
  img: string;
  title: string;
  content: ReactElement;
}) {
  return (
    <div className='w-[365px] overflow-hidden bg-grey-100'>
      <img src={img} className='rounded-tl-[8px] rounded-tr-[8px]' width={365} />
      <div className='rounded-bl-[8px] rounded-br-[8px] border border-grey-300 bg-grey-100 p-[28px]'>
        <div className='text-2XL/Bold text-grey-800'>{title}</div>
        <div className='my-[14px] h-[1px] bg-grey-300'></div>
        <div className='text-M/Regular leading-[34px] text-grey-800'>{content}</div>
        <div className='mt-[20px]'>
          <button className='rounded-[8px] border border-grey-300 bg-white py-[8px] px-[14px] text-M/Medium text-grey-800'>
            자세히 알아보기
          </button>
        </div>
      </div>
    </div>
  );
}

export const CustomerType = () => {
  return (
    <div className='py-[100px]'>
      <div className='mx-auto w-[1100px]'>
        <div className='text-center text-3XL/Medium leading-[40px]'>
          <div>
            <span className='font-bold text-purple-600'>사업자분</span>들의 매출을
          </div>
          <div className='mt-[14px]'>
            <span className='bg-purple-100 font-bold text-purple-600'>단 하루</span>
            만에 정산해드려요.
          </div>
        </div>
        <div className='mt-[60px] flex flex-row justify-center gap-12'>
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
          <CustomerTypeCard
            img={customerTypeCardImage2}
            title='기존 사업자'
            content={
              <>
                매장을 운영중이신가요? 크레닷이 카드사 <br />
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
