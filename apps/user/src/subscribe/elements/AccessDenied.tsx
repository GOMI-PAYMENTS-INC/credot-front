import { useNavigate } from 'react-router-dom';
import { PATH } from '@/common/constants';

export const AccessDenied = () => {
  const navigator = useNavigate();

  return (
    <div className='flex h-full flex-col items-center justify-center gap-10'>
      <img src='/assets/images/MobileDenied.png' />
      <div className='text-center text-M/Regular text-grey-900'>
        <p>모바일에서는 결제가 진행되지 않습니다.</p>
        <p className='mt-[3px]'>PC로 접속해서 결제 진행해주세요.</p>
      </div>
      <button
        className='button-filled-normal-large-grey-false-false-true w-60'
        onClick={() => navigator(PATH.SEARCH_PRODUCTS, { replace: true })}
      >
        이전 화면으로
      </button>
    </div>
  );
};
