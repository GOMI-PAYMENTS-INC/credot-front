import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Layout from '@/components/layouts/layout';
import { AuthContainer } from '@/containers/auth/auth.container';
import { LoginInput } from '@/generated/graphql';
import { Paths } from '@/router/paths';

interface ISignInForm {
  email: string;
  password: string;
}
const SignInPage = () => {
  const { onSubmitSignIn } = AuthContainer();
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

  return (
    <Layout>
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='w-full max-w-[26.25rem]'>
          <h3 className='mb-5 text-center text-2xl-bold'>로그인</h3>
          <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className='space-y-2'>
              <div className='space-y-2'>
                <input
                  className=' w-full rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
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
                <p className='text-2xs-regular text-functional-error'>
                  {errors?.email?.message}
                </p>
              </div>
              <div className='space-y-2'>
                <input
                  className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  type='password'
                  placeholder='비밀번호'
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                />
                <p className=' text-2xs-regular text-functional-error'>
                  {errors?.password?.message}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember_me'
                    name='remember_me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-blue-500 focus:ring-blue-400'
                  />
                  <label htmlFor='remember_me' className='ml-2 block text-s-regular '>
                    로그인 상태 유지
                  </label>
                </div>
                <div>
                  <Link
                    to={Paths.findId}
                    className='relative pr-2 text-s-regular after:absolute after:top-0 after:right-0 after:top-1/2 after:block after:h-full after:h-4/5 after:w-px after:translate-y-[-50%] after:bg-primary-black'
                  >
                    아이디 찾기
                  </Link>
                  <Link to={Paths.findPw} className='pl-2 text-s-regular '>
                    비밀번호 찾기
                  </Link>
                </div>
              </div>
            </div>

            <div className='mt-16 divide-y divide-[#EDEDED]'>
              <div className='pb-5'>
                <button
                  type='submit'
                  className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
                >
                  로그인
                </button>
              </div>
              <div className='pt-5'>
                <button
                  type='button'
                  className='text-400-regular flex w-full cursor-pointer justify-center rounded border border-[#cccccc] p-2.5 text-m-regular'
                >
                  구글 로그인
                </button>
              </div>
            </div>
          </form>
          <div className='pt-5 text-center text-gray-400'>
            <span className='text-s-regular'>
              아직 회원이 아니세요?
              <Link
                to={Paths.signUp}
                className='ml-2 text-s-bold text-primary-red-orange'
              >
                회원가입
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default SignInPage;
