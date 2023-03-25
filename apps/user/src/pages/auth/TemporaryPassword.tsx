import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Common2Section as Layout } from '@/components/layouts/Common2Section';
import { AuthContainer } from '@/containers/auth/auth.container';
import { ChangePasswordInput } from '@/generated/graphql';
import { PATH } from '@/types/enum.code';
import { NOTIFICATION_MESSAGE } from '@/constants/notification.constant';

interface IResetPassword {
  email: string;
  password: string;
  newPassword: string;
}

const TemporaryPassword = () => {
  const { onChangePassword, isTemporaryPasswordLogin, userInfo } = AuthContainer();

  const navigation = useNavigate();

  useEffect(() => {
    if (!isTemporaryPasswordLogin) {
      navigation(PATH.SIGN_IN);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
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

  const onInvalid = () => {
    toast.error('입력값을 재확인 해주십시오.', { autoClose: 3000 });
  };

  return (
    <Layout>
      <div>
        <h3 className='text-center text-3XL/medium'>비밀번호 재설정</h3>
      </div>
      <div className='mt-10 space-y-12'>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className='space-y-6'>
            <div className='space-y-8'>
              <div className='space-y-2'>
                <label className='text-S/Medium text-grey-800'>신규 비밀번호</label>
                <input
                  id='password'
                  type='password'
                  className={`inputCustom-textbox w-full ${
                    errors?.password ? 'error' : ''
                  }`}
                  placeholder='비밀번호를 입력해주세요. (8자리 이상)'
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                    pattern: {
                      // : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
                      value:
                        /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/,
                      message: NOTIFICATION_MESSAGE.invalidPasswordType,
                    },
                  })}
                />
                {errors?.password?.message && (
                  <p className='inputCustom-helptext'>{errors?.password?.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='text-S/Medium text-grey-800'>신규 비밀번호 확인</label>
                <input
                  id='newPassword'
                  type='password'
                  className={`inputCustom-textbox w-full ${
                    errors?.newPassword ? 'error' : ''
                  }`}
                  placeholder='비밀번호를 한 번 더 입력해주세요.'
                  // @ts-ignore
                  {...register('newPassword', {
                    validate: (value: string) =>
                      value === passwordWatcher || '비밀번호가 일치하지 않아요.',
                  })}
                />
                {errors?.newPassword?.message && (
                  <p className='inputCustom-helptext'>{errors?.newPassword?.message}</p>
                )}
              </div>
            </div>
            <div className='space-y-3'>
              {isValid ? (
                <button
                  type='submit'
                  className='button-filled-normal-xLarge-red-false-false-true w-full'
                >
                  비밀번호 재설정 하기
                </button>
              ) : (
                <button
                  type='submit'
                  className='button-filled-disabled-xLarge-primary-false-false-true w-full'
                  disabled={true}
                >
                  비밀번호 재설정 하기
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default TemporaryPassword;
