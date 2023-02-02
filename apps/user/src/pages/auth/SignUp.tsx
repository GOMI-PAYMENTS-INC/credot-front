import React, { Fragment, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { SignUpInput, useExistsUserEmailQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

interface ISignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  verifyCode: string;
  useAgree: boolean;
  personalAgree: boolean;
  marketingAgree: boolean;
}

const SignUp = () => {
  const { onSubmitSignUp } = AuthContainer();
  const [phone, setPhone] = useState('');
  const [verifyCodeSign, setVerifyCodeSign] = useState<string>('');
  const [childIsValid, setChildIsValid] = useState(false);
  const [isOnExistsEmail, setIsOnExistsEmail] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    mode: 'onChange',
  });
  const passwordWatcher = watch('password');
  const useAgree = watch('useAgree');
  const personalAgree = watch('personalAgree');
  const email = watch('email');

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

  const onAllCheckbox = (value: boolean) => {
    setValue('useAgree', value);
    setValue('personalAgree', value);
    setValue('marketingAgree', value);
  };

  const { data: existsEmailQuery } = useExistsUserEmailQuery(
    graphQLClient,
    { email },
    {
      enabled: isOnExistsEmail && !!email,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        setIsOnExistsEmail(false);
        // return res.existsUserEmail || false;
        if (res.existsUserEmail) {
          setError('email', {
            type: 'custom',
            message: '이미 가입된 이메일 주소입니다.',
          });
        }
      },
      onError: () => {
        setIsOnExistsEmail(false);
      },
    },
  );

  return (
    <Fragment>
      <h3 className='mb-4 text-center text-2XL/Bold'>회원가입</h3>
      <form className='space-y-5' onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className='space-y-2'>
          <div className='space-y-2'>
            <input
              className=' inputCustom w-full'
              type='email'
              placeholder='이메일'
              {...register('email', {
                required: '이메일은 필수입력입니다.',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: '올바른 이메일 주소를 입력해주세요.',
                },
                onChange: async (e) => {
                  const regex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                  if (regex.test(e.target.value.trim())) {
                    setIsOnExistsEmail(true);
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    existsEmailQuery;
                  }
                },
              })}
            />
            <p className='text-S/Medium text-red-500'>{errors?.email?.message}</p>
          </div>

          <div className='space-y-2'>
            <input
              id='password'
              type='password'
              className='inputCustom w-full content-center'
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
            <p className='text-S/Medium text-red-500'>{errors?.password?.message}</p>
          </div>

          <div className='space-y-2'>
            <input
              id='confirmPassword'
              type='password'
              className='inputCustom w-full content-center'
              placeholder='비밀번호 확인'
              // @ts-ignore
              {...register('confirmPassword', {
                validate: (value) =>
                  value === passwordWatcher || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <p className='text-S/Medium text-red-500'>
              {errors?.confirmPassword?.message}
            </p>
          </div>
          <SmsVerifyCodeForm
            onChangePhone={(value: string) => {
              setPhone(value);
            }}
            onVerifyCodeSign={(value: string) => {
              setVerifyCodeSign(value);
            }}
            onChangeChildIsValid={(value: boolean) => {
              setChildIsValid(value);
            }}
          />
        </div>
        <div>
          <ul className='space-y-3'>
            <li>
              <input
                type='checkbox'
                id='all-agree'
                onChange={(e) => onAllCheckbox(e.target.checked)}
              />
              <label htmlFor='all-agree' className='m-regular inline-block'>
                이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </label>
            </li>
            <li className='flex justify-between'>
              <input type='checkbox' id='use-agree' {...register('useAgree')} />
              <label htmlFor='use-agree' className='m-regular inline-block'>
                이용약관 동의(필수)
              </label>

              <a href='#' className='text-s-regular'>
                보기 &gt;
              </a>
            </li>
            <li className='flex justify-between'>
              <input type='checkbox' id='personal-agree' {...register('personalAgree')} />
              <label htmlFor='personal-agree' className='m-regular inline-block'>
                개인정보 수집 및 이용 동의(필수)
              </label>

              <a href='#' className='text-s-regular'>
                보기 &gt;
              </a>
            </li>
            <li className='flex justify-between'>
              <input
                type='checkbox'
                id='marketing-agree'
                {...register('marketingAgree')}
              />
              <label htmlFor='marketing-agree' className='m-regular inline-block'>
                마케팅 정보 활용 및 서비스 관련 수신 동의(선택)
              </label>
              <a href='#' className='text-s-regular'>
                보기 &gt;
              </a>
            </li>
          </ul>
          {isValid && childIsValid && useAgree && personalAgree ? (
            <button
              type='submit'
              className='text-xl-medium mt-16 flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-white'
            >
              가입하기
            </button>
          ) : (
            <button
              type='submit'
              className='text-xl-medium mt-16 flex w-full cursor-pointer justify-center rounded bg-[#d1d5db] p-2.5 text-white'
              disabled={true}
            >
              가입하기
            </button>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default SignUp;
