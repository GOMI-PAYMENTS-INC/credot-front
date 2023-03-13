import { useState, Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { useForm, UseFormSetError, FieldErrorsImpl } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { useInterval } from '@/components/useInterval';
import { isClickVerifyBtn } from '@/containers/auth/auth.container.refac';
interface IVarifyCode {
  isDisabled: boolean;
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>;
  isVerification: TVerifyButtonState;
  setError: UseFormSetError<TFindAccountErrorType>;
  errors: Partial<FieldErrorsImpl<TFindAccountErrorType>>;
}

export const VarifyCodeInput = (props: IVarifyCode) => {
  const initializeTime = { minutes: 1, seconds: 0 };
  const [time, setTime] = useState(initializeTime);
  const { isDisabled, setIsVerification, isVerification, setError, errors } = props;

  useEffect(() => {
    //TODO: container에 로직 넣기
    if (isVerification.theElseCalled) {
      setTime(Object.assign({}, time, initializeTime));
      setError('verifyCode', { message: undefined });
    }
    if (isVerification.isExceeded) {
      setTime(Object.assign({}, time, { minutes: 5, seconds: 0 }));
    }
  }, [isVerification.theElseCalled, isVerification.isExceeded]);

  const { register } = useForm<{ verifyCode: string }>({
    mode: 'onChange',
  });
  const disable = time.minutes === 0 && time.seconds === 0;

  useInterval(
    //TODO: container에 로직 넣기
    () => {
      if (time.minutes === 0 && time.seconds === 1) {
        isClickVerifyBtn(isVerification, setIsVerification);
        //TODO: 조건문 중첩 피하기 # 리펙터링 -> 함수로 분리하기
        if (isVerification.isExceeded) {
          setIsVerification(Object.assign({}, isVerification, { isExceeded: false }));
        } else {
          setError('verifyCode', {
            message: '인증시간이 만료었어요. 다시 인증해주세요.',
          });
        }
      }
      if (time.minutes > 0 && time.seconds === 0) {
        setTime(Object.assign({}, time, { minutes: time.minutes - 1, seconds: 59 }));

        if (isVerification.isExceeded) {
          setError('verifyCode', {
            message: `인증번호 발송 횟수를 초과했어요. 5분간 인증이 불가능해요.`,
          });
        }

        return;
      }

      if (time.seconds > 0) {
        setTime(Object.assign({}, time, { seconds: time.seconds - 1 }));
        return;
      }
    },
    disable ? null : 1000,
  );

  return (
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
          readOnly={disable || isVerification.isExceeded}
          {...register('verifyCode', {
            pattern: {
              value: /[0-9]{6}$/g,
              message: '인증번호 6자리를 입력해주세요.',
            },
            onChange: (event) => {
              event.target.value = event.target.value.replace(/[^0-9]/g, '');

              if (event.target.value?.length === 6) {
                //TODO: container에 로직 넣기
                setIsVerification(
                  Object.assign({}, isVerification, { verifyCode: event.target.value }),
                );
              }
            },
          })}
          onBlur={() => {}}
        />
        <InputIcon time={time} />
      </div>
      {isFalsy(errors.verifyCode) === false && (
        <ErrorMessage
          errors={errors}
          name='verifyCode'
          render={({ message }) => <p className='inputCustom-helptext'>{message}</p>}
        />
      )}
    </div>
  );
};
