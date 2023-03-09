import { Fragment, useState, useEffect, useMemo } from 'react';
import { isFalsy } from '@/utils/isFalsy';

import { InputIcon, INPUTSTATUS } from '@/components/input/InputIcon';

import { PATH } from '@/router/routeList';
import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';
import { FindAccountTittle } from '@/pages/auth/FindAccountTittle';

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
    className: string;
    text: string;
    disabled: boolean;
    phoneNumberInput: boolean;
    verifyCodeInput: boolean;
  } => {
    // case 1. 최초 요청 활성화
    const eventOption = {
      className: 'button-filled-normal-large-primary-false-false-true ml-4 min-w-[102px]',
      text: '인증',
      disabled: false,
      phoneNumberInput: false,
      verifyCodeInput: false,
    };

    if (isVerification.firstCalled === true && isVerification.theElseCalled === false) {
      eventOption.className =
        'ml-4 min-w-[102px] rounded border border-grey-400 bg-white p-2.5 py-3 text-grey-800';
      eventOption.text = '재발송';
    }

    if (isVerification.firstCalled === true && isVerification.theElseCalled === true) {
      eventOption.className =
        'ml-4 min-w-[102px] rounded border border-grey-400 bg-grey-50 p-2.5 py-3 text-grey-500';
      eventOption.text = '재발송';
      eventOption.disabled = true;
      eventOption.phoneNumberInput = true;
    }

    return eventOption;
  }, [isVerification]);
  console.log(requestVerifyCodeButton, 'requestVerifyCodeButton');
  const { className, disabled, text, phoneNumberInput, verifyCodeInput } =
    requestVerifyCodeButton;
  console.log(isVerification, 'isVerification');
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
                  disabled={phoneNumberInput} // 요청이 성공적으로 보내졌을 경우, 카운트가 0이 될 때 까지
                  {...register('phone', {
                    required: '휴대폰번호 입력해주세요.',
                    pattern: {
                      value: /(010)[0-9]{8}$/g,
                      message: '올바른 휴대폰번호를 입력해주세요.',
                    },
                  })}
                  onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.code !== 'Enter' || errors.phone) return;

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
              {
                <button
                  type='button'
                  className={className}
                  onClick={() => {
                    isClickVerifyBtn(isVerification, setIsVerification);
                  }}
                  disabled={disabled}
                >
                  {text}
                </button>
              }
            </div>
          </div>

          {/* {!!verifyCodeCount && ( */}
          <div className='inputCustom-group'>
            <div className='inputCustom-textbox-wrap'>
              <input
                className={`inputCustom-textbox w-full ${
                  isFalsy(errors.verifyCode) === false && 'error'
                }`}
                id='verifyCode'
                type='text'
                maxLength={6}
                placeholder='인증번호 6자리를 입력해주세요.'
                disabled={verifyCodeInput}
                {...register('verifyCode', {
                  pattern: {
                    value: /[0-9]{6}$/g,
                    message: '인증번호 6자리를 입력해주세요.',
                  },
                })}
              />
              <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} />
              {/* {verifyCodeSign ? (
                    <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} />
                  ) : (
                    <InputIcon time={{ minutes, seconds }} />
                  )}
                   */}
            </div>
            {isFalsy(errors.verifyCode) === false && (
              <ErrorMessage
                errors={errors}
                name='verifyCode'
                render={({ message }) => (
                  <p className='inputCustom-helptext'>{message}</p>
                )}
              />
            )}
          </div>
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
