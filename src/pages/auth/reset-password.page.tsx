import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Layout from '@/components/layouts/layout';
import { AuthContainer } from '@/containers/auth/auth.container';
import { ChangePasswordInput } from '@/generated/graphql';
import { Paths } from '@/router/paths';

interface IResetPassword {
  email: string;
  password: string;
  newPassword: string;
}

const ResetPasswordPage = () => {
  const { onChangePassword, isTemporaryPasswordLogin, userInfo } = AuthContainer();

  const navigate = useNavigate();
  if (!isTemporaryPasswordLogin) {
    navigate(Paths.home);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>({
    mode: 'onChange',
  });
  const passwordWatcher = watch('password');
  const onValid = (data: IResetPassword) => {
    if (!userInfo) {
      return false;
    }

    const changePasswordInput: ChangePasswordInput = {
      email: userInfo?.me.email,
      newPassword: data?.newPassword,
    };

    return onChangePassword(changePasswordInput);
  };

  const onInvalid = (errorData: FieldErrors) => {
    console.error('error : ', errorData);
    toast.error('입력값을 재확인 해주십시오.', { autoClose: 1000 });
  };

  return (
    <Layout>
      {/* TODO: 기존 모달-> 페이지로 변경된 경우 공통 레이아웃 컴포넌트로 만들 예정입니다. */}
      <div className='flex h-screen w-full justify-center'>
        <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
          {/* 비밀번호 찾기 폼 시작 */}
          <div className=''>
            <h3 className='mb-5 text-center text-2xl-bold'>신규 비밀번호 설정</h3>
            <p className='mb-5 text-center text-l-regular'>
              임시 비밀번호로 로그인 하셨습니다.
              <br />
              신규 비밀번호를 설정해 주세요.
            </p>
            <form
              action=''
              className='space-y-2'
              onSubmit={handleSubmit(onValid, onInvalid)}
            >
              <div className='space-y-2'>
                <input
                  id='password'
                  type='password'
                  className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  placeholder='비밀번호'
                  {...register('password', {
                    required: '비밀번호는 필수입력입니다.',
                    pattern: {
                      // : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
                      value:
                        /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/,
                      message: '숫자,특수문자,영문 혼합 최소 8자리 이상 입력바랍니다.',
                    },
                  })}
                />
                <p className='text-2xs-regular text-functional-error'>
                  {errors?.password?.message}
                </p>
              </div>

              <div className='space-y-2'>
                <input
                  id='newPassword'
                  type='password'
                  className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
                  placeholder='비밀번호 확인'
                  // @ts-ignore
                  {...register('newPassword', {
                    validate: (value) =>
                      value === passwordWatcher || '비밀번호가 일치하지 않습니다.',
                  })}
                />
                <p className='text-2xs-regular text-functional-error'>
                  {errors?.newPassword?.message}
                </p>
              </div>

              <div className='mt-16 '>
                <button
                  type='submit'
                  className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
                >
                  완료
                </button>
              </div>
            </form>
            {/* 컴포넌트로 만들 예정 끝 */}
          </div>
          {/* 비밀번호 찾기 폼 끝 */}
        </div>
      </div>
    </Layout>
  );
};
export default ResetPasswordPage;
