import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useVerifyCode } from '@/containers/auth/findAccount.api';

import { FindAccountLayout as Layout } from '@/components/layouts/FindAccountLayout';
import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';
import { FindAccountTittle } from '@/pages/auth/FindAccountTittle';
import { isFalsy } from '@/utils/isFalsy';

import { FindPasswordResult } from '@/pages/auth/FindPasswordResult';
import { VerifyCodeInput } from './VerifyCodeInput';
import {
  authInitialState,
  eventHandlerByFindAccount,
  isPhoneVerifyPrepared,
} from '@/containers/auth/auth.container';
import { NOTIFICATION_MESSAGE } from '@/constants/notification.constant';

export const FindPasswordRef = () => {
  const [isVerification, setIsVerification] =
    useState<TVerifyButtonState>(authInitialState);

  const {
    register,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TAuthEssentialProps>({
    mode: 'onChange',
  });

  const { _getVerifyCode, _checkSmsVerifyCode, _sendTemporaryPassword } = useVerifyCode(
    isVerification,
    setIsVerification,
    setError,
  );

  const requestVerifyCodeButton = useMemo(() => {
    return eventHandlerByFindAccount(isVerification);
  }, [isVerification.firstCalled, isVerification.theElseCalled]);

  const { className, disabled, text, phoneNumberInput } = requestVerifyCodeButton.phone;

  const clickVerifyButton = () => {
    const { email, phone } = getValues();

    const isValid = isPhoneVerifyPrepared(
      phone,
      errors,
      isVerification,
      setIsVerification,
      setError,
      email,
    );

    return isValid && _getVerifyCode(phone);
  };

  _checkSmsVerifyCode(getValues('phone'));

  useEffect(() => {
    if (
      isVerification.verifyCodeSignatureNumber &&
      isVerification.isExistedAccount === null
    ) {
      _sendTemporaryPassword({
        email: getValues('email'),
        phone: getValues('phone'),
        verifyCodeSign: isVerification.verifyCodeSignatureNumber,
      });
    }
  }, [isVerification.verifyCodeSignatureNumber]);
  return (
    <Layout>
      {isVerification.isExistedAccount === null ? (
        <div className='space-y-8'>
          <FindAccountTittle
            title='비밀번호를 찾을게요.'
            subTitle='이메일과 회원가입 시 인증한 휴대폰 번호를 입력해주세요.'
          />

          <div className='space-y-2'>
            <input
              className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
              type='email'
              placeholder='이메일'
              disabled={phoneNumberInput || isVerification.isExceeded}
              {...register('email', {
                required: NOTIFICATION_MESSAGE.emptyEmail,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: NOTIFICATION_MESSAGE.invalidEmail,
                },
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\s/g, '');
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name='email'
              render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
            />
            <div className='flex items-start'>
              <div className='inputCustom-group grow'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    className={`inputCustom-textbox w-full  ${
                      isFalsy(errors.phone) === false && 'error'
                    }`}
                    id='verify'
                    type='text'
                    placeholder='휴대폰번호를 숫자만 입력해주세요.'
                    maxLength={11}
                    disabled={phoneNumberInput || isVerification.isExceeded}
                    {...register('phone', {
                      pattern: {
                        value: /(010)[0-9]{8}$/g,
                        message: NOTIFICATION_MESSAGE.invalidPhone,
                      },
                      onChange: (event) => {
                        event.target.value = event.target.value.replace(/[^0-9]/g, '');
                      },
                    })}
                    onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                      if (['Enter', 'NumpadEnter'].includes(event.code) === false) return;
                      clickVerifyButton();
                    }}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='phone'
                  render={({ message }) => (
                    <p className='inputCustom-helptext'>{message}</p>
                  )}
                />
              </div>
              <div className='basis-[102px]'>
                <button
                  className={className}
                  onClick={() => clickVerifyButton()}
                  disabled={disabled}
                >
                  {text}
                </button>
              </div>
            </div>
            {isVerification.activeVerifyCode && (
              <VerifyCodeInput
                setIsVerification={setIsVerification}
                isVerification={isVerification}
                setError={setError}
                errors={errors}
              />
            )}
          </div>
        </div>
      ) : (
        <FindPasswordResult
          phone={getValues('phone')}
          isExistedAccount={isVerification.isExistedAccount}
          setIsVerification={setIsVerification}
          setValue={setValue}
        />
      )}
      <FindAccountBottom text={'계정이 기억나셨나요?'} />
    </Layout>
  );
};

export default FindPasswordRef;
