import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';

import { FindUserContainer } from '@/containers/auth/find-user.container';
import { CountryType, FindAccountQueryVariables } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import { FindAccountResult } from '@/types/findIdentification.d';
import { ReactSVG } from 'react-svg';

const FindId = () => {
  const { setFindAccount, findAccountQuery, responseStatus } = FindUserContainer();

  const [phone, setPhone] = useState('');
  const [childIsValid, setChildIsValid] = useState(false);

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
  const onChangeVerifyCodeSign = (value: string) => {
    if (value && childIsValid) {
      changeWriteVerifyCodeSign(value);
    }
  };
  return (
    <Fragment>
      {/* 아이디 찾기 폼 시작 */}
      <div className='flex h-full flex-col space-y-8'>
        {/*TODO 아이디찾기/ 비밀번호 찾기 공통 영역 시작*/}
        <div>
          <ul className='grid grid-cols-2 rounded-lg bg-grey-200 p-1 text-center text-L/Medium text-grey-700'>
            <li className='rounded-lg bg-white py-3 font-bold text-grey-900 shadow-[0_0_3px_0_rgba(0,0,0,0.08)]'>
              <Link to={PATH.FIND_ID}>아이디 찾기</Link>
            </li>
            <li className='rounded-lg py-3'>
              <Link to={PATH.FIND_PASSWORD}>비밀번호 찾기</Link>
            </li>
          </ul>
        </div>
        {/*끝*/}

        {!findAccountQuery && responseStatus !== FindAccountResult.STRANGER && (
          <div className='flex h-full flex-col justify-between'>
            <div className='space-y-8'>
              {/*타이틀+서브타이틀 비밀번호 찾기와 동일함*/}
              <div className='text-grey-800'>
                <h3 className='mb-1 text-3XL/medium'>아이디를 찾을게요</h3>
                <p className='text-L/Regular'>
                  회원가입 시 인증한 휴대폰 번호를 입력해주세요.
                </p>
              </div>
              {/*끝*/}

              <div>
                <SmsVerifyCodeForm
                  onChangePhone={(value: string) => {
                    setPhone(value);
                  }}
                  onVerifyCodeSign={(value: string) => {
                    onChangeVerifyCodeSign(value);
                  }}
                  onChangeChildIsValid={(value: boolean) => {
                    setChildIsValid(value);
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-center text-center'>
              <div className='mr-1 text-M/Regular'>계정이 기억나셨나요?</div>

              <Link to={PATH.SIGN_IN}>
                <button className='textButtonPrimary'>로그인 하러가기</button>
              </Link>
            </div>
          </div>
        )}
        {/* 아이디 찾기 폼 끝 */}

        {/* 아이디 찾기 결과 시작 */}
        {findAccountQuery && (
          <>
            <div className='text-grey-800'>
              <h3 className='text-3XL/medium'>
                <span>4개</span>의 아이디를 찾았어요!
              </h3>
            </div>

            <ul className='space-y-6'>
              {findAccountQuery &&
                findAccountQuery.findAccount.accounts.map((account, index) => (
                  <li className='flex flex items-center justify-between rounded-lg border border-grey-300 px-5 py-3 text-primary-red-orange'>
                    <div>win@gomicorp.com</div>
                    <a href='#' className='inline-block text-L/Regular'>
                      <ReactSVG
                        src='/assets/icons/Copy.svg'
                        className='cursor-pointer'
                        beforeInjection={(svg) => {
                          svg.setAttribute('style', 'width: 13.75px; fill: #595959');
                        }}
                      />
                    </a>
                    {account.email}
                  </li>
                ))}
            </ul>
          </>
        )}
        {/* 아이디 찾기 결과 끝 */}

        {/* 조회된 결과가 없는 경우 시작 */}
        {responseStatus === FindAccountResult.STRANGER && (
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
        )}
        {/* 조회된 결과가 없는 경우 끝 */}
      </div>
    </Fragment>
  );
};

export default FindId;
