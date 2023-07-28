import { useNavigate } from 'react-router-dom';
import { PATH } from '@/types/enum.code';

export const FindAccountBottom = (props: { text?: string }) => {
  const navigate = useNavigate();
  return (
    <div className='mt-10 flex items-center justify-center text-center xs:hidden'>
      <div className='mr-1 text-M/Regular text-grey-700'>
        {props.text ? props.text : '이미 계정이 있으신가요?'}
      </div>
      <button
        className='textButton-primary-default-large-none'
        onClick={() => navigate(PATH.SIGN_IN)}
      >
        로그인 하러가기
      </button>
    </div>
  );
};
