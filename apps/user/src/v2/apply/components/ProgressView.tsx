import ProgressImg from '@/v2/apply/assets/progress-img.png';

export const ProgressView = () => {
  return (
    <div className='mx-auto flex flex-col overflow-hidden rounded-[10px]'>
      <div className='flex items-center self-center'>
        <img src={ProgressImg} width={40} className='mr-[18px]' />
        <div className='text-L/Medium text-grey-800'>정산금을 조회중이에요...</div>
      </div>
      <div className='flex items-end justify-center'>
        <span className='self-center text-M/Medium leading-[28px] text-grey-900'>약</span>{' '}
        <span className='px-[10px] text-XL/Bold leading-[28px] text-orange-400'>
          15초
        </span>{' '}
        <span className='translate-y-[2px] self-end text-S/Medium leading-[28px] text-grey-700'>
          소요
        </span>
      </div>
    </div>
  );
};
