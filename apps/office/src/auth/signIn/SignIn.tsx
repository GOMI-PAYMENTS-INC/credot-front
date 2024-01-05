import { InfoCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NOTIFICATION_MESSAGE } from '@/auth/constants';
import { useLoginHook } from '@/auth/hooks/login.hook';
import { PATH } from '@/common/constants';
import { Common2Section as Layout } from '@/common/layouts/Common2Section';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { LoginDto } from '@/generated-rest/api/front';
import { authTokenStorage } from '@/utils/authToken';
interface ISignInForm {
  email: string;
  password: string;
}

export const SignIn = () => {
  const navigation = useNavigate();
  const { mutate: loginMutate } = useLoginHook();

  useEffect(() => {
    if (authTokenStorage.getToken()) {
      navigation(PATH.HOME);
      return;
    }
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<ISignInForm>({
    mode: 'onChange',
  });

  const onValid = (value: ISignInForm) => {
    const loginFormValue: LoginDto = {
      email: value.email,
      password: value.password,
    };
    loginMutate(loginFormValue, {
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));
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
            default:
              toast.error(errorCode);
          }
        }
      },
    });
  };

  return (
    <Layout>
      <div>
        <h3 className='text-center text-3XL/Medium md:hidden'>관리자 로그인</h3>
      </div>
      <div className='mt-10 space-y-12 md:mt-[56px] md:space-y-8'>
        <form onSubmit={handleSubmit(onValid)}>
          <div className='space-y-4'>
            <div className='mb-[30px] space-y-8'>
              <div className='inputCustom-group'>
                <label className='inputCustom-label'>이메일</label>
                <div className='inputCustom-textbox-wrap'>
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: NOTIFICATION_MESSAGE.emptyEmail,
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: NOTIFICATION_MESSAGE.invalidEmail,
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder='이메일'
                        className='py-[0.75rem]'
                        status={errors?.email ? 'error' : ''}
                        suffix={
                          errors?.email ? (
                            <InfoCircleOutlined className='text-L/Medium' />
                          ) : (
                            <span />
                          )
                        }
                      />
                    )}
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
                    <Controller
                      name='password'
                      control={control}
                      rules={{
                        required: '비밀번호를 입력해주세요.',
                        pattern: {
                          // : 모든 글자 8자리 이상 입력
                          value: /^.{8,}$/,
                          message: '비밀번호는 8자리 이상 입력해주세요.',
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type='password'
                          placeholder='비밀번호를 입력해주세요. (8자리 이상)'
                          className='py-[0.75rem]'
                          status={errors?.password ? 'error' : ''}
                          suffix={
                            errors?.password ? (
                              <InfoCircleOutlined className='text-L/Medium' />
                            ) : (
                              <span />
                            )
                          }
                        />
                      )}
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
            </div>

            <div className='space-y-3'>
              <div>
                <button
                  type='submit'
                  className='w-full rounded border-0 bg-purple-600 px-2.5 py-4 text-L/Bold  text-white '
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
