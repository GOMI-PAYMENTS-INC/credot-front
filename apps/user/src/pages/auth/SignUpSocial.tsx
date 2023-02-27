import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { GoogleSignUpInput } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import { FindIdPasswordBottom } from '@/pages/auth/FindIdPasswordBottom';

interface ISignUpSocialForm {
  idToken: string;
  phone: string;
  verifyCode: string;
  useAgree: boolean;
  personalAgree: boolean;
  marketingAgree: boolean;
}

const SignUpSocial = () => {
  const { onSubmitSignUpSocial, userInfo, idToken } = AuthContainer();
  const [phone, setPhone] = useState('');
  const [verifyCodeSign, setVerifyCodeSign] = useState('');
  const [childIsValid, setChildIsValid] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ISignUpSocialForm>({
    mode: 'onChange',
  });
  const useAgree = watch('useAgree');
  const personalAgree = watch('personalAgree');

  const onValid = () => {
    const signUpInput: GoogleSignUpInput = {
      idToken,
      phone,
      verifyCodeSign,
    };
    onSubmitSignUpSocial(signUpInput);
  };

  const onInvalid = () => {
    toast.error('입력값을 재확인 해주십시오.', { autoClose: 1000 });
  };

  const onAllCheckbox = (value: boolean) => {
    setValue('useAgree', value);
    setValue('personalAgree', value);
    setValue('marketingAgree', value);
  };

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
                className=' inputCustom-textbox w-full'
                type='email'
                id='email'
                value={userInfo?.me.email}
                placeholder='이메일'
                readOnly
              />
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

export default SignUpSocial;
