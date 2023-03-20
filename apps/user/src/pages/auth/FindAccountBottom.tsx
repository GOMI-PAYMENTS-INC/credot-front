import { useNavigate } from 'react-router-dom';
import { PATH } from '@/types/enum.code';

export const FindAccountBottom = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-10 flex items-center justify-center text-center'>
      <div className='mr-1 text-M/Regular text-grey-700'>계정이 기억나셨나요?</div>
      <button
        className='textButton-primary-default-large-none'
        onClick={() => navigate(PATH.SIGN_IN)}
      >
        로그인 하러가기
      </button>
    </div>
  );
};
