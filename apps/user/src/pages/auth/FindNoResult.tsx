import React from 'react';
import { Link } from 'react-router-dom';

import { PATH } from '@/router/routeList';

const FindNoResult = () => (
  <div className='flex h-screen w-full justify-center'>
    <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
      <div className=''>
        <h3 className='mb-5 text-center text-2XL/Bold'>계정 안내</h3>
        <p className='text-center text-L/Regular'>
          이전에 가입한 계정이 존재하지 않습니다.
        </p>
        <div className='mt-16 '>
          <Link to={PATH.SIGN_UP}>
            <button
              type='button'
              className='text-xl-medium flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-white'
            >
              회원가입 하러가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
export default FindNoResult;
