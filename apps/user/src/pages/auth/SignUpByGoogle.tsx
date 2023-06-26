import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PATH } from '@/types/enum.code';
import { useLocation } from 'react-router-dom';

import { Common1Section as Layout } from '@/components/layouts/Common1Section';
import { WelcomeModal } from '@/pages/auth/WelcomeModal';
import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';

import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { TERMS_LIST } from '@/constants/auth.constants';
import { ErrorMessage } from '@hookform/error-message';
import { VerifyCodeInput } from '@/pages/auth/VerifyCodeInput';
import { isFalsy } from '@/utils/isFalsy';

import { useVerifyCode } from '@/containers/auth/findAccount.api';
import { useSignUp } from '@/containers/auth/signUp.api';
import {
  authInitialState,
  eventHandlerByFindAccount,
  isCheckedEssentialTerms,
  isReadyToSignUp,
  openDetailTermContent,
  selectAllTerms,
  selectTerm,
  signUpVerifyCode,
  termInitialState,
} from '@/containers/auth/auth.container';
import { isTruthy } from '@/utils/isTruthy';
import { NOTIFICATION_MESSAGE } from '@/constants/notification.constant';
import { _amplitudeSignupStarted } from '@/amplitude/amplitude.service';
import { AMPLITUDE_ACCOUNT_TYPE } from '@/amplitude/amplitude.enum';
import { SmsVerifyType } from '@/generated/graphql';

const SignUpByGoogle = () => {
  const { token } = useLocation().state;
  const [isVerification, setIsVerification] =
    useState<TVerifyButtonState>(authInitialState);
  const [signUpState, setSignUpState] = useState(termInitialState);

  const {
    register,
    setError,
    getValues,
    formState: { errors },
  } = useForm<TAuthEssentialProps>({
    mode: 'onChange',
  });

  const { _getVerifyCode, _checkSmsVerifyCode } = useVerifyCode(
    SmsVerifyType.S,
    isVerification,
    setIsVerification,
    setError,
  );

  useEffect(() => {
    _amplitudeSignupStarted(AMPLITUDE_ACCOUNT_TYPE.GOOGLE);
  }, []);

  useEffect(() => {
    isReadyToSignUp(isPassedVerifyCode, signUpState, setSignUpState);
  }, [signUpState.checkedTerms]);

  const { _applySocialAccount } = useSignUp();

  const clickVerifyButton = () => {
    const phone = getValues('phone');
    const isValid = signUpVerifyCode(
      phone,
      isVerification,
      setIsVerification,
      errors,
      setError,
    );

    return isValid && _getVerifyCode(phone);
  };

  const [isPassedVerifyCode] = _checkSmsVerifyCode(getValues('phone'));

  const requestVerifyCodeButton = useMemo(() => {
    return eventHandlerByFindAccount(isVerification);
  }, [isVerification.firstCalled, isVerification.theElseCalled]);

  const { className, text, phoneNumberInput } = requestVerifyCodeButton.phone;

  return (
    <Layout>
      {isTruthy(signUpState.welcomeModalClosingTime) && (
        <WelcomeModal
          closingTime={signUpState.welcomeModalClosingTime}
          path={PATH.SEARCH_PRODUCTS}
        />
      )}

      <div className='flex h-full flex-col justify-between'>
        <div>
          <div>
            <h3 className='text-left text-3XL/medium text-grey-800'>회원가입</h3>
          </div>

          <div className='mt-10 space-y-8'>
            <div className='space-y-2'>
              <div>
                <label className='inputCustom-label' htmlFor='email'>
                  휴대폰 인증
                </label>
              </div>
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
                      disabled={
                        phoneNumberInput ||
                        isPassedVerifyCode ||
                        isVerification.isExceeded
                      }
                      {...register('phone', {
                        required: NOTIFICATION_MESSAGE.emptyPhoneNumber,
                        pattern: {
                          value: /(010)[0-9]{8}$/g,
                          message: NOTIFICATION_MESSAGE.invalidPhone,
                        },
                        onChange: (event) => {
                          event.target.value = event.target.value.replace(/[^0-9]/g, '');
                        },
                      })}
                      onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (['Enter', 'NumpadEnter'].includes(event.code) === false)
                          return;
                        clickVerifyButton();
                      }}
                    />
                    <InputIcon
                      status={errors?.phone ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
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
                    disabled={isPassedVerifyCode || isVerification.isExceeded}
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
                  isPassedVerifyCode={isPassedVerifyCode}
                />
              )}
            </div>
            {/*이용약관*/}

            <div className='space-y-4 text-grey-900'>
              <div className='rounded-md bg-grey-100 px-2.5 py-2'>
                <input
                  type='checkbox'
                  id='allAgree'
                  {...register('requiredAgreeTerm')}
                  checked={signUpState.agreedAllTerms}
                  className='termsCheckbox peer'
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    selectAllTerms(event, signUpState, setSignUpState)
                  }
                />
                <label htmlFor='allAgree' className='termsHeaderCheckbox-label'>
                  이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
                </label>
              </div>
              <ul className='space-y-2'>
                {TERMS_LIST.map((term, index) => {
                  return (
                    <li key={index}>
                      <div className='flex items-center justify-between pl-3'>
                        <input
                          type='checkbox'
                          id={term.id}
                          className='termsCheckbox peer'
                          checked={signUpState.checkedTerms.includes(
                            term.id as TTermsType,
                          )}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            selectTerm(event, signUpState, setSignUpState)
                          }
                        />
                        <label htmlFor={term.id} className='termsBodyCheckbox-label'>
                          {`${term.label} (${term.required})`}
                        </label>

                        <button
                          className='textButton-secondary-default-small-none'
                          type='button'
                          onClick={() =>
                            openDetailTermContent(index, signUpState, setSignUpState)
                          }
                        >
                          {signUpState?.isDetailOpen.includes(index) ? '접기' : '보기'}
                        </button>
                      </div>
                      {signUpState?.isDetailOpen.includes(index) && (
                        <div className='mt-1.5 ml-[30px]'>
                          <textarea
                            readOnly
                            className='h-[138px] w-full rounded border border-grey-400 px-4 py-3 text-S/Regular text-grey-900'
                            value={term.detail}
                          ></textarea>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              {isCheckedEssentialTerms(signUpState) === false && (
                <ErrorMessage
                  errors={errors}
                  name='requiredAgreeTerm'
                  render={({ message }) => (
                    <p className='inputCustom-helptext'>{message}</p>
                  )}
                />
              )}
            </div>

            <div>
              <button
                className='button-filled-normal-xLarge-red-false-false-true w-full'
                onClick={() => {
                  const payload = {
                    phone: getValues('phone'),
                    verifyCode: isVerification.verifyCodeSignatureNumber,
                    requiredAgreeTerm: signUpState.checkedTerms,
                  };
                  _applySocialAccount(
                    payload,
                    token,
                    signUpState,
                    setSignUpState,
                    setError,
                  );
                }}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
        <FindAccountBottom />
      </div>
    </Layout>
  );
};

export default SignUpByGoogle;
