import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Icons } from '@/components/icons';
import Layout from '@/components/layouts/layout';
import { AuthContainer } from '@/containers/auth/auth.container';
import { FindUserContainer } from '@/containers/auth/find-user.container';
import {
  CountryType,
  FindAccountQueryVariables,
  SendSmsVerificationCodeMutationVariables,
} from '@/generated/graphql';
import { Paths } from '@/router/paths';

interface Form {
  phone: string;
  verifyCode: string;
}
interface ResultType {
  type: Result;
}
enum Result {
  MEMBER = 200,
  STRANGER = 1002,
  NOTMATCHCODE = 1001,
}

const FindIdPage = () => {
  const { onSendSmsVerifyCode } = AuthContainer();
  const { setFindAccount, findAccountQuery, findAccountQueryError } = FindUserContainer();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>();

  // 인증번호 발송 진행중 여부
  const [isSending, setSending] = useState<boolean>(false);
  // 인증번호 발송 횟수
  const [countSend, setCountSend] = useState<number>(0);
  // 인증번호 길이 유효성 여부 (6글자)
  const [isValidate, setIsValidate] = useState<boolean>(true);
  // 인증번호 올바른지 판단 여부
  const [isCodeRight, setCodeRight] = useState<boolean>(false);
  // 결과 상태
  const [result, setResult] = useState<ResultType>({ type: Result.NOTMATCHCODE });

  const phoneNumber = watch('phone', undefined);
  const code = watch('verifyCode', undefined); // false: defaultValue

  // 인증번호 발송
  const waitSendMobileCheck = () => {
    toast.info('발송중입니다. 조금만 기다려주세요', { autoClose: 1000 });
  };
  // 인증번호 발송 버튼 클릭 시
  const onClickSendBtn = () => {
    sendSmsVerifyCode();
  };
  // 인증번호 발송을 위해 전화번호 작성후 enter키 누른 후
  const onKeyUpEnter = (e: any) => {
    if (e.key === 'Enter') {
      onClickSendBtn();
    }
  };

  // 인증번호 발송
  const initVerifyCode = () => {
    // 인증번호 발송 시작
    setSending(true);
    setTimeout(() => {
      // 인증 진행 완료
      setSending(false);
    }, 1000 * 60);
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
      setCountSend(countSend + 1);
    } else {
      // 발송중
      waitSendMobileCheck();
    }
  };

  // 글자수를 체크해서 6글자인 경우 isValidate 상태를 바꾼다.
  const checkValidate = (code: string) => {
    setIsValidate(code.trim().length === 6);
  };

  // 코드를 적을 때 6글자인지 체크한다.
  useEffect(() => {
    code ? checkValidate(code) : null;
  }, [code]);

  // 인증번호 맞는지 DB 체크
  const changeWriteVerifyCode = () => {
    const params: FindAccountQueryVariables = {
      user: {
        /** 전화번호 */
        phone: phoneNumber,
        /** 인증번호 */
        verifyCode: code,
      },
      country: CountryType.Kr,
    };
    setFindAccount(params);
  };

  // isValidate 가 참인 경우(글자가 6개인 경우), 인증번호가 올바른지 DB 체크.
  useEffect(() => {
    phoneNumber && changeWriteVerifyCode();
  }, [isValidate]);

  // DB 판단 결과, 유효한 결과가 나온 경우
  useEffect(() => {
    if (findAccountQuery) {
      // 올바른 인증 코드
      setCodeRight(true);
      // 결과 셋팅
      setTimeout(() => {
        // 회원 정보가 있는 경우
        setResult({ type: Result.MEMBER });
      }, 1000);
    }
  }, [findAccountQuery]);

  // DB 판단 결과, 에러가 나온 경우
  useEffect(() => {
    if (findAccountQueryError && code) {
      const errorCode =
        // @ts-ignore TODO
        findAccountQueryError.response.errors[0].extensions.exception.response.status;

      // 존재하는 회원이 아닌경우
      if (errorCode === Result.STRANGER) {
        // 올바른 인증 코드
        setCodeRight(true);
        // 결과 셋팅
        setTimeout(() => {
          setResult({ type: Result.STRANGER });
        }, 1000);
      }

      // 인증 코드가 올바르지 않는 경우
      if (errorCode === Result.NOTMATCHCODE) {
        // 올바르지 않은 인증 코드
        setCodeRight(false);
        // 결과 셋팅
        setResult({ type: Result.NOTMATCHCODE });
      }
    }
  }, [findAccountQueryError]);

  return (
    <Layout>
      {/* TODO: 기존 모달-> 페이지로 변경된 경우 공통 레이아웃 컴포넌트로 만들 예정입니다. */}
      <div className='flex h-screen w-full justify-center'>
        <div className='mt-[11.56vh] w-full max-w-[26.25rem]'>
          {/* 아이디 찾기 폼 시작 */}
          {result.type === Result.NOTMATCHCODE && (
            <>
              <h3 className='mb-5 text-center text-2xl-bold'>아이디 찾기</h3>
              {/* TODO:컴포넌트로 만들 예정 시작, sign-up.page.tsx 에 있습니다. 아래 코드가 컴포넌트가 되도록 해보겠습니다. */}
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
                    })}
                    onKeyUp={onKeyUpEnter}
                  />
                  <p className='pl-3 text-2xs-regular text-functional-error'>
                    {errors?.phone?.message}
                  </p>

                  {/* 발송 여부에 따른 버튼 출력이 다름 시작 */}
                  {/* 발송하기전 */}
                  {countSend === 0 ? (
                    <button
                      type='button'
                      className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
                      onClick={onClickSendBtn}
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
                {countSend > 0 && (
                  <div className='space-y-2'>
                    <div className=' flex w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'>
                      <input
                        className='w-11/12 border-0'
                        type='text'
                        maxLength={6}
                        placeholder='인증번호'
                        {...register('verifyCode', {
                          required: '인증번호 필수입력입니다.',
                          maxLength: { value: 6, message: 'error message' },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: '올바른 인증번호를 입력하세요.',
                          },
                        })}
                      />
                      {/* 인증번호 확인 여부에 다른 출력 시작 */}
                      {isCodeRight ? (
                        <span className='inline-block w-1/12 '>
                          <Icons.Check className='my-0 mx-auto w-4 fill-functional-success' />
                        </span>
                      ) : (
                        <span className='inline-block w-1/6 text-right text-functional-error'>
                          1:00
                        </span>
                      )}
                      {/* 인증번호 확인 여부에 다른 출력 끝 */}
                    </div>
                    <p className='text-2xs-regular text-functional-error'>
                      인증시간이 만료되었습니다. 다시 인증해 주세요.
                    </p>
                  </div>
                )}
              </div>
              {/* 컴포넌트로 만들 예정 끝 */}
            </>
          )}
          {/* 아이디 찾기 폼 끝 */}

          {/* 아이디 찾기 결과 시작 */}
          {result.type === Result.MEMBER && (
            <div>
              <h3 className='mb-5 text-center text-2xl-bold'>아이디 찾기 완료</h3>
              <p className='text-center text-l-regular'>
                회원님께서 가입한 아이디는 아래와 같아요.
              </p>
              <ul className='mt-16 grid gap-y-4 '>
                {findAccountQuery &&
                  findAccountQuery.findAccount.accounts.map((account, index) => (
                    <li className='flex text-primary-red-orange' key={index}>
                      <a href='#' className='mr-2 '>
                        <Icons.Copy className='fill-primary-red-orange' />
                      </a>
                      {account.email}
                    </li>
                  ))}
              </ul>
              <div className='mt-16 '>
                <button
                  type='button'
                  className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
                >
                  완료
                </button>
              </div>
            </div>
          )}
          {/* 아이디 찾기 결과 끝 */}

          {/* 조회된 결과가 없는 경우 시작 */}
          {result.type === Result.STRANGER && (
            <div className=''>
              <h3 className='mb-5 text-center text-2xl-bold'>계정 안내</h3>
              <p className='text-center text-l-regular'>
                이전에 가입한 계정이 존재하지 않습니다.
              </p>
              <div className='mt-16 '>
                <Link to={Paths.signUp}>
                  <button
                    type='button'
                    className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
                  >
                    회원가입 바로가기
                  </button>
                </Link>
              </div>
            </div>
          )}
          {/* 조회된 결과가 없는 경우 끝 */}
        </div>
      </div>
    </Layout>
  );
};

export default FindIdPage;
