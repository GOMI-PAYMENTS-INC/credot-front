import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { CountryType, SendTemporaryPasswordMutationVariables } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import { SendTemporaryPasswordResult } from '@/types/findIdentification.d';

interface IFindPasswordForm {
  email: string;
}

const FindPassword = () => {
  const {
    onSendTemporaryPassword,
    isSuccessSendTemporaryPassword,
    sendTemporaryPasswordResponseStatus,
  } = AuthContainer();
  const [childIsValid, setChildIsValid] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<IFindPasswordForm>({
    mode: 'onChange',
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 유저 임시 비밀번호 발급 쿼리 실행
  const initSendTemporaryPassword = (verifyCodeSign: string) => {
    if (errors.email) {
      return;
    }
    const params: SendTemporaryPasswordMutationVariables = {
      user: {
        /** 이메일 */
        email,
        /** 전화번호 */
        phone,
        /** 인증번호 */
        verifyCodeSign,
      },
      country: CountryType.Kr,
    };
    onSendTemporaryPassword(params);
  };

  // 인증번호 valiation을 통과한 경우, [유저 임시 비밀번호 발급] 작동시킴
  const sendTemporaryPassword = (value: string) => {
    if (value && childIsValid) {
      initSendTemporaryPassword(value);
    }
  };

  return (
    <Fragment>
      {/* 비밀번호 찾기 폼 시작 */}
      {!isSuccessSendTemporaryPassword &&
        sendTemporaryPasswordResponseStatus !== SendTemporaryPasswordResult.STRANGER && (
          <div className='space-y-8'>
            {/*TODO 아이디찾기/ 비밀번호 찾기 공통 영역 시작*/}
            <div>
              <ul className='grid grid-cols-2 rounded-lg bg-grey-200 p-1 text-center text-L/Medium text-grey-700'>
                <li className='rounded-lg py-3'>
                  <Link to={PATH.FIND_ID}>아이디 찾기</Link>
                </li>
                <li className='rounded-lg bg-white py-3 font-bold text-grey-900 shadow-[0_0_3px_0_rgba(0,0,0,0.08)] '>
                  <Link to={PATH.FIND_PASSWORD}>비밀번호 찾기</Link>
                </li>
              </ul>
            </div>
            {/*끝*/}

            {/*타이틀+서브타이틀 비밀번호 찾기와 동일함*/}
            <div className='mt-8 text-grey-800'>
              <h3 className='mb-1 text-3XL/medium'>비밀번호를 찾을게요.</h3>
              <p className='text-L/Regular'>
                이메일과 회원가입 시 인증한 휴대폰 번호를 입력해주세요.
              </p>
            </div>
            {/*끝*/}

            <div className='space-y-2'>
              <input
                className='inputCustom w-full'
                type='email'
                placeholder='이메일'
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: '올바른 이메일 주소를 입력해주세요.',
                  },
                  onChange: (e) => {
                    setEmail?.(e.target.value.trim());
                  },
                })}
              />
              <p className='text-S/Medium text-red-500'>{errors?.email?.message}</p>
              <SmsVerifyCodeForm
                onChangePhone={(value: string) => {
                  setPhone(value);
                }}
                onVerifyCodeSign={(value: string) => {
                  sendTemporaryPassword(value);
                }}
                onChangeChildIsValid={(value: boolean) => {
                  setChildIsValid(value);
                }}
              />
            </div>
          </div>
        )}
      {/* 비밀번호 찾기 폼 끝 */}

      {/* 비밀번호 임시발송 완료 끝 */}
      {isSuccessSendTemporaryPassword && (
        <>
          <h3 className='mb-5 text-center text-2XL/Bold'>임시 비밀번호 발송</h3>
          <p className='text-center text-L/Regular'>
            회원님께서 가입하신 연락처로
            <br />
            임시 비밀번호를 발송했습니다.
          </p>
          <p className='mt-16  text-center text-primary-red-orange'>{phone}</p>

          <div className='mt-16 '>
            <Link to={PATH.SIGN_IN}>
              <button
                type='button'
                className='text-xl-medium flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-white'
              >
                로그인 하러가기
              </button>
            </Link>
          </div>
        </>
      )}
      {/* 비밀번호 임시발송 완료 끝 */}
    </Fragment>
  );
};

export default FindPassword;
