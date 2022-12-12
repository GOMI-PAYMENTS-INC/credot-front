import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '@/components/layouts/layout';
import { Paths } from '@/router/paths';

const FindNoResultPage = () => (
  <Layout>
    <div className='flex h-screen w-full justify-center'>
      <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
        <div className=''>
          <h3 className='mb-5 text-center text-2xl-bold'>계정 안내</h3>
          <p className='text-center text-l-regular'>
            이전에 가입한 계정이 존재하지 않습니다.
          </p>
          <div className='mt-16 '>
            <Link to={Paths.signUp}>
              <button
                type='button'
                className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
              >
                회원가입 하러가기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
export default FindNoResultPage;
