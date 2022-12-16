import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { Icons } from '@/components/icons';
import Layout from '@/components/layouts/layout';
import { FindUserContainer } from '@/containers/auth/find-user.container';
import { CountryType, FindAccountQueryVariables } from '@/generated/graphql';
import { Paths } from '@/router/paths';

enum FindAccountResult {
  MEMBER = 200,
  STRANGER = 1002,
  NOTMATCHCODE = 1001,
}

const FindIdPage = () => {
  const { setFindAccount, findAccountQuery, responseStatus } = FindUserContainer();

  const [phone, setPhone] = useState('');

  // 인증번호 맞는지 DB 체크
  const changeWriteVerifyCodeSign = (verifyCodeSign: string) => {
    const params: FindAccountQueryVariables = {
      user: {
        /** 전화번호 */
        phone,
        /** 인증번호 */
        verifyCodeSign,
      },
      country: CountryType.Kr,
    };
    setFindAccount(params);
  };

  // 인증번호가 올바른지 DB 체크.
  const onChangeVerifyCodeSign = (verifyCodeSign: string) => {
    changeWriteVerifyCodeSign(verifyCodeSign);
  };
  return (
    <Layout>
      {/* TODO: 기존 모달-> 페이지로 변경된 경우 공통 레이아웃 컴포넌트로 만들 예정입니다. */}
      <div className='flex h-screen w-full justify-center'>
        <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
          {/* 아이디 찾기 폼 시작 */}
          {!findAccountQuery && responseStatus !== FindAccountResult.STRANGER && (
            <>
              <h3 className='mb-5 text-center text-2xl-bold'>아이디 찾기</h3>
              {/* <SmsVerifyCodeForm
                onChangePhone={(value: string) => {
                  setPhone(value);
                }}
                onChangeVerifyCodeSign={(value: string) => {
                  onChangeVerifyCodeSign(value);
                }}
                onChangeSubIsValid={(value: boolean) => {}}
              /> */}
            </>
          )}
          {/* 아이디 찾기 폼 끝 */}

          {/* 아이디 찾기 결과 시작 */}
          {findAccountQuery && (
            <div>
              <h3 className='mb-5 text-center text-2xl-bold'>아이디 찾기 완료</h3>
              <p className='text-center text-l-regular'>
                회원님께서 가입한 아이디는 아래와 같아요.
              </p>
              <ul className='mt-16 grid gap-y-4 '>
                {findAccountQuery &&
                  findAccountQuery.findAccount.accounts.map((account, index) => (
                    <li className='flex text-primary-red-orange' key={index}>
                      <a href='#' className='mr-2 '>
                        <Icons.Copy className='fill-primary-red-orange' />
                      </a>
                      {account.email}
                    </li>
                  ))}
              </ul>
              <div className='mt-16 grid grid-cols-2 gap-x-2'>
                <div>
                  <Link to={Paths.findPassword}>
                    <button
                      type='button'
                      className='flex w-full cursor-pointer justify-center rounded border  border-grey-400 p-2.5 text-xl-medium text-grey-800'
                    >
                      비밀번호 찾기
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to={Paths.signIn}>
                    <button
                      type='button'
                      className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
                    >
                      로그인 하러가기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* 아이디 찾기 결과 끝 */}

          {/* 조회된 결과가 없는 경우 시작 */}
          {responseStatus === FindAccountResult.STRANGER && (
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
          )}
          {/* 조회된 결과가 없는 경우 끝 */}
        </div>
      </div>
    </Layout>
  );
};

export default FindIdPage;
