import { mNonRequirements } from '@/v3/pages/landing/assets';

export const MNonRequirements = () => {
  return (
    <div className='bg-grey-100'>
      <div className='py-[80px]'>
        <div className='mx-auto'>
          <div className='text-center text-XL/Medium text-grey-900'>
            <div className='leading-[32px]'>
              복잡한 절차 없이 가장 안전하고
              <br /> 빠른 정산 서비스를 제공해요
            </div>
          </div>
          <div className='mt-[20px] text-center text-L/Medium text-grey-800'>
            크레닷은 아래 행위들을 절대 요구하지 않아요!
          </div>
        </div>
        <img
          src={mNonRequirements}
          alt='복잡한 절차 없이 가장 안전하고 빠른 정산 서비스를 제공해요 크레닷은 가맹점주분께 아래 행위들을 절대 요구하지 않아요!'
          className='mx-auto mt-[40px]'
        />
      </div>
    </div>
  );
};
