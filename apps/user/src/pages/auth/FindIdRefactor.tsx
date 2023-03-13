import { Fragment, useState, useEffect, useMemo } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';

import { PATH } from '@/types/enum.code';
import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';
import { FindAccountTittle } from '@/pages/auth/FindAccountTittle';

import { VarifyCodeInput } from '@/pages/auth/VarifyCodeInput';
import { FindAccountLayout as Layout } from '@/components/layouts/FindAccountLayout';
import { isClickVerifyBtn } from '@/containers/auth/auth.container.refac';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { ReactSVG } from 'react-svg';

import { useSmsVerify } from '@/containers/auth/auth.api';
import { CountryType } from '@/generated/graphql';

const FindIdRefactor = () => {
  const {
    register,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm<TFindAccountErrorType>({
    mode: 'onChange',
  });
  const phoneNumber = getValues('phone');

  const [isVerification, setIsVerification] = useState<TVerifyButtonState>({
    firstCalled: false,
    //theElseCalled가 false가 되는 시점은 시간이 다 흘렀을 때
    theElseCalled: true,
    isExceeded: false,
    verifyCode: '',
  });
  const { _verifyPhoneNumber, data, isLoading } = useSmsVerify(
    phoneNumber,
    isVerification,
    setIsVerification,
    setError,
  );

  useEffect(() => {
    if (isFalsy(isVerification.verifyCode)) return;
    console.log(isVerification.verifyCode, 'verifyCode');
  }, [isVerification.verifyCode]);

  const requestVerifyCodeButton = useMemo((): {
    phone: {
      className: string;
      text: string;
      disabled: boolean;
      phoneNumberInput: boolean;
    };
    verifyCodeInput: boolean;
  } => {
    const eventOption = {
      phone: {
        className:
          'button-filled-normal-large-primary-false-false-true ml-4 min-w-[102px]',
        text: '인증',
        disabled: false,
        phoneNumberInput: false,
      },
      verifyCodeInput: false,
    };

    if (isVerification.firstCalled === true && isVerification.theElseCalled === false) {
      eventOption.phone.className =
        'ml-4 min-w-[102px] rounded border border-grey-400 bg-white p-2.5 py-3 text-grey-800';
      eventOption.phone.text = '재발송';
    }

    if (isVerification.firstCalled === true && isVerification.theElseCalled === true) {
      eventOption.phone.className =
        'ml-4 min-w-[102px] rounded border border-grey-400 bg-grey-50 p-2.5 py-3 text-grey-500';
      eventOption.phone.text = '재발송';
      eventOption.phone.disabled = true;
      eventOption.phone.phoneNumberInput = true;
    }

    return eventOption;
  }, [isVerification]);

  const { className, disabled, text, phoneNumberInput } = requestVerifyCodeButton.phone;

  const isPhoneVerifyPrepared = () => {
    if (getValues('phone').length === 11 && isFalsy(errors.phone)) {
      _verifyPhoneNumber();
      return true;
    }
    setError('phone', { message: '핸드폰 번호를 확인해주세요.' });
    return false;
  };

  return (
    <Layout>
      {/* {!findAccountQuery && responseStatus !== FIND_ACCOUNT_RESULT.STRANGER && ( */}
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
                  disabled={phoneNumberInput}
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
                    if (event.code !== 'Enter') return;
                    console.log('ho');
                    isPhoneVerifyPrepared();
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
                onClick={() => isPhoneVerifyPrepared()}
                disabled={disabled}
              >
                {text}
              </button>
            </div>
          </div>
          {isVerification.firstCalled && (
            <VarifyCodeInput
              isDisabled={requestVerifyCodeButton.verifyCodeInput}
              setIsVerification={setIsVerification}
              isVerification={isVerification}
              setError={setError}
              errors={errors}
            />
          )}
        </div>
      </div>
      {/* )} */}

      {/* <div className='space-y-8'>
        <FindAccountTittle
          title={`<span class='text-orange-500'>${3}개</span>의 아이디를 찾았어요!`}
        />

        <ul className='space-y-6'>
          {[1, 2, 3, 4, 5].map((account, index) => (
            <li
              className='flex cursor-pointer items-center justify-between rounded-lg border border-grey-300 px-5 py-3 text-orange-500'
              key={index}
              onClick={() =>
                copyToClipboard('아이디를 복사했어요.', `account.email_${account}`)
              }
            >
              <div>{`account.email_${account}`}</div>

              <ReactSVG
                src='/assets/icons/outlined/Copy.svg'
                className='cursor-pointer'
                beforeInjection={(svg) => {
                  svg.setAttribute('style', 'width: 20px; fill: #595959');
                }}
              />
            </li>
          ))}
        </ul>
      </div> */}

      {/* 조회된 결과가 없는 경우*/}
      {/* {
        <div className='space-y-8'>
          <FindAccountTittle
            title='아이디를 찾을 수 없어요.'
            subTitle='입력하신 휴대폰 번호로 가입한 계정이 존재하지 않아요.'
          />
          <div className='space-y-3'>
            <div>
              <Link to={PATH.SIGN_UP}>
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px]'
                >
                  회원가입 하기
                </button>
              </Link>
            </div>
            <div>
              <Link to={PATH.FIND_ID}>
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px] bg-white text-grey-700'
                >
                  다시 아이디 찾기
                </button>
              </Link>
            </div>
          </div>
        </div>
      } */}

      <FindAccountBottom
        buttonText='로그인 하러가기'
        text='계정이 기억나셨나요?'
        buttonLink={PATH.SIGN_IN}
      />
    </Layout>
  );
};

export default FindIdRefactor;
