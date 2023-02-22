import React, { Fragment, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { SignUpInput, useExistsUserEmailQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';
import { FindIdPasswordBottom } from '@/pages/auth/FindIdPasswordBottom';
import { PATH } from '@/router/routeList';

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

  //하단 고정 레이아웃 문구
  const accountBottomInfo = {
    text: '이미 계정이 있으신가요?',
    buttonText: '로그인 하기',
    buttonLink: PATH.SIGN_IN,
  };

  return (
    <Fragment>
      <div className='flex h-full flex-col justify-between'>
        <div>
          <div>
            <h3 className='text-left text-3XL/medium'>회원가입</h3>
          </div>

          <form className='mt-10 space-y-8' onSubmit={handleSubmit(onValid, onInvalid)}>
            {/*이메일*/}
            <div className='space-y-1'>
              <label htmlFor='email' className='inputCustom-label'>
                이메일
              </label>
              <input
                className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
                type='email'
                id='email'
                placeholder='이메일을 입력해주세요.'
                {...register('email', {
                  required: '이메일은 필수입력입니다.',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: '올바른 이메일 형식으로 입력해주세요.',
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
              <p className='inputCustom-helptext'>{errors?.email?.message}</p>
            </div>

            {/*비밀번호*/}
            <div className='space-y-2'>
              <div className='space-y-1'>
                <label htmlFor='password' className='inputCustom-label'>
                  비밀번호
                </label>
                <input
                  id='password'
                  type='password'
                  className={`inputCustom-textbox w-full ${
                    errors?.password ? 'error' : ''
                  }`}
                  placeholder='비밀번호를 입력해주세요. (8자리 이상)'
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
                <p className='inputCustom-helptext'>{errors?.password?.message}</p>
              </div>
              <div className='space-y-1'>
                <input
                  id='confirmPassword'
                  type='password'
                  className={`inputCustom-textbox w-full ${
                    errors?.confirmPassword ? 'error' : ''
                  }`}
                  placeholder='비밀번호를 한 번 더 입력해주세요.'
                  // @ts-ignore
                  {...register('confirmPassword', {
                    validate: (value: string) =>
                      value === passwordWatcher || '비밀번호가 일치하지 않아요.',
                  })}
                />
                <p className='inputCustom-helptext'>{errors?.confirmPassword?.message}</p>
              </div>
            </div>

            {/*휴대폰 인증*/}
            <SmsVerifyCodeForm
              useLabel={true}
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

            {/*이용약관*/}
            <div className='space-y-4 text-grey-900'>
              <div className='rounded-md bg-grey-100 px-2.5 py-2'>
                <input
                  type='checkbox'
                  id='all-agree'
                  className='termsCheckbox peer'
                  onChange={(e) => onAllCheckbox(e.target.checked)}
                />
                <label htmlFor='all-agree' className='termsHeaderCheckbox-label'>
                  이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
                </label>
              </div>
              <ul className='space-y-2'>
                <li className='flex items-center justify-between pl-3 '>
                  <input
                    type='checkbox'
                    id='allAgree'
                    {...register('useAgree')}
                    className='termsCheckbox peer'
                  />
                  <label htmlFor='allAgree' className='termsBodyCheckbox-label'>
                    이용약관 동의(필수)
                  </label>

                  <button className='textButton-secondary-default-small-none'>
                    보기
                  </button>
                </li>
                <li className='flex items-center justify-between pl-3'>
                  <input
                    type='checkbox'
                    id='personal-agree'
                    {...register('personalAgree')}
                    className='termsCheckbox peer'
                  />
                  <label htmlFor='personal-agree' className='termsBodyCheckbox-label'>
                    개인정보 수집 및 이용 동의(필수)
                  </label>

                  <button className='textButton-secondary-default-small-none'>
                    보기
                  </button>
                </li>
                <li className='flex items-center justify-between pl-3'>
                  <input
                    type='checkbox'
                    id='marketing-agree'
                    className='termsCheckbox peer'
                    {...register('marketingAgree')}
                  />
                  <label htmlFor='marketing-agree' className='termsBodyCheckbox-label'>
                    마케팅 정보 활용 및 서비스 관련 수신 동의(선택)
                  </label>
                  <button className='textButton-secondary-default-small-none'>
                    보기
                  </button>
                </li>
              </ul>
            </div>

            <div>
              {isValid &&
              childIsValid &&
              useAgree &&
              personalAgree &&
              verifyCodeSign !== '' ? (
                <button
                  type='submit'
                  className='button-filled-normal-xLarge-red-false-false-true w-full'
                >
                  회원가입
                </button>
              ) : (
                <button
                  type='submit'
                  className='button-filled-disabled-xLarge-primary-false-false-true w-full'
                  disabled={true}
                >
                  회원가입
                </button>
              )}
            </div>
          </form>
        </div>
        <FindIdPasswordBottom
          buttonText={accountBottomInfo.buttonText}
          text={accountBottomInfo.text}
          buttonLink={accountBottomInfo.buttonLink}
        />
      </div>
    </Fragment>
  );
};

export default SignUp;
