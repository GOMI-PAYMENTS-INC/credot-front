import React, { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import Layout from '@/components/layouts/layout';
import { AuthContainer } from '@/containers/auth/auth.container';
import { SignUpInput } from '@/generated/graphql';
import { Paths } from '@/router/paths';

interface ISignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  verifyCode: string;
}

const SignUpPage = () => {
  const { onSubmitSignUp } = AuthContainer();
  const [phone, setPhone] = useState('');
  const [verifyCodeSign, setVerifyCodeSign] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>({
    mode: 'onChange',
  });
  const passwordWatcher = watch('password');

  const onValid = (data: ISignUpForm) => {
    const signUpInput: SignUpInput = {
      name: '',
      email: data?.email,
      password: data?.password,
      phone,
      verifyCodeSign,
    };
    onSubmitSignUp(signUpInput);
  };

  const onInvalid = (errorData: FieldErrors) => {
    console.error('error : ', errorData);
    toast.error('입력값을 재확인 해주십시오.', { autoClose: 1000 });
  };

  return (
    <Layout>
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='w-full max-w-[26.25rem]'>
          <h3 className='mb-4 text-center text-2xl-bold'>회원가입</h3>
          {/* TODO: 가입 후 웰켐페이지로 이동, action은 임의로 넣어두었습니다. */}
          <form
            action={Paths.welcome}
            className='space-y-5'
            onSubmit={handleSubmit(onValid, onInvalid)}
          >
            <div className='space-y-2'>
              <div className='space-y-2'>
                <input
                  className=' w-full rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  type='email'
                  placeholder='이메일'
                  {...register('email', {
                    required: '이메일은 필수입력입니다.',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: '올바른 이메일 주소를 입력하세요.',
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
                  {...register('password', {
                    required: '비밀번호는 필수입력입니다.',
                    pattern: {
                      // : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
                      value:
                        /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/,
                      message: '숫자,특수문자,영문 혼합 최소 8자리 이상 입력바랍니다.',
                    },
                  })}
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
              <SmsVerifyCodeForm
                onChangePhone={(value: string) => {
                  setPhone(value);
                }}
                onChangeVerifyCodeSign={(value: string) => {
                  setVerifyCodeSign(value);
                }}
              />
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
