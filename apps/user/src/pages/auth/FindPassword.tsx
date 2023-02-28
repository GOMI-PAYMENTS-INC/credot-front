import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { CountryType, SendTemporaryPasswordMutationVariables } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import { SEND_TEMPORARY_PASSWORD_RESULT } from '@/types/enum.code';
import { FindIdPasswordBottom } from '@/pages/auth/FindIdPasswordBottom';
import { FindIdPasswordTittle } from '@/pages/auth/FindIdPasswordTittle';

interface IFindPasswordForm {
  email: string;
}

// 전화번호 가운데 마스킹 처리
const maskingPhone = (phone: string) => {
  return phone
    .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    .split('-')
    .reduce((pre, cur, idx) => (idx === 1 ? pre + '****' : pre + cur), '');
};

const FindPassword = () => {
  const {
    onSendTemporaryPassword,
    isSuccessSendTemporaryPassword,
    sendTemporaryPasswordResponseStatus,
  } = AuthContainer();
  const [childIsValid, setChildIsValid] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<IFindPasswordForm>({
    mode: 'onChange',
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 유저 임시 비밀번호 발급 쿼리 실행
  const initSendTemporaryPassword = (verifyCodeSign: string) => {
    if (errors.email) {
      return;
    }
    const params: SendTemporaryPasswordMutationVariables = {
      user: {
        /** 이메일 */
        email,
        /** 전화번호 */
        phone,
        /** 인증번호 */
        verifyCodeSign,
      },
      country: CountryType.Kr,
    };
    onSendTemporaryPassword(params);
  };

  // 인증번호 valiation을 통과한 경우, [유저 임시 비밀번호 발급] 작동시킴
  const sendTemporaryPassword = (value: string) => {
    if (value && childIsValid) {
      initSendTemporaryPassword(value);
    }
  };

  //하단 고정 레이아웃 문구
  const accountBottomInfo = {
    text: '계정이 기억나셨나요?',
    buttonText: '로그인 하러가기',
    buttonLink: PATH.SIGN_IN,
  };

  return (
    <Fragment>
      {/* 비밀번호 찾기 폼 시작 */}
      {!isSuccessSendTemporaryPassword &&
        sendTemporaryPasswordResponseStatus !==
          SEND_TEMPORARY_PASSWORD_RESULT.STRANGER && (
          <>
            <div className='space-y-8'>
              <FindIdPasswordTittle
                title='비밀번호를 찾을게요.'
                subTitle='이메일과 회원가입 시 인증한 휴대폰 번호를 입력해주세요.'
              />

              <div className='space-y-2'>
                <input
                  className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
                  type='email'
                  placeholder='이메일'
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: '올바른 이메일 주소를 입력해주세요.',
                    },
                    onChange: (e) => {
                      setEmail?.(e.target.value.trim());
                    },
                  })}
                />
                <p className='inputCustom-helptext'>{errors?.email?.message}</p>
                <SmsVerifyCodeForm
                  onChangePhone={(value: string) => {
                    setPhone(value);
                  }}
                  onVerifyCodeSign={(value: string) => {
                    sendTemporaryPassword(value);
                  }}
                  onChangeChildIsValid={(value: boolean) => {
                    setChildIsValid(value);
                  }}
                />
              </div>
            </div>

            <FindIdPasswordBottom
              buttonText={accountBottomInfo.buttonText}
              text={accountBottomInfo.text}
              buttonLink={accountBottomInfo.buttonLink}
            />
          </>
        )}
      {/* 비밀번호 찾기 폼 끝 */}

      {/* 비밀번호 임시발송 완료 끝 */}
      {isSuccessSendTemporaryPassword && (
        <>
          <div className='space-y-8'>
            <FindIdPasswordTittle
              title='임시 비밀번호를 발송했어요.'
              subTitle='회원님께서 가입하신 연락처로<br>임시 비밀번호를 발송했어요.'
            />

            <div className='rounded-lg border border-grey-300 px-6 py-5 text-center text-orange-500'>
              {maskingPhone(phone)}
            </div>

            <div>
              <Link to={PATH.SIGN_IN}>
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px]'
                >
                  로그인 하기
                </button>
              </Link>
            </div>
          </div>

          <FindIdPasswordBottom
            buttonText={accountBottomInfo.buttonText}
            text={accountBottomInfo.text}
            buttonLink={accountBottomInfo.buttonLink}
          />
        </>
      )}

      {/* 비밀번호 임시발송 완료 끝 */}

      {/*검색 결과 없음 시작*/}
      {sendTemporaryPasswordResponseStatus ===
        SEND_TEMPORARY_PASSWORD_RESULT.STRANGER && (
        <div className='space-y-8'>
          <FindIdPasswordTittle
            title='일치하는 회원정보가 없어요.'
            subTitle='이메일 주소 또는 휴대폰 번호를 다시 한 번 확인해주세요.'
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
              <Link to={PATH.FIND_PASSWORD}>
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px] bg-white text-grey-700'
                >
                  다시 비밀번호 찾기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/*검색 결과 없음 끝*/}
    </Fragment>
  );
};

export default FindPassword;
