import { Divider, Input } from 'antd';
import { useState } from 'react';

import useScript from '@/components/useScript';
import { subtractIcon } from '@/v3/pages/landing/assets';

export const Calculator = () => {
  const [price, setPrice] = useState<number | undefined>(undefined);
  console.log(price);
  const cardFee = (price || 0) * 0.015;
  const settlementFee = (price || 0) * 0.004;
  return (
    <div className='w-full bg-gradient-to-b from-[#9811FF] to-[#450972] py-[92px]'>
      <div className='mx-auto w-[1100px]'>
        <div className='text-center text-3XL/Medium leading-[40px] text-white'>
          <div>크레닷 단말기</div>
          <div className='mt-[14px] font-bold'>수수료 계산기</div>
        </div>
        <div className='mt-[60px] flex flex-row justify-center gap-12'>
          <div className='w-[446px] rounded-[8px] bg-grey-100'>
            <div className='p-[28px]'>
              <div className='text-L/Medium text-black'>일 평균 매출(원)</div>
              <div className='mt-[10px] flex'>
                <Input
                  placeholder={'5,000,000'}
                  value={price?.toLocaleString()}
                  onChange={({ target }) =>
                    setPrice(Number(target.value?.match(/\d+/g)?.join('') || 0))
                  }
                  className='w-full'
                  size='large'
                />
                <div className='ml-[14px]'>
                  <button className='h-[48px] w-[114px] rounded-[8px] bg-purple-600 px-[24px] text-M/Bold leading-[48px] text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
                    계산하기
                  </button>
                </div>
              </div>
              <div className='mt-[20px] rounded-[8px] border border-grey-300 bg-white py-[24px] px-[24px]'>
                <div className='text-right text-M/Medium text-grey-800'>
                  사업자 구분 : 영세
                </div>
                <div className='mt-[33px] flex justify-between text-grey-800'>
                  <div className='self-center text-M/Medium text-grey-800'>일 매출</div>
                  <div className='text-XL/Medium text-grey-900'>
                    {(price || 0).toLocaleString()}원
                  </div>
                </div>
                <div className='mt-[20px] flex justify-between text-grey-800'>
                  <div className='flex self-center text-M/Regular text-grey-700'>
                    <img src={subtractIcon} className='mr-[10px] self-center' />
                    카드사 수수료(1.5%)
                  </div>
                  <div className='text-M/Regular text-grey-800'>
                    {cardFee.toLocaleString()}원
                  </div>
                </div>
                <div className='mt-[20px] flex justify-between text-grey-800'>
                  <div className='flex self-center text-M/Regular text-grey-700'>
                    <img src={subtractIcon} className='mr-[10px] self-center' />
                    선정산 수수료(0.4%)
                  </div>
                  <div className='text-M/Regular text-grey-800'>
                    {settlementFee.toLocaleString()}원
                  </div>
                </div>
                <Divider />
                <div className='mt-[33px] flex justify-between text-grey-800'>
                  <div className='self-center text-M/Medium text-grey-800'>
                    선정산 금액
                  </div>
                  <div className='text-XL/Medium text-purple-600'>
                    {((price || 0) - cardFee - settlementFee).toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
