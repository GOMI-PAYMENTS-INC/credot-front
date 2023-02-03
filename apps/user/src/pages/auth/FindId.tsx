import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';

import { FindUserContainer } from '@/containers/auth/find-user.container';
import { CountryType, FindAccountQueryVariables } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import {
  FindAccountResult,
  SendTemporaryPasswordResult,
} from '@/types/findIdentification.d';
import { ReactSVG } from 'react-svg';
import { FindIdPasswordBottom } from '@/pages/auth/FindIdPasswordBottom';
import { FindIdPasswordTittle } from '@/pages/auth/FindIdPasswordTittle';

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
      {!findAccountQuery && responseStatus !== FindAccountResult.STRANGER && (
        <>
          <div className='space-y-8'>
            <FindIdPasswordTittle
              title='아이디를 찾을게요.'
              subTitle='회원가입 시 인증한 휴대폰 번호를 입력해주세요.'
            />

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

          <FindIdPasswordBottom />
        </>
      )}
      {/* 아이디 찾기 폼 끝 */}

      {/* 아이디 찾기 결과 시작 */}
      {findAccountQuery && (
        <>
          <div className='space-y-8'>
            <FindIdPasswordTittle
              title={`<span class='text-orange-500'>${
                findAccountQuery ? findAccountQuery.findAccount.accounts : 0
              }개</span>의 아이디를 찾았어요!`}
            />

            <ul className='space-y-6'>
              {findAccountQuery &&
                findAccountQuery.findAccount.accounts.map((account, index) => (
                  <li
                    className='flex flex items-center justify-between rounded-lg border border-grey-300 px-5 py-3 text-primary-red-orange'
                    key={index}
                  >
                    <div>{account.email}</div>
                    <a href='#' className='inline-block text-L/Regular'>
                      {/*TODO 클립보드 기능 넣어야함*/}
                      <ReactSVG
                        src='/assets/icons/Copy.svg'
                        className='cursor-pointer'
                        beforeInjection={(svg) => {
                          svg.setAttribute('style', 'width: 20px; fill: #595959');
                        }}
                      />
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <FindIdPasswordBottom />
        </>
      )}
      {/* 아이디 찾기 결과 끝 */}

      {/* 조회된 결과가 없는 경우 시작 */}
      {responseStatus === FindAccountResult.STRANGER && (
        <>
          <div className='space-y-8'>
            <FindIdPasswordTittle
              title='아이디를 찾을 수 없어요.'
              subTitle='입력하신 휴대폰 번호로 가입한 계정이 존재하지 않아요.'
            />
            <div className='space-y-3'>
              <div>
                <Link to={PATH.SIGN_UP}>
                  <button type='button' className='ButtonPrimary w-full'>
                    회원가입 하기
                  </button>
                </Link>
              </div>
              <div>
                <Link to={PATH.FIND_ID}>
                  <button
                    type='button'
                    className='ButtonPrimary w-full bg-white text-grey-700'
                  >
                    다시 아이디 찾기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {/* 조회된 결과가 없는 경우 끝 */}
    </Fragment>
  );
};

export default FindId;
