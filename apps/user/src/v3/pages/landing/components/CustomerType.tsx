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
      </div>
    </div>
  );
}

export const CustomerType = () => {
  return (
    <div className='bg-grey-50'>
      <div className='py-[100px]'>
        <div className='mx-auto w-[1100px]'>
          <div className='text-center text-3XL/Medium leading-[40px] text-grey-800'>
            <div>사용중인 단말기가 있어도</div>
            <div className='mt-[14px]'>크레닷 단말기를 사용할 수 있어요!</div>
          </div>
          <div className='mt-[60px] flex flex-row justify-center gap-12'>
            <CustomerTypeCard
              img={customerTypeCardImage1}
              title='예비 창업자'
              content={
                <>
                  매장을 오픈하실 예정인가요? <br />
                  빠른 정산이 가능한 크레닷 단말기를 통해 <br />
                  사장님의 비즈니스를 성공시키세요.
                </>
              }
            />
            <CustomerTypeCard
              img={customerTypeCardImage2}
              title='기존 사업자'
              content={
                <>
                  이미 약정이 걸린 카드 단말기가 있으시다구요? <br />
                  상관 없어요! 사용하던 단말기 옆에 추가로 <br />
                  빠른 정산용 크레닷 단말기를 설치해드릴께요.
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
