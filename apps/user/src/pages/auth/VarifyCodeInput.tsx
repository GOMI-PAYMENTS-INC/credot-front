import { isFalsy } from '@/utils/isFalsy';
import { useState, Dispatch, SetStateAction } from 'react';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useInterval } from '@/components/useInterval';

interface IVarifyCode {
  isDisabled: boolean;
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>;
  isVerification: TVerifyButtonState;
}

export const VarifyCodeInput = (props: IVarifyCode) => {
  const [time, setTime] = useState({ minutes: 1, seconds: 0 });

  const { isDisabled, setIsVerification, isVerification } = props;
  const {
    register,
    watch,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm<TVerifyCodeForm>({
    mode: 'onChange',
  });
  const disable = time.minutes === 0 && time.seconds === 0;
  useInterval(
    () => {
      if (time.minutes === 0 && time.seconds === 1) {
        setIsVerification(Object.assign({}, isVerification, { theElseCalled: false }));
        setError('verifyCode', { message: '인증시간이 만료었어요. 다시 인증해주세요.' });
      }
      if (time.minutes > 0 && time.seconds === 0) {
        setTime(Object.assign({}, time, { minutes: time.minutes - 1, seconds: 3 }));
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
          disabled={disable}
          {...register('verifyCode', {
            pattern: {
              value: /[0-9]{6}$/g,
              message: '인증번호 6자리를 입력해주세요.',
            },
            onChange: (event) => {
              event.target.value = event.target.value.replace(/[^0-9]/g, '');
            },
          })}
        />
        <InputIcon time={time} />
        {/* <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} /> */}
        {/* {verifyCodeSign ? (
          <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} />
        ) : (
          <InputIcon time={{ minutes, seconds }} />
        )}
         */}
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
