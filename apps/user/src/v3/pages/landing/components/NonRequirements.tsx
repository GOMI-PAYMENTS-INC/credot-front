import { nonRequirementsImage1 } from '@/v3/pages/landing/assets';

export const NonRequirements = () => {
  return (
    <div className='bg-grey-100'>
      <div className='py-[100px]'>
        <div className='mx-auto w-[1100px]'>
          <div className='text-center text-3XL/Medium leading-[40px] text-grey-900'>
            <div>복잡한 절차 없이</div>
            <div className='mt-[14px]'>가장 안전하고 빠른 정산 서비스를 제공해요</div>
          </div>
          <div className='mt-[20px] text-center text-XL/Medium text-grey-800'>
            크레닷은 가맹점주분께 아래 행위들을 절대 요구하지 않아요!
          </div>
        </div>
        <img
          src={nonRequirementsImage1}
          alt='복잡한 절차 없이 가장 안전하고 빠른 정산 서비스를 제공해요 크레닷은 가맹점주분께 아래 행위들을 절대 요구하지 않아요!'
          className='mx-auto mt-[60px]'
        />
      </div>
    </div>
  );
};
