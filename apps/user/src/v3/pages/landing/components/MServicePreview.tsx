import { mServicePreview, prefundCycle } from '@/v3/pages/landing/assets';

export const MServicePreview = () => {
  return (
    <div className='bg-grey-50 pt-[110px] pb-[170px]'>
      <div className='mx-auto text-center'>
        <div className='text-XL/Bold text-orange-500'>간단해요!</div>
        <div className='mt-[20px] text-2XL/Bold leading-[40px] text-grey-900'>
          정산금을 미리 받고, <br /> 카드사 정산일에 상환해주세요.
        </div>
        <div className='mt-[30px]'>
          <img src={mServicePreview} className='mx-auto' width={320} />
        </div>
      </div>
    </div>
  );
};
