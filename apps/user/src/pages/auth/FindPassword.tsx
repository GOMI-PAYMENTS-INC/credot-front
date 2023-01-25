import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { CountryType, SendTemporaryPasswordMutationVariables } from '@/generated/graphql';
import { PATH } from '@/router/routeList';

interface IFindPasswordForm {
  email: string;
}

export enum SendTemporaryPasswordResult {
  MEMBER = 200,
  // TODO : 오류 코드 find-id와 통일 시켜야 합니다. - 소진
  STRANGER = 1004,
  NOTMATCHCODE = 1001,
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
    <div className='flex h-screen w-full justify-center'>
      <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
        {/* 비밀번호 찾기 폼 시작 */}
        {!isSuccessSendTemporaryPassword &&
          sendTemporaryPasswordResponseStatus !==
            SendTemporaryPasswordResult.STRANGER && (
            <>
              <h3 className='text-2xl-bold mb-5 text-center'>비밀번호 찾기</h3>
              <div className='space-y-2'>
                <input
                  className=' w-full rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  type='email'
                  placeholder='이메일'
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: '올바른 이메일 주소를 입력하세요.',
                    },
                    onChange: (e) => {
                      setEmail?.(e.target.value.trim());
                    },
                  })}
                />
                <p className='text-2xs-regular text-functional-error'>
                  {errors?.email?.message}
                </p>
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
            </>
          )}
        {/* 비밀번호 찾기 폼 끝 */}

        {/* 비밀번호 임시발송 완료 끝 */}
        {isSuccessSendTemporaryPassword && (
          <>
            <h3 className='text-2xl-bold mb-5 text-center'>임시 비밀번호 발송</h3>
            <p className='text-l-regular text-center'>
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
      </div>
    </div>
  );
};

export default FindPassword;
