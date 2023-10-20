import { ErrorMessage } from '@hookform/error-message';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm, UseFormSetError } from 'react-hook-form';

import { AMPLITUDE_ACCOUNT_TYPE } from '@/amplitude/amplitude.enum';
import {
  _amplitudeSignupCompleted,
  _amplitudeSignupStarted,
  _setUserProperties,
} from '@/amplitude/amplitude.service';
import { VerifyCodeInput } from '@/auth/common/VerifyCodeInput';
import { WelcomeModal } from '@/auth/common/WelcomeModal';
import { AUTH_ESSENTIAL, TERMS_LIST } from '@/auth/constants';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import {
  assignEmail,
  authInitialState,
  eventHandlerByFindAccount,
  isCheckedEssentialTerms,
  isReadyToSignUp,
  openDetailTermContent,
  selectAllTerms,
  selectTerm,
  setWelcomeModalClosingTime,
  signUpVerifyCode,
  termInitialState,
} from '@/auth/container';
import { FindAccountBottom } from '@/auth/findAccount/elements/FindAccountBottom';
import {
  useRequestPhoneAuthHook,
  useVerifyPhoneAuthHook,
} from '@/auth/hooks/phone-auth.hook';
import { useExistEmailHook, useRegisterHook } from '@/auth/hooks/register.hook';
import { Common1Section as Layout } from '@/common/layouts/Common1Section';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { MutationSignupArgs, Role, SignupMutation } from '@/generated/graphql';
import { RegisterDto, TokenDto } from '@/generated-rest/api/front';
import { PATH, TERM_TYPE } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { isTruthy } from '@/utils/isTruthy';

export const SignUp = () => {
  const [isVerification, setIsVerification] =
    useState<TVerifyButtonState>(authInitialState);
  const [signUpState, setSignUpState] = useState(termInitialState);

  const {
    register,
    setError,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TAuthEssentialProps>({
    mode: 'onChange',
  });

  const { mutate: getVerifyCode } = useRequestPhoneAuthHook(
    isVerification,
    setIsVerification,
    setError,
  );

  const { data } = useVerifyPhoneAuthHook(
    isVerification,
    setIsVerification,
    setError,
    getValues('phone'),
  );
  const isPassedVerifyCode = !!data?.verifyCodeSignatureNumber;

  useEffect(() => {
    _amplitudeSignupStarted(AMPLITUDE_ACCOUNT_TYPE.LOCAL);
  }, []);

  useEffect(() => {
    if (isFalsy(isPassedVerifyCode)) return;
    isReadyToSignUp(isPassedVerifyCode, signUpState, setSignUpState);
  }, [signUpState.checkedTerms]);

  const { mutate: signUp } = useRegisterHook();

  /** 이메일 입력 시 이메일 계정이 존재하는지 체크 */
  useExistEmailHook(watch('email'), signUpState.triggerConfirmEmail, setError);

  const clickVerifyButton = () => {
    const phone = getValues('phone');
    const isValid = signUpVerifyCode(
      phone,
      isVerification,
      setIsVerification,
      errors,
      setError,
    );

    return isValid && getVerifyCode({ phoneNumber: phone });
  };

  const handleSignUp = (
    value: TAuthEssentialProps,
    verifyCodeSignatureNumber: string,
    signUpEvent: TTermsCheckState,
    setSignupEvent: Dispatch<SetStateAction<TTermsCheckState>>,
    setError: UseFormSetError<TAuthEssentialProps>,
  ) => {
    if (/^\s+|\s+$/g.test(value.password) === true)
      return setError('password', { message: NOTIFICATION_MESSAGE.whiteSpace });
    const _value = Object.assign(value, { verifyCode: verifyCodeSignatureNumber });

    const isValid = Object.keys(_value).filter((item) => {
      const key = item as keyof TAuthEssentialProps;
      if (isFalsy(_value[key])) {
        setError(key, { message: AUTH_ESSENTIAL[key] });
        return false;
      }
      return true;
    });
    //FIXME: validation 로직은 비즈니스로 옮기기
    const checkedTerms = [TERM_TYPE.PERSONAL_AGREE, TERM_TYPE.USE_AGREE].every((term) =>
      signUpEvent.checkedTerms.includes(term),
    );
    const isAgreeMarketing = signUpEvent.checkedTerms.includes(TERM_TYPE.MARKETING_AGREE);
    const isValidVerifyCodeSign = isFalsy(verifyCodeSignatureNumber);
    const isValidTerms = isFalsy(checkedTerms);

    if (isValid.length !== 5 || isValidVerifyCodeSign || isValidTerms) return;

    const { email, password, phone } = value;

    const payload: RegisterDto = {
      email: email,
      password: password,
      phone: phone,
      phoneVerifyCode: verifyCodeSignatureNumber,
      isMarketingOk: isAgreeMarketing,
    };

    signUp(payload, {
      onSuccess: async (_) => {
        //로그인 처리
        authTokenStorage.setToken(_.accessToken);

        //모달이 켜지고 화면 이동
        setWelcomeModalClosingTime(1500, signUpEvent, setSignupEvent);

        await _amplitudeSignupCompleted(
          AMPLITUDE_ACCOUNT_TYPE.LOCAL,
          email,
          phone,
          isAgreeMarketing,
          () => {
            _setUserProperties(email, isAgreeMarketing, phone, Role.User);
          },
        );
      },
    });
  };

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

      <div className='flex flex-col justify-between'>
        <div>
          <div>
            <h3 className='text-left text-3XL/Medium text-grey-800 xs:text-2XL/Bold'>
              회원가입
            </h3>
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
                    required: NOTIFICATION_MESSAGE.emptyEmail,
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: NOTIFICATION_MESSAGE.invalidEmail,
                    },
                    onChange: (event: ChangeEvent<HTMLInputElement>) => {
                      assignEmail(event, signUpState, setSignUpState);
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
                      required: NOTIFICATION_MESSAGE.emtpyPassword,
                      pattern: {
                        // : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
                        value:
                          /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&\s]{8,50}$/,
                        message: NOTIFICATION_MESSAGE.invalidPasswordType,
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
                      required: NOTIFICATION_MESSAGE.emtpyConfirmPassword,
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
                      className={`inputCustom-textbox w-full ${
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
                <div className='basis-[102px] xs:basis-0'>
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
                <label
                  htmlFor='allAgree'
                  className='termsHeaderCheckbox-label xs:text-S/Medium'
                >
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
                className='button-filled-normal-xLarge-red-false-false-true w-full xs:fixed xs:bottom-0 xs:right-5 xs:mb-[35px] xs:w-[335px] xs:self-center'
                onClick={() => {
                  handleSignUp(
                    getValues(),
                    isVerification.verifyCodeSignatureNumber,
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
