import React, { useState } from 'react';

import Layout from '@/components/layouts/layout';
import { Paths } from '@/router/paths';
import { useForm } from 'react-hook-form';
import {
  CountryType,
  SendSmsVerificationCodeMutationVariables,
} from '@/generated/graphql';
import { AuthContainer } from '@/containers/auth/auth.container';
import { toast } from 'react-toastify';

interface ISignUpForm {
  email: string;
  phone: string;
  password: string;
}

const SignUpPage = () => {
  const { onSendSmsVerifyCode } = AuthContainer();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>({
    mode: 'onChange',
  });
  // 인증번호 발송 진행중 여부
  const [isSending, setSending] = useState<boolean>(false);
  // 인증번호 발송 횟수
  const [countSend, setCountSend] = useState<number>(0);
  // 인증 완료 여부
  const [isVerifyCode, setVerifyCode] = useState<boolean>(false);
  const phoneNumber = watch('phone');
  const passwordWatcher = watch('password');

  // 인증번호 발송
  const waitSendMobileCheck = () => {
    toast.info('발송중입니다. 조금만 기다려주세요', { autoClose: 1000 });
  };

  // 인증번호 발송
  const initVerifyCode = () => {
    // 인증번호 발송 시작
    setVerifyCode(true);
    setSending(true);
    setTimeout(() => {
      // 인증 진행 완료
      setSending(false);
    }, 1000 * 60);
  };

  // 인증번호 발송 프로세스
  const sendSmsVerifyCode = () => {
    if (errors.phone) {
      return;
    }
    if (!isSending) {
      initVerifyCode();
      const params: SendSmsVerificationCodeMutationVariables = {
        country: CountryType.Kr,
        phone: phoneNumber,
      };
      onSendSmsVerifyCode(params);
      // 발송 횟수 추가
      setCountSend(countSend + 1);
    } else {
      // 발송중
      waitSendMobileCheck();
    }
  };

  return (
    <Layout>
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='w-full max-w-[26.25rem]'>
          <h3 className='mb-4 text-center text-2xl-bold'>회원가입</h3>
          {/* TODO: 가입 후 웰켐페이지로 이동, action은 임의로 넣어두었습니다. */}
          <form action={Paths.welcome} className='space-y-5'>
            <div className='space-y-2'>
              <div className='space-y-2'>
                <input
                  className=' w-full rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  type='email'
                  placeholder='이메일'
                  {...register('email', {
                    required: '이메일은 필수입력입니다.',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: '올바른 이메일주소를 입력하세요.',
                    },
                  })}
                />
                <p className='text-2xs-regular text-functional-error'>
                  {errors?.email?.message}
                </p>
              </div>

              <div className='space-y-2'>
                <input
                  id='password'
                  type='password'
                  className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  placeholder='비밀번호'
                  {...register('password', { required: '비밀번호는 필수입력입니다.' })}
                />
                <p className='text-2xs-regular text-functional-error'>
                  {errors?.password?.message}
                </p>
              </div>

              <div className='space-y-2'>
                <input
                  id='confirmPassword'
                  type='password'
                  className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  placeholder='비밀번호 확인'
                  // @ts-ignore
                  {...register('confirmPassword', {
                    validate: (value) =>
                      value === passwordWatcher || '비밀번호가 일치하지 않습니다.',
                  })}
                />
                <p className='text-2xs-regular text-functional-error'>
                  {errors?.confirmPassword?.message}
                </p>
              </div>
              <div className='flex items-center'>
                <input
                  className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  type='text'
                  placeholder='휴대폰번호 - 없이 입력'
                  {...register('phone', {
                    required: '휴대폰번호 필수입력입니다.',
                    pattern: {
                      value: /(010)[0-9]{8}$/g,
                      message: '올바른 휴대폰번호를 입력하세요.',
                    },
                  })}
                />
                <p className='pl-3 text-2xs-regular text-functional-error'>
                  {errors?.phone?.message}
                </p>

                {/* 발송 여부에 따른 버튼 출력이 다름 시작 */}
                {/* 발송하기전 */}
                {/* eslint-disable-next-line no-nested-ternary */}
                {countSend === 0 ? (
                  <button
                    type='button'
                    className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
                    onClick={sendSmsVerifyCode}
                  >
                    인증
                  </button>
                ) : !isSending ? (
                  <button
                    type='button'
                    className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
                    onClick={sendSmsVerifyCode}
                  >
                    재발송
                  </button>
                ) : (
                  <button
                    type='button'
                    className='ml-2 min-w-[4.6875rem] rounded border-0 bg-gray-300  p-2.5 text-sm  text-gray-500'
                    onClick={sendSmsVerifyCode}
                  >
                    재발송
                  </button>
                )}
                {/* 발송 여부에 따른 버튼 출력이 다름 끝 */}
              </div>
              {isVerifyCode && (
                <div className='space-y-2'>
                  <div className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'>
                    <input
                      className='w-5/6 border-0'
                      type='text'
                      name='verifyCode'
                      placeholder='인증번호'
                    />
                    <span className='inline-block w-1/6 text-right text-functional-error'>
                      1:00
                    </span>
                  </div>
                  <p className='text-2xs-regular text-functional-error'>
                    인증시간이 만료되었습니다. 다시 인증해 주세요.
                  </p>
                </div>
              )}
            </div>

            <div>
              <ul className='space-y-3'>
                <li>
                  <input type='checkbox' name='all-agree' id='all-agree' />
                  <label htmlFor='all-agree' className='m-regular inline-block'>
                    이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
                  </label>
                </li>
                <li className='flex justify-between'>
                  <input type='checkbox' name='use-agree' id='use-agree' />
                  <label htmlFor='use-agree' className='m-regular inline-block'>
                    이용약관 동의(필수)
                  </label>

                  <a href='#' className='text-s-regular'>
                    보기 &gt;
                  </a>
                </li>
                <li className='flex justify-between'>
                  <input type='checkbox' name='personal-agree' id='personal-agree' />
                  <label htmlFor='personal-agree' className='m-regular inline-block'>
                    개인정보 수집 및 이용 동의(필수)
                  </label>

                  <a href='#' className='text-s-regular'>
                    보기 &gt;
                  </a>
                </li>
                <li className='flex justify-between'>
                  <input type='checkbox' name='marketing-agree' id='marketing-agree' />
                  <label htmlFor='marketing-agree' className='m-regular inline-block'>
                    마케팅 정보 활용 및 서비스 관련 수신 동의(선택)
                  </label>
                  <a href='#' className='text-s-regular'>
                    보기 &gt;
                  </a>
                </li>
              </ul>
              <button
                type='submit'
                className='mt-16 flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
              >
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
