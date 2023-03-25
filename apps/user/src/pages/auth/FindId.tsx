import { useState, useMemo } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';

import { NOTIFICATION_MESSAGE } from '@/constants/notification.constant';
import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';
import { FindAccountTittle } from '@/pages/auth/FindAccountTittle';

import { VerifyCodeInput } from '@/pages/auth/VerifyCodeInput';
import { FindAccountLayout as Layout } from '@/components/layouts/FindAccountLayout';
import {
  authInitialState,
  eventHandlerByFindAccount,
  isPhoneVerifyPrepared,
} from '@/containers/auth/auth.container';
import { FindIdResult } from '@/pages/auth/FindIdResult';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useVerifyCode } from '@/containers/auth/findAccount.api';

const FindId = () => {
  const {
    register,
    setError,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TAuthEssentialProps>({
    mode: 'onChange',
  });

  const [isVerification, setIsVerification] =
    useState<TVerifyButtonState>(authInitialState);

  const { _getVerifyCode, _checkSmsVerifyCode, _getUserAccount } = useVerifyCode(
    isVerification,
    setIsVerification,
    setError,
  );

  _checkSmsVerifyCode(getValues('phone'));

  const [userAccounts] = _getUserAccount({
    phone: getValues('phone'),
    verifyCodeSign: isVerification.verifyCodeSignatureNumber,
  });

  const requestVerifyCodeButton = useMemo(() => {
    return eventHandlerByFindAccount(isVerification);
  }, [isVerification.firstCalled, isVerification.theElseCalled]);

  const { className, disabled, text, phoneNumberInput } = requestVerifyCodeButton.phone;

  const clickVerifyButton = () => {
    const phoneNumber = getValues('phone');
    const isValid = isPhoneVerifyPrepared(
      phoneNumber,
      errors,
      isVerification,
      setIsVerification,
      setError,
    );
    return isValid && _getVerifyCode(phoneNumber);
  };

  return (
    <Layout>
      {isVerification.isExistedAccount === null ? (
        <div className='space-y-8'>
          <FindAccountTittle
            title='아이디를 찾을게요.'
            subTitle='회원가입 시 인증한 휴대폰 번호를 입력해주세요.'
          />
          <div className='space-y-1'>
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
                  <InputIcon status={errors?.phone && INPUTSTATUS.ERROR} iconSize={5} />
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
        <FindIdResult
          setIsVerification={setIsVerification}
          setValue={setValue}
          userAccounts={userAccounts?.findAccount.accounts}
          isExistedAccount={isVerification.isExistedAccount}
        />
      )}

      <FindAccountBottom text={'계정이 기억나셨나요?'} />
    </Layout>
  );
};

export default FindId;
