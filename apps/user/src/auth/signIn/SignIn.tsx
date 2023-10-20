import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { _amplitudeLoginPageViewed } from '@/amplitude/amplitude.service';
import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { useLoginHook } from '@/auth/hooks/login.hook';
import { signInApi } from '@/auth/signIn/api';
import { Common2Section as Layout } from '@/common/layouts/Common2Section';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { LoginDto } from '@/generated-rest/api/front';
import { PATH } from '@/types/enum.code';
interface ISignInForm {
  email: string;
  password: string;
}

export const SignIn = () => {
  const navigation = useNavigate();
  const { loginMutate } = signInApi();
  const { mutate: loginMutate2 } = useLoginHook();

  useEffect(() => {
    _amplitudeLoginPageViewed();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignInForm>({
    mode: 'onChange',
  });

  const onValid = (value: ISignInForm) => {
    const loginFormValue: LoginDto = {
      email: value.email,
      password: value.password,
    };
    loginMutate2(loginFormValue, {
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));
        console.log(error);

        const errorCode = error.body.message;
        if (errorCode) {
          switch (errorCode) {
            case 'INVALID_PASSWORD':
              setError('password', {
                type: 'custom',
                message: '비밀번호가 일치하지 않아요.',
              });
              break;
            case 'EMPTY_EMAIL':
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

  return (
    <Layout>
      <div>
        <h3 className='text-center text-3XL/Medium md:hidden'>로그인</h3>
      </div>
      <div className='mt-10 space-y-12 md:mt-[56px] md:space-y-8'>
        <form onSubmit={handleSubmit(onValid)}>
          <div className='space-y-4'>
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
                      required: NOTIFICATION_MESSAGE.emptyEmail,
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: NOTIFICATION_MESSAGE.invalidEmail,
                      },
                    })}
                  />
                  <InputIcon
                    status={errors?.email ? INPUTSTATUS.ERROR : undefined}
                    iconSize={5}
                  />
                </div>
                {errors?.email?.message && (
                  <p className='inputCustom-helptext'>{errors?.email?.message}</p>
                )}
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
                  {errors?.password?.message && (
                    <p className='inputCustom-helptext'>{errors?.password?.message}</p>
                  )}
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
              {/*<GoogleLogin onGoogleSignIn={onGoogleSignIn} />*/}
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
                className='button-outlined-normal-xLarge-primary-false-false-true w-full md:mb-[114px]'
              >
                회원가입 하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
