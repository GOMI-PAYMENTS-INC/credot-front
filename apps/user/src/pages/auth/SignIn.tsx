import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContainer } from '@/containers/auth/auth.container';
import { LoginInput } from '@/generated/graphql';
import { PATH } from '@/router/routeList';

interface ISignInForm {
  email: string;
  password: string;
}
const SignIn = () => {
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
    <div className='container'>
      <div className='grid min-w-[1320px] grid-cols-12 gap-x-6'>
        <div className='col-span-5 col-start-2'>
          <img src='/src/assets/images/LoginInfoImg1.png' alt='' />
        </div>
        <div className='col-span-5 flex flex-col rounded-3xl bg-white px-[60px] pt-12'>
          <div className='mb-10'>
            <h3 className='text-center text-3XL/medium'>로그인</h3>
          </div>
          <div className='space-y-12'>
            <form onSubmit={handleSubmit(onValid, onInvalid)}>
              <div className='space-y-6'>
                <div className='space-y-8'>
                  <div className='space-y-2'>
                    <label className='text-S/Medium text-grey-800'>이메일</label>
                    <input
                      className='w-full  rounded border border-gray-300 px-4  py-3 placeholder:text-grey-500  focus:border-orange-300 focus:outline-none'
                      type='email'
                      placeholder='이메일'
                      {...register('email', {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                          message: '올바른 이메일 주소를 입력하세요.',
                        },
                      })}
                    />
                    <p className='text-S/Medium text-red-500'>{errors?.email?.message}</p>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-S/Medium text-grey-800'>비밀번호</label>
                    <input
                      className='w-full  rounded border border-gray-300 px-4  py-3 placeholder:text-grey-500  focus:border-orange-300 focus:outline-none'
                      type='password'
                      placeholder='비밀번호'
                      {...register('password', {
                        required: '비밀번호를 입력해주세요.',
                      })}
                    />
                    <p className=' text-S/Medium text-red-500'>
                      {errors?.password?.message}
                    </p>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember_me'
                      name='remember_me'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 bg-blue-500 focus:ring-blue-400'
                      checked={isLoginStorage}
                      onChange={(e) => onLoginStorageCheck(e)}
                    />
                    <label htmlFor='remember_me' className='text-S/Regular '>
                      로그인 상태 유지
                    </label>
                  </div>
                  <div>
                    <Link to={PATH.FIND_ID}>
                      <button className='cursor-pointer justify-center  bg-white py-2.5  px-2 text-S/Bold text-grey-800'>
                        아이디 찾기
                      </button>
                    </Link>
                    <Link to={PATH.FIND_PASSWORD}>
                      <button className='cursor-pointer justify-center   bg-white py-2.5  px-2 text-S/Bold text-grey-800'>
                        비밀번호 찾기
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div>
                    <button
                      type='submit'
                      className='w-full cursor-pointer justify-center rounded-md  bg-primary-red-orange p-4 text-L/Bold text-white'
                    >
                      로그인
                    </button>
                  </div>
                  <div>
                    {/* TODO 구글로그인 버튼 커스텀 컴포넌트 필요 casey 23.01.20 13:10 */}
                    <div
                      id='google-login-button'
                      className='w-full cursor-pointer justify-center bg-white text-L/Bold text-grey-800'
                    >
                      구글 로그인
                    </div>
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
                    className='w-full cursor-pointer justify-center rounded-md  border border-orange-300 bg-white p-4 text-L/Bold text-primary-red-orange'
                  >
                    회원가입 하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
