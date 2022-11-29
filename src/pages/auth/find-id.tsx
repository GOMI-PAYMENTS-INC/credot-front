import React from 'react';
import { Link } from 'react-router-dom';

import { Icons } from '@/components/icons';
import Layout from '@/components/layouts/layout';
import { Paths } from '@/router/paths';

const FindIdPage = () => (
  <Layout>
    {/* TODO: 기존 모달-> 페이지로 변경된 경우 공통 레이아웃 컴포넌트로 만들 예정입니다. */}
    <div className='flex h-screen w-full justify-center'>
      <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
        {/* 아이디 찾기 폼 시작 */}
        <div>
          <h3 className='mb-4 text-center text-2xl-bold'>아이디 찾기</h3>
          {/* TODO:컴포넌트로 만들 예정 시작, sign-up.page.tsx 에 있습니다. 아래 코드가 컴포넌트가 되도록 해보겠습니다. */}
          <div className='space-y-2'>
            <div className='flex items-center'>
              <input
                className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                type='text'
                name='phone'
                placeholder='휴대폰번호 - 없이 입력'
              />
              <button
                type='button'
                className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
              >
                인증
              </button>
            </div>
            <div className='space-y-2'>
              <div className=' flex w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'>
                <input
                  className='w-11/12 border-0'
                  type='password'
                  name='password'
                  placeholder='인증번호'
                />
                {/* TODO: 인증번호 확인 여부에 다른 출력 시작 */}
                {/* 인증 타이머 시작 */}
                <span className='inline-block w-1/6 text-right text-functional-error'>
                  1:00
                </span>
                {/* 인증 타이머 끝 */}

                {/* 인증 완료 아이콘 시작 */}
                <span className='inline-block hidden w-1/12 '>
                  <Icons.Check className='my-0 mx-auto w-4 fill-functional-success' />
                </span>
                {/* 인증 완료 아이콘 끝 */}

                {/* TODO: 인증번호 확인 여부에 다른 출력 끝 */}
              </div>
              <p className='text-2xs-regular text-functional-error'>
                인증시간이 만료되었습니다. 다시 인증해 주세요.
              </p>
            </div>
          </div>
          {/* 컴포넌트로 만들 예정 끝 */}
        </div>
        {/* 아이디 찾기 폼 끝 */}

        {/* 아이디 찾기 결과 시작 */}
        <div className='hidden'>
          <h3 className='mb-4 text-center text-2xl-bold'>아이디 찾기 완료</h3>
          <p className='text-center text-l-regular'>
            고미키워드 회원이 되신 걸 진심으로 환영해요!
          </p>
          <ul className='mt-16 grid gap-y-4 '>
            <li className='flex text-primary-red-orange'>
              <a href='#' className='mr-2 '>
                <Icons.Copy className='fill-primary-red-orange' />
              </a>
              win@gomicorp.com
            </li>
            <li className='flex text-primary-red-orange'>
              <a href='#' className='mr-2 '>
                <Icons.Copy className='fill-primary-red-orange' />
              </a>
              win@gomicorp.com
            </li>
            <li className='flex text-primary-red-orange'>
              <a href='#' className='mr-2 '>
                <Icons.Copy className='fill-primary-red-orange' />
              </a>
              win@gomicorp.com
            </li>
          </ul>
          <div className='mt-16 '>
            <button
              type='button'
              className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
            >
              완료
            </button>
          </div>
        </div>
        {/* 아이디 찾기 결과 끝 */}

        {/* 조회된 결과가 없는 경우 시작 */}
        <div className='hidden'>
          <h3 className='mb-4 text-center text-2xl-bold'>계정 안내</h3>
          <p className='text-center text-l-regular'>
            이전에 가입한 계정이 존재하지 않습니다.
          </p>
          <div className='mt-16 '>
            <Link to={Paths.signUp}>
              <button
                type='button'
                className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
              >
                회원가입 바로가기
              </button>
            </Link>
          </div>
        </div>
        {/* 조회된 결과가 없는 경우 끝 */}
      </div>
    </div>
  </Layout>
);

export default FindIdPage;
