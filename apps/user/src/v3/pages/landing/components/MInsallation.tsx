import { installationImage1 } from '@/v3/pages/landing/assets';

export const MInsallation = () => {
  return (
    <div className='w-full bg-purple-50 py-[80px]'>
      <div className='mx-auto'>
        <div className='flex flex-col'>
          <div className='text-center text-L/Bold text-purple-600'>간단해요!</div>
          <div className='mt-[10px] text-center text-XL/Medium leading-[34px] text-grey-700'>
            신청서만 작성하시면 <br />
            무료 방문 설치를 도와드려요.
          </div>
        </div>
        <div className='mt-[30px] px-[20px]'>
          <img src={installationImage1} />
        </div>
      </div>
    </div>
  );
};
