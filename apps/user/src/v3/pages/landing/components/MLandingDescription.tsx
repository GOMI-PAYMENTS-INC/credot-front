import { mLandingImage1 } from '@/v3/pages/landing/assets';

export const MLandingDescription = () => {
  return (
    <div className='my-[80px]'>
      <div className='mx-auto w-full'>
        <div className='text-center text-XL/Medium text-grey-800'>
          <div>이젠, 주말이나 공휴일 예외없이</div>
          <div className='mt-[14px]'>
            <span className='bg-purple-100 font-bold text-purple-600'>다음날 오전</span>에
            정산받으세요.
          </div>
        </div>
      </div>
      <img
        src={mLandingImage1}
        alt='이젠, 주말이나 공휴일 예외없이 다음날 오전에 정산받으세요.'
        className='mx-auto mt-[60px]'
      />
    </div>
  );
};
