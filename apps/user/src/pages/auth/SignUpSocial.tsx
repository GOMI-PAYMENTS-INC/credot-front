import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { GoogleSignUpInput } from '@/generated/graphql';

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

  const { register, handleSubmit, setValue, watch } = useForm<ISignUpSocialForm>({
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
              value={userInfo?.me.email}
              readOnly
            />
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
              <label htmlFor='all-agree' className='inline-block text-M/Medium'>
                이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </label>
            </li>
            <li className='flex justify-between'>
              <input type='checkbox' id='use-agree' {...register('useAgree')} />
              <label htmlFor='use-agree' className='inline-block text-M/Medium'>
                이용약관 동의(필수)
              </label>

              <a href='#' className='text-s-regular'>
                보기 &gt;
              </a>
            </li>
            <li className='flex justify-between'>
              <input type='checkbox' id='personal-agree' {...register('personalAgree')} />
              <label htmlFor='personal-agree' className='inline-block text-M/Medium'>
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
              <label htmlFor='marketing-agree' className='inline-block text-M/Medium'>
                마케팅 정보 활용 및 서비스 관련 수신 동의(선택)
              </label>
              <a href='#' className='text-s-regular'>
                보기 &gt;
              </a>
            </li>
          </ul>
          {childIsValid && useAgree && personalAgree ? (
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

export default SignUpSocial;
