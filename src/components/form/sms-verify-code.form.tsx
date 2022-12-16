import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthContainer } from '@/containers/auth/auth.container';
import {
  CountryType,
  SendSmsVerificationCodeMutationVariables,
} from '@/generated/graphql';

export interface SmsVerifyCodeProps {
  onChangePhone: (value: string) => void;
  onChangeVerifyCodeSign: (value: string) => void;
}
interface IVerifyCodeForm {
  phone: string;
  verifyCode: string;
}

const SmsVerifyCodeForm = ({
  onChangePhone,
  onChangeVerifyCodeSign,
}: SmsVerifyCodeProps) => {
  const { onSendSmsVerifyCode } = AuthContainer();
  // 인증번호 발송 진행중 여부
  const [isSending, setSending] = useState<boolean>(false);
  // 인증번호 발송 횟수
  const [verifyCodeCount, setVerifyCodeCount] = useState<number>(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IVerifyCodeForm>({
    mode: 'onChange',
  });

  const phoneNumber = watch('phone', undefined);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  // 인증번호 발송
  const initVerifyCode = () => {
    // 인증번호 발송 시작
    // setVerifyCode(true);
    setSending(true);
    setTimeout(() => {
      // 인증 진행 완료
      setSending(false);
    }, 1000 * 60);
    setMinutes(1);
  };
  const waitSendMobileCheck = () => {
    toast.info('발송중입니다. 조금만 기다려주세요', { autoClose: 1000 });
  };

  // 인증번호 발송 프로세스
  const sendSmsVerifyCode = () => {
    if (errors.phone) {
      return;
    }
    if (!isSending) {
      initVerifyCode();
      const params: SendSmsVerificationCodeMutationVariables = {
        country: CountryType.Kr,
        phone: phoneNumber,
      };
      onSendSmsVerifyCode(params);
      // 발송 횟수 추가
      setVerifyCodeCount(verifyCodeCount + 1);
    } else {
      // 발송중
      waitSendMobileCheck();
    }
  };

  // 인증번호 oncChange 할 때 갯수가 6개인지 체크해서 6개인 경우 외부로 값을 보냄
  const onChangeVerifyCodeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 6) {
      onChangeVerifyCodeSign?.(e.target.value.trim());
    }
  };

  return (
    <div className='space-y-2'>
      <div className='flex items-center'>
        <input
          className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
          type='text'
          placeholder='휴대폰번호 - 없이 입력'
          {...register('phone', {
            required: '휴대폰번호 필수입력입니다.',
            pattern: {
              value: /(010)[0-9]{8}$/g,
              message: '올바른 휴대폰번호를 입력하세요.',
            },
            onChange: (e) => {
              onChangePhone?.(e.target.value.trim());
            },
          })}
        />
        <p className='pl-3 text-2xs-regular text-functional-error'>
          {errors?.phone?.message}
        </p>

        {/* 발송 여부에 따른 버튼 출력이 다름 시작 */}
        {/* 발송하기전 */}
        {/* eslint-disable-next-line no-nested-ternary */}
        {verifyCodeCount === 0 ? (
          <button
            type='button'
            className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
            onClick={sendSmsVerifyCode}
          >
            인증
          </button>
        ) : !isSending ? (
          <button
            type='button'
            className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
            onClick={sendSmsVerifyCode}
          >
            재발송
          </button>
        ) : (
          <button
            type='button'
            className='ml-2 min-w-[4.6875rem] rounded border-0 bg-gray-300  p-2.5 text-sm  text-gray-500'
            onClick={sendSmsVerifyCode}
          >
            재발송
          </button>
        )}
        {/* 발송 여부에 따른 버튼 출력이 다름 끝 */}
      </div>
      {!!verifyCodeCount && (
        <div className='space-y-2'>
          <div className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'>
            <input
              className='w-5/6 border-0'
              type='text'
              placeholder='인증번호'
              {...register('verifyCode', {
                required: '인증번호 필수입력입니다.',
                pattern: {
                  value: /[0-9]{6}$/g,
                  message: '올바른 인증번호를 입력하세요.',
                },
                onChange: (e) => {
                  onChangeVerifyCodeCheck(e);
                },
              })}
            />

            {/* 인증번호 확인 여부에 다른 출력 시작 */}
            {/*   <span className='inline-block w-1/12 '> */}
            {/*     <Icons.Check className='my-0 mx-auto w-4 fill-functional-success' /> */}
            {/*  </span> */}
            <span className='inline-block w-1/6 text-right text-functional-error'>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
            {/* 인증번호 확인 여부에 다른 출력 끝 */}
          </div>
          <p className='text-2xs-regular text-functional-error'>
            {errors?.verifyCode?.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default SmsVerifyCodeForm;
