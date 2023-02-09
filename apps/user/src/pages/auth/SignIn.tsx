import React, { Fragment } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContainer } from '@/containers/auth/auth.container';
import { LoginInput } from '@/generated/graphql';
import { PATH } from '@/router/routeList';
import { ReactSVG } from 'react-svg';

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
  const navigate = useNavigate();
  const { onSubmitSignIn, setIsLoginStorage, isLoginStorage } = AuthContainer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({
    mode: 'onChange',
  });

  const onValid = (data: ISignInForm) => {
    const loginInput: LoginInput = {
      email: data?.email,
      password: data?.password,
    };
    onSubmitSignIn(loginInput);
  };

  const onInvalid = (errorData: FieldErrors) => {
    console.error('error : ', errorData);
    toast.error('입력값을 재확인 해주십시오.', { autoClose: 1000 });
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
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className='space-y-6'>
            <div className='space-y-8'>
              <div className='space-y-2'>
                <label className='text-S/Medium text-grey-800'>이메일</label>
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
                  })}
                />
                <p className='inputCustom-helptext'>{errors?.email?.message}</p>
              </div>
              <div className='space-y-2'>
                <label className='text-S/Medium text-grey-800'>비밀번호</label>
                <input
                  className={`inputCustom-textbox w-full ${
                    errors?.password ? 'error' : ''
                  }`}
                  type='password'
                  placeholder='비밀번호를 입력해주세요. (8자리 이상)'
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                />
                <p className=' text-S/Medium text-red-500'>{errors?.password?.message}</p>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='rememter_me'
                  name='rememter_me'
                  type='checkbox'
                  className='checkboxCustom peer'
                  checked={isLoginStorage}
                  onChange={(e) => onLoginStorageCheck(e)}
                />
                <label
                  htmlFor='rememter_me'
                  className='checkboxCustom-label bg-[length:24px_24px] bg-[left_top_50%] pl-[30px] text-S/Regular  '
                >
                  로그인 상태 유지
                </label>
              </div>
              <div>
                <button
                  type='button'
                  onClick={() => navigate(PATH.FIND_ID)}
                  className='cursor-pointer justify-center  bg-white py-2.5  px-2 text-S/Bold text-grey-800'
                >
                  아이디 찾기
                </button>

                <button
                  type='button'
                  onClick={() => navigate(PATH.FIND_PASSWORD)}
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
                  className='button-filled-normal-xLarge-primary-false-false-true  w-full '
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
                    src='assets/icons/Google.svg'
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
