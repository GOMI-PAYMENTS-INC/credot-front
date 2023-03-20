import React, { useMemo, useState, ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Common1Section as Layout } from '@/components/layouts/Common1Section';

import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';

import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { TERMS_LIST } from '@/containers/auth/auth.constants';
import { ErrorMessage } from '@hookform/error-message';
import { VerifyCodeInput } from '@/pages/auth/VerifyCodeInput';
import { isFalsy } from '@/utils/isFalsy';

import { useVerifyCode, useSignUp } from '@/containers/auth/auth.api';
import {
  authInitialState,
  isPhoneVerifyPrepared,
  eventHandlerByFindAccount,
  termInitialState,
  assignEmail,
  selectTerm,
  selectAllTerms,
  isReadyToSignUp,
  openDetailTermContent,
} from '@/containers/auth/auth.container.refac';

const SignUpRef = () => {
  const [isVerification, setIsVerification] =
    useState<TVerifyButtonState>(authInitialState);
  const [signUpEvent, setSignUpEvent] = useState(termInitialState);

  const {
    register,
    setValue,
    setError,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TAuthEssentialProps>({
    mode: 'onChange',
  });

  const { _getVerifyCode, _checkSmsVerifyCode } = useVerifyCode(
    isVerification,
    setIsVerification,
    setError,
  );
  useEffect(() => {
    if (isFalsy(isPassedVerifyCode)) return;
    isReadyToSignUp(isPassedVerifyCode, signUpEvent, setSignUpEvent);
  }, [signUpEvent.checkedTerms]);

  const { _applyAccount, _isExistedAccount } = useSignUp();

  const clickVerifyButton = () => {
    const { email, password, phone, confirmedPassword } = getValues();

    const isValid = isPhoneVerifyPrepared(
      phone,
      errors,
      isVerification,
      setIsVerification,
      setError,
      email,
    );
    if (
      [password, confirmedPassword].some((password) => isFalsy(password)) ||
      password !== confirmedPassword
    ) {
      setError('password', { message: '비밀번호를 다시 확인해주세요.' });
      return;
    }
    if (isValid === false) return;
    return _getVerifyCode(phone);
  };

  _isExistedAccount(watch('email'), signUpEvent.triggerConfirmEmail, setError);

  const [isPassedVerifyCode] = _checkSmsVerifyCode(getValues('phone'));

  const requestVerifyCodeButton = useMemo(() => {
    return eventHandlerByFindAccount(isVerification);
  }, [isVerification.firstCalled, isVerification.theElseCalled]);

  const { className, disabled, text, phoneNumberInput } = requestVerifyCodeButton.phone;

  return (
    <Layout>
      <div className='flex flex-col justify-between'>
        <div>
          <div>
            <h3 className='text-left text-3XL/medium text-grey-800'>회원가입</h3>
          </div>

          <div className='mt-10 space-y-8'>
            {/*이메일*/}
            <div className='inputCustom-group'>
              <label className='inputCustom-label' htmlFor='email'>
                이메일
              </label>
              <div className='inputCustom-textbox-wrap'>
                <input
                  className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
                  id='email'
                  type='email'
                  placeholder='이메일'
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: '올바른 이메일 주소를 입력해주세요.',
                    },
                    onChange: (event: ChangeEvent<HTMLInputElement>) => {
                      assignEmail(event, signUpEvent, setSignUpEvent);
                    },
                  })}
                />
                <InputIcon
                  status={errors?.email ? INPUTSTATUS.ERROR : undefined}
                  iconSize={5}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name='email'
                render={({ message }) => (
                  <p className='inputCustom-helptext'>{message}</p>
                )}
              />
            </div>

            {/*비밀번호*/}
            <div className='space-y-2'>
              <div className='inputCustom-group'>
                <label className='inputCustom-label' htmlFor='password'>
                  비밀번호
                </label>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    id='password'
                    className={`inputCustom-textbox w-full ${
                      errors?.password ? 'error' : ''
                    }`}
                    type='password'
                    placeholder='비밀번호를 입력해주세요. (8자리 이상)'
                    {...register('password', {
                      required: '비밀번호를 입력해주세요.',
                      pattern: {
                        // : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
                        value:
                          /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/,
                        message: '숫자, 특수문자, 영문 포함 8자리 이상으로 입력해주세요.',
                      },
                    })}
                  />
                  <InputIcon
                    status={errors?.password ? INPUTSTATUS.ERROR : undefined}
                    iconSize={5}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='password'
                  render={({ message }) => (
                    <p className='inputCustom-helptext'>{message}</p>
                  )}
                />
              </div>

              <div className='inputCustom-group'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    id='confirmedPassword'
                    className={`inputCustom-textbox w-full ${
                      errors?.confirmedPassword ? 'error' : ''
                    }`}
                    type='password'
                    placeholder='비밀번호를 한번 더 입력해주세요.'
                    {...register('confirmedPassword', {
                      validate: (value: string) =>
                        value === getValues('password') || '비밀번호가 일치하지 않아요.',
                    })}
                  />
                  <InputIcon
                    status={errors?.confirmedPassword ? INPUTSTATUS.ERROR : undefined}
                    iconSize={5}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='confirmedPassword'
                  render={({ message }) => (
                    <p className='inputCustom-helptext'>{message}</p>
                  )}
                />
              </div>
            </div>
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
                      disabled={phoneNumberInput || isVerification.isExceeded}
                      {...register('phone', {
                        pattern: {
                          value: /(010)[0-9]{8}$/g,
                          message: '올바른 휴대폰번호를 입력해주세요.',
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
                  isPassedVerifyCode={isPassedVerifyCode}
                />
              )}
            </div>
            {/*이용약관*/}
            {isPassedVerifyCode && (
              <div className='space-y-4 text-grey-900'>
                <div className='rounded-md bg-grey-100 px-2.5 py-2'>
                  <input
                    type='checkbox'
                    id='allAgree'
                    // disabled={isPassedVerifyCode === false}
                    checked={signUpEvent.agreedAllTerms}
                    className='termsCheckbox peer'
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      selectAllTerms(event, signUpEvent, setSignUpEvent)
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
                            // disabled={isPassedVerifyCode === false}
                            checked={signUpEvent.checkedTerms.includes(
                              term.id as TTermsType,
                            )}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              selectTerm(event, signUpEvent, setSignUpEvent)
                            }
                          />
                          <label htmlFor={term.id} className='termsBodyCheckbox-label'>
                            {`${term.label} (${term.required})`}
                          </label>

                          <button
                            className='textButton-secondary-default-small-none'
                            type='button'
                            onClick={() =>
                              openDetailTermContent(index, signUpEvent, setSignUpEvent)
                            }
                          >
                            {signUpEvent?.isDetailOpen.includes(index) ? '접기' : '보기'}
                          </button>
                        </div>
                        {signUpEvent?.isDetailOpen.includes(index) && (
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
              </div>
            )}

            <div>
              {signUpEvent.isReadyToSignUp ? (
                <button
                  type='submit'
                  className='button-filled-normal-xLarge-red-false-false-true w-full'
                  onClick={() => {
                    const { email, password, phone } = getValues();
                    const payload = {
                      email: email,
                      password: password,
                      name: '',
                      phone: phone,
                      verifyCodeSign: isVerification.verifyCodeSignatureNumber,
                    };
                    _applyAccount(payload);
                  }}
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
          </div>
        </div>
        <FindAccountBottom />
      </div>
    </Layout>
  );
};

export default SignUpRef;
