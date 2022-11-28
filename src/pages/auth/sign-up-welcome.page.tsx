import React from 'react';

import Layout from '@/components/layouts/layout';

const SignUpWelcomePage = () => (
  <Layout>
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='w-full max-w-[26.25rem]'>
        <div className='flex flex-col items-center justify-center '>
          <h3 className='mb-4 text-center text-2xl-bold'>회원가입 완료</h3>
          <p className='mb-5 text-l-regular'>
            고미키워드 회원이 되신 걸 진심으로 환영해요!
          </p>
          <div className='mb-16'>
            <img src='/src/assets/images/Welcome.png' alt='' />
          </div>
          <p className='text-s-regular'>
            <span className=' text-s-regular text-primary-red-orange'>2초 후</span> 다음
            화면으로 이동
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default SignUpWelcomePage;
