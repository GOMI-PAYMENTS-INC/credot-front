import React from 'react';
import { Link } from 'react-router-dom';

import { PATH } from '@/router/routeList';

export const FindIdPasswordBottom = () => (
  <div className='flex items-center justify-center text-center'>
    <div className='mr-1 text-M/Regular'>계정이 기억나셨나요?</div>
    <Link to={PATH.SIGN_IN}>
      <button className='textButtonPrimary'>로그인 하러가기</button>
    </Link>
  </div>
);
