import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthContainer } from '@/containers/auth/auth.legacy.container';
import { AuthVerifyCodeContainer } from '@/containers/auth/auth-verify-code.container';
import {
  CountryType,
  SendSmsVerificationCodeMutationVariables,
} from '@/generated/graphql';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { NOTIFICATION_MESSAGE } from '@/constants/notification.constant';

export interface SmsVerifyCodeProps {
  useLabel?: boolean;
  onChangePhone: (value: string) => void;
  onVerifyCodeSign: (value: string) => void;
  onChangeChildIsValid: (value: boolean) => void;
}
interface IVerifyCodeForm {
  phone: string;
  verifyCode: string;
}

const SmsVerifyCodeForm = ({
  useLabel,
  onChangePhone,
  onVerifyCodeSign,
  onChangeChildIsValid,
}: SmsVerifyCodeProps) => {
  const { onSendSmsVerifyCode, isSending, setSending } = AuthContainer();
  const { setPhone, setVerifyCode, onConfirmVerifyCode, verifyCodeSign } =
    AuthVerifyCodeContainer();

  // 인증번호 발송 횟수
  const [verifyCodeCount, setVerifyCodeCount] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [phoneDisable, setPhoneDisable] = useState<boolean>(false);
  const {
    register,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<IVerifyCodeForm>({
    mode: 'onChange',
  });

  const phoneNumber = watch('phone', undefined);

  useEffect(() => {
    onChangeChildIsValid(isValid);
  }, [isValid]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (minutes === 0) {
        clearInterval(countdown);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  useEffect(() => {
    if (isSending === true) {
      setMinutes(1);
      setTimeout(() => {
        // 인증 진행 완료
        setSending(false);
        setPhoneDisable(false);
      }, 1000 * 60);
    }
  }, [isSending]);

  useEffect(() => {
    if (onConfirmVerifyCode.isError) {
      setError('verifyCode', {
        type: 'custom',
        message: '인증번호가 올바르지 않아요.',
      });
    }
  }, [onConfirmVerifyCode.isError]);

  useEffect(() => {
    if (verifyCodeSign) {
      onVerifyCodeSign(verifyCodeSign);
    }
  }, [verifyCodeSign]);

  const waitSendMobileCheck = () => {
    toast.info('발송중입니다. 조금만 기다려주세요', { autoClose: 1000 });
  };

  // 인증번호 발송 프로세스
  const sendSmsVerifyCode = () => {
    if (!phoneNumber) {
      return;
    }
    if (!isSending) {
      const params: SendSmsVerificationCodeMutationVariables = {
        country: CountryType.Kr,
        phone: phoneNumber,
      };
      onSendSmsVerifyCode(params);
      // 발송 횟수 추가
      // TODO 너무빨리 인증번호 작성이 뜸
      setVerifyCodeCount(verifyCodeCount + 1);
      setPhoneDisable(true);
    } else {
      // 발송중
      waitSendMobileCheck();
    }
  };

  // 인증번호 oncChange 할 때 갯수가 6개인지 체크해서 6개인 경우 외부로 값을 보냄
  const onChangeVerifyCodeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    const verifyCode = e.target.value.trim();
    if (verifyCode.length > 5) {
      setVerifyCode(verifyCode);
      setPhone(phoneNumber);
    }
  };

  return (
    <div className='space-y-1'>
      {useLabel && (
        <div>
          <label className='inputCustom-label' htmlFor='email'>
            휴대폰 인증
          </label>
        </div>
      )}
      <div className='flex items-start'>
        <div className='inputCustom-group grow'>
          <div className='inputCustom-textbox-wrap'>
            <input
              className={`inputCustom-textbox w-full ${errors?.phone ? 'error' : ''}`}
              id='verify'
              type='text'
              placeholder='휴대폰번호를 숫자만 입력해주세요.'
              maxLength={11}
              disabled={phoneDisable || !!verifyCodeSign}
              {...register('phone', {
                required: NOTIFICATION_MESSAGE.emptyPhoneNumber,
                pattern: {
                  value: /(010)[0-9]{8}$/g,
                  message: NOTIFICATION_MESSAGE.invalidPhone,
                },
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/[^0-9]/g, '');
                  onChangePhone?.(event.target.value);
                },
              })}
              onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.keyCode === 13) {
                  sendSmsVerifyCode();
                }
              }}
            />
            <InputIcon
              status={errors?.phone ? INPUTSTATUS.ERROR : undefined}
              iconSize={5}
            />
          </div>
          {errors?.phone?.message && (
            <p className='inputCustom-helptext'>{errors?.phone?.message}</p>
          )}
        </div>

        {/* 발송 여부에 따른 버튼 출력이 다름 시작 */}
        {/* 발송하기전 */}
        {/* eslint-disable-next-line no-nested-ternary */}
        <div className='basis-[102px]'>
          {verifyCodeCount === 0 ? (
            <button
              type='button'
              className='button-filled-normal-large-primary-false-false-true ml-4 min-w-[102px]'
              onClick={sendSmsVerifyCode}
            >
              인증
            </button>
          ) : !isSending && !verifyCodeSign ? (
            <button
              type='button'
              className='ml-4 min-w-[102px] rounded border border-grey-400 bg-white p-2.5 py-3 text-grey-800'
              onClick={sendSmsVerifyCode}
            >
              재발송
            </button>
          ) : (
            <button
              type='button'
              className='ml-4 min-w-[102px] rounded border border-grey-400 bg-grey-50 p-2.5 py-3 text-grey-500'
              onClick={sendSmsVerifyCode}
              disabled={true}
            >
              재발송
            </button>
          )}
        </div>
        {/* 발송 여부에 따른 버튼 출력이 다름 끝 */}
      </div>

      {!!verifyCodeCount && (
        <div className='inputCustom-group'>
          <div className='inputCustom-textbox-wrap'>
            <input
              className={`inputCustom-textbox w-full ${
                errors?.verifyCode ? 'error' : ''
              }`}
              id='verifyCode'
              type='text'
              maxLength={6}
              placeholder='인증번호 6자리를 입력해주세요.'
              disabled={!!verifyCodeSign}
              {...register('verifyCode', {
                //required: '인증번호 필수입력입니다.',
                pattern: {
                  value: /[0-9]{6}$/g,
                  message: '인증번호 6자리를 입력해주세요.',
                },
                onChange: (event) => {
                  onChangeVerifyCodeCheck(event);
                },
              })}
            />
            {/* 인증번호 확인 여부에 다른 출력 시작 */}
            {verifyCodeSign ? (
              <InputIcon status={INPUTSTATUS.COMPLETED} iconSize={5} />
            ) : (
              <InputIcon time={{ minutes, seconds }} />
            )}
          </div>
          {errors?.verifyCode?.message && (
            <p className='inputCustom-helptext'>{errors?.verifyCode?.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SmsVerifyCodeForm;
