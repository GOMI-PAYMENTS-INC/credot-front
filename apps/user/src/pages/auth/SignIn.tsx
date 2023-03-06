import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContainer } from '@/containers/auth/auth.container';
import { MutationLoginArgs } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import { ReactSVG } from 'react-svg';
import { STATUS_CODE } from '@/types/enum.code';
import { InputIcon, INPUTSTATUS } from '@/components/input/InputIcon';

interface ISignInForm {
  email: string;
  password: string;
}

function onClickGooglelogin() {
  const googleBtn: HTMLElement = document.querySelector(
    '[aria-labelledby="button-label"]',
  ) as HTMLElement;
  googleBtn?.click();
}

const SignIn = () => {
  const navigation = useNavigate();
  const { loginMutate, setIsLoginStorage, isLoginStorage } = AuthContainer();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignInForm>({
    mode: 'onChange',
  });

  const onValid = (value: ISignInForm) => {
    const loginFormValue: MutationLoginArgs = {
      login: {
        email: value.email,
        password: value.password,
      },
    };
    loginMutate(loginFormValue, {
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));

        //오류 코드
        const errorCode = error.response.errors[0].extensions.code;

        //useForm error 처리
        if (errorCode) {
          switch (errorCode) {
            case STATUS_CODE.INVALID_PASSWORD:
              setError('password', {
                type: 'custom',
                message: '비밀번호가 일치하지 않아요.',
              });
              break;
            case STATUS_CODE.USER_NOT_EXIST:
              setError('email', {
                type: 'custom',
                message: '존재하지 않는 이메일 주소에요.',
              });
              break;
          }
        }
      },
    });
  };

  const onLoginStorageCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoginStorage(e.target.checked);
  };

  return (
    <Fragment>
      <div>
        <h3 className='text-center text-3XL/medium'>로그인</h3>
      </div>
      <div className='mt-10 space-y-12'>
        <form onSubmit={handleSubmit(onValid)}>
          <div className='space-y-6'>
            <div className='space-y-8'>
              <div className='inputCustom-group'>
                <label className='inputCustom-label'>이메일</label>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    className={`inputCustom-textbox w-full ${
                      errors?.email ? 'error' : ''
                    }`}
                    type='email'
                    placeholder='이메일'
                    {...register('email', {
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: '올바른 이메일 주소를 입력해주세요.',
                      },
                    })}
                  />
                  <InputIcon
                    status={errors?.email ? INPUTSTATUS.ERROR : undefined}
                    iconSize={5}
                  />
                </div>
                <p className='inputCustom-helptext'>{errors?.email?.message}</p>
              </div>
              <div className='space-y-2'>
                <div className='inputCustom-group'>
                  <label className='inputCustom-label'>비밀번호</label>
                  <div className='inputCustom-textbox-wrap'>
                    <input
                      className={`inputCustom-textbox w-full ${
                        errors?.password ? 'error' : ''
                      }`}
                      type='password'
                      placeholder='비밀번호를 입력해주세요. (8자리 이상)'
                      {...register('password', {
                        required: '비밀번호를 입력해주세요.',
                        pattern: {
                          // : 모든 글자 8자리 이상 입력
                          value: /^.{8,}$/,
                          message: '비밀번호는 8자리 이상 입력해주세요.',
                        },
                      })}
                    />
                    <InputIcon
                      status={errors?.password ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
                    />
                  </div>
                  <p className='inputCustom-helptext'>{errors?.password?.message}</p>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember_me'
                  name='remember_me'
                  type='checkbox'
                  className='checkboxCustom peer'
                  checked={isLoginStorage}
                  onChange={(event) => onLoginStorageCheck(event)}
                />
                <label
                  htmlFor='remember_me'
                  className='checkboxCustom-label bg-[length:24px_24px] bg-[left_top_50%] pl-[30px] text-S/Regular  '
                >
                  로그인 상태 유지
                </label>
              </div>
              <div>
                <button
                  type='button'
                  onClick={() => navigation(PATH.FIND_ID)}
                  className='cursor-pointer justify-center  bg-white py-2.5  px-2 text-S/Bold text-grey-800'
                >
                  아이디 찾기
                </button>

                <button
                  type='button'
                  onClick={() => navigation(PATH.FIND_PASSWORD)}
                  className='cursor-pointer justify-center   bg-white py-2.5  px-2 text-S/Bold text-grey-800'
                >
                  비밀번호 찾기
                </button>
              </div>
            </div>
            <div className='space-y-3'>
              <div>
                <button
                  type='submit'
                  className='button-filled-normal-xLarge-red-false-false-true  w-full '
                >
                  로그인
                </button>
              </div>
              <div>
                {/* TODO 구글로그인 버튼 커스텀 컴포넌트 필요 casey 23.01.20 13:10 + 있지 않을까..? 23.02.3 */}
                <div id='google-login-button' className='hidden'></div>
                <button
                  type='button'
                  className='button-outlined-normal-xLarge-grey-true-false-true w-full'
                  onClick={onClickGooglelogin}
                >
                  <ReactSVG
                    src='/assets/icons/Google.svg'
                    className='inline-block w-full'
                  />
                  구글 로그인
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className='space-y-4'>
          <div className='text-center text-M/Regular text-grey-700'>
            아직 회원이 아니세요?
          </div>
          <div>
            <Link to={PATH.SIGN_UP}>
              <button
                type='submit'
                className='button-outlined-normal-xLarge-primary-false-false-true w-full'
              >
                회원가입 하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SignIn;
