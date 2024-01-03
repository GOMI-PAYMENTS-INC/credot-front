import { prefundCycle } from '@/v3/pages/landing/assets';

export const ServicePreview = () => {
  return (
    <div className='bg-grey-50 pt-[110px] pb-[170px]'>
      <div className='mx-auto w-[1100px] text-center'>
        <div className='text-XL/Bold text-orange-500'>간단해요!</div>
        <div className='mt-[20px] text-3XL/Bold leading-[55px] text-grey-900'>
          정산금을 미리 받고, <br /> 카드사 정산일에 상환해주세요.
        </div>
        <div className='mt-[90px] ml-[-20px]'>
          <img src={prefundCycle} className='mx-auto' width={1100} />
        </div>
      </div>
    </div>
  );
};
