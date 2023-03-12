import { Fragment, useState, useEffect, useMemo } from 'react';
import { isFalsy } from '@/utils/isFalsy';

import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';

import { PATH } from '@/router/routeList';
import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';
import { FindAccountTittle } from '@/pages/auth/FindAccountTittle';
import { VarifyCodeInput } from '@/pages/auth/VarifyCodeInput';

import { isClickVerifyBtn } from '@/containers/auth/auth.container.refac';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const FindIdRefactor = () => {
  const {
    register,
    watch,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm<TVerifyCodeForm>({
    mode: 'onChange',
  });

  const [isVerification, setIsVerification] = useState({
    firstCalled: false,
    //theElseCalled가 false가 되는 시점은 시간이 다 흘렀을 때
    theElseCalled: true,
  });

  // 인증요청 시 필요한 값
  const phoneNumber = getValues('phone');

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
      isClickVerifyBtn(isVerification, setIsVerification);
      return true;
    }
    setError('phone', { message: '핸드폰 번호를 확인해주세요.' });
    return false;
  };

  return (
    <Fragment>
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
                  className={`inputCustom-textbox w-full ${
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
                    if (isPhoneVerifyPrepared() === false) return;

                    console.log(errors, 'error');

                    console.log('success to request api');
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
                onClick={() => {
                  if (isPhoneVerifyPrepared() === false) return;
                }}
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
            />
            // <div className='inputCustom-group'>
            //   <div className='inputCustom-textbox-wrap'>
            //     <input
            //       className={`inputCustom-textbox w-full ${
            //         isFalsy(errors.verifyCode) === false && 'error'
            //       }`}
            //       id='verifyCode'
            //       type='text'
            //       maxLength={6}
            //       placeholder='인증번호 6자리를 입력해주세요.'
            //       disabled={requestVerifyCodeButton.verifyCodeInput}
            //       {...register('verifyCode', {
            //         pattern: {
            //           value: /[0-9]{6}$/g,
            //           message: '인증번호 6자리를 입력해주세요.',
            //         },
            //         onChange: (event) => {
            //           event.target.value = event.target.value.replace(/[^0-9]/g, '');
            //         },
            //       })}
            //     />
            //     <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} />
            //     {/* {verifyCodeSign ? (
            //         <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} />
            //       ) : (
            //         <InputIcon time={{ minutes, seconds }} />
            //       )}
            //        */}
            //   </div>
            //   {isFalsy(errors.verifyCode) === false && (
            //     <ErrorMessage
            //       errors={errors}
            //       name='verifyCode'
            //       render={({ message }) => (
            //         <p className='inputCustom-helptext'>{message}</p>
            //       )}
            //     />
            //   )}
            // </div>
          )}
        </div>
      </div>
      {/* )} */}

      {/* 아이디 찾기 결과 시작
      {findAccountQuery && (
        <div className='space-y-8'>
          <FindAccountTittle
            title={`<span class='text-orange-500'>${
              findAccountQuery ? findAccountQuery.findAccount.accounts.length : 0
            }개</span>의 아이디를 찾았어요!`}
          />

          <ul className='space-y-6'>
            {findAccountQuery &&
              findAccountQuery.findAccount.accounts.map((account, index) => (
                <li
                  className='flex flex items-center justify-between rounded-lg border border-grey-300 px-5 py-3 text-orange-500'
                  key={index}
                >
                  <div>{account.email}</div>
                  <a href='#' className='inline-block text-L/Regular'>
                    <ReactSVG
                      src='/assets/icons/outlined/Copy.svg'
                      className='cursor-pointer'
                      beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 20px; fill: #595959');
                      }}
                      onClick={() =>
                        copyToClipboard('아이디를 복사했어요.', account.email)
                      }
                    />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )} */}

      {/* 조회된 결과가 없는 경우 시작
      {responseStatus === FIND_ACCOUNT_RESULT.STRANGER && (
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
      )} */}

      <FindAccountBottom
        buttonText='로그인 하러가기'
        text='계정이 기억나셨나요?'
        buttonLink={PATH.SIGN_IN}
      />
    </Fragment>
  );
};

export default FindIdRefactor;
