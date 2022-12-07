import React from 'react';

import Layout from '@/components/layouts/layout';

const ResetPage = () => (
  <Layout>
    {/* TODO: 기존 모달-> 페이지로 변경된 경우 공통 레이아웃 컴포넌트로 만들 예정입니다. */}
    <div className='flex h-screen w-full justify-center'>
      <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
        {/* 비밀번호 찾기 폼 시작 */}
        <div className=''>
          <h3 className='mb-5 text-center text-2xl-bold'>신규 비밀번호 설정</h3>
          <p className='mb-5 text-center text-l-regular'>
            임시 비밀번호로 로그인 하셨습니다.
            <br />
            신규 비밀번호를 설정해 주세요.
          </p>
          <div className='space-y-2'>
            <input
              className='w-full rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='password'
              name='newPassword'
              placeholder='신규 비밀번호'
            />
            <p className='text-2xs-regular text-functional-error'>
              올바른 이메일주소를 입력하세요.
            </p>
            <input
              className=' w-full rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='password'
              name='newPasswordCheck'
              placeholder='비밀번호 확인'
            />
            <p className='text-2xs-regular text-functional-error'>
              비밀번호가 일치하지 않습니다.
            </p>
          </div>
          <div className='mt-16 '>
            <button
              type='button'
              className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
            >
              완료
            </button>
          </div>
          {/* 컴포넌트로 만들 예정 끝 */}
        </div>
        {/* 비밀번호 찾기 폼 끝 */}
      </div>
    </div>
  </Layout>
);

export default ResetPage;
