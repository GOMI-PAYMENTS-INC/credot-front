import React from 'react';

import Layout from '@/components/layouts/layout';

const SignUpWelcomePage = () => (
  <Layout>
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='w-full max-w-[26.25rem]'>
        <div className='flex flex-col items-center justify-center '>
          <h3 className='mb-4 text-center text-2xl-bold'>아이디 찾기</h3>
          {/*<UserMobileCheckForm />*/}
        </div>
      </div>
    </div>
  </Layout>
);

export default SignUpWelcomePage;
