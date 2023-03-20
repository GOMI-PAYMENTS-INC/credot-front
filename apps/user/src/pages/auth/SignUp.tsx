import React, { Fragment, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Common1Section as Layout } from '@/components/layouts/Common1Section';
import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { SignUpInput, useExistsUserEmailQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';
import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';

import { PATH } from '@/types/enum.code';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { TERMS_LIST } from '@/containers/auth/auth.constants';
import { ErrorMessage } from '@hookform/error-message';

interface ISignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  verifyCode: string;
  requiredAgreeTerm: boolean;
}

const SignUp = () => {
  const { onSubmitSignUp } = AuthContainer();
  const [phone, setPhone] = useState('');

  //휴대폰 인증 후 리턴 받은 결과 코드
  const [verifyCodeSign, setVerifyCodeSign] = useState<string>('');
  //휴대폰 인증 여부
  const [childIsValid, setChildIsValid] = useState(false);
  //이메일 중복 여부
  const [isOnExistsEmail, setIsOnExistsEmail] = useState(false);

  //전체 선택 체크 여부
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  //체크한 item 배열
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  //이용약관 자세히 보기한 목록
  const [openedAgreeDetailList, setOpenedAgreeDetailList] = useState<number[]>([]);

  //모든 약관 동의 체크 핸들러
  const onCheckAll = (checked: boolean) => {
    //전체 선택
    if (checked) {
      const checkedItemsArray: string[] = [];
      TERMS_LIST.forEach((agreeTerm) => checkedItemsArray.push(agreeTerm.id));
      setCheckedItems(checkedItemsArray);

      setIsCheckedAll(true);
    } else {
      //전체 해제
      setCheckedItems([]);
      //모든 약관 동의 해제
      setIsCheckedAll(false);
    }
  };

  //약관 동의 체크 박스 핸들러
  const checkedItemHandler = (code: string, isChecked: boolean) => {
    if (isChecked) {
      //체크 추가할때
      setCheckedItems([...checkedItems, code]);

      //모두 체크되었을 때
      if (TERMS_LIST.length === checkedItems.length + 1) {
        setIsCheckedAll(true);
      }
    } else if (!isChecked && checkedItems.find((one) => one === code)) {
      //체크 해제할때 checkedItems에 있을 경우
      const filter = checkedItems.filter((one) => one !== code);
      setCheckedItems([...filter]);

      setIsCheckedAll(false);
    }
  };

  //약관 자세히 보기 핸들러
  const onClickOpenAgreeDetail = (index: number) => {
    if (openedAgreeDetailList.includes(index)) {
      const filter = openedAgreeDetailList.filter((one) => one !== index);

      setOpenedAgreeDetailList([...filter]);
    } else {
      setOpenedAgreeDetailList([...openedAgreeDetailList, index]);
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    mode: 'onChange',
  });
  const passwordWatcher = watch('password');
  const email = watch('email');
  const requiredAgreeTerm = watch('requiredAgreeTerm');

  const onValid = (data: ISignUpForm) => {
    const signUpInput: SignUpInput = {
      name: '',
      email: data?.email,
      password: data?.password,
      phone,
      verifyCodeSign,
    };
    onSubmitSignUp(signUpInput);
  };
  const onInvalid = (errorData: FieldErrors) => {
    console.error('error : ', errorData);
    toast.error('입력값을 재확인 해주십시오.', { autoClose: 1000 });
  };

  //필수 체크인 항목의 목록
  const requiredTERMS_LIST = TERMS_LIST.filter((agreeTerm) => agreeTerm.required);
  //체크된 항목이 변경되는 경우, 필수 선택항목이 선탹된 것인지 판단
  useEffect(() => {
    for (let i = 0; i < requiredTERMS_LIST.length; i++) {
      if (checkedItems.indexOf(requiredTERMS_LIST[i].id) < 0) {
        setValue('requiredAgreeTerm', false);
        break;
      }

      setValue('requiredAgreeTerm', true);
    }
  }, [checkedItems]);

  const { data: existsEmailQuery } = useExistsUserEmailQuery(
    graphQLClient,
    { email },
    {
      enabled: isOnExistsEmail && !!email,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        setIsOnExistsEmail(false);
        // return res.existsUserEmail || false;
        if (res.existsUserEmail) {
          setError('email', {
            type: 'custom',
            message: '이미 가입된 이메일 주소입니다.',
          });
        }
      },
      onError: () => {
        setIsOnExistsEmail(false);
      },
    },
  );

  //하단 고정 레이아웃 문구
  const accountBottomInfo = {
    text: '이미 계정이 있으신가요?',
    buttonText: '로그인 하기',
    buttonLink: PATH.SIGN_IN,
  };

  return (
    <Layout>
      <div className='flex flex-col justify-between'>
        <div>
          <div>
            <h3 className='text-left text-3XL/medium text-grey-800'>회원가입</h3>
          </div>

          <form className='mt-10 space-y-8' onSubmit={handleSubmit(onValid, onInvalid)}>
            {/*이메일*/}
            <div className='inputCustom-group'>
              <label className='inputCustom-label' htmlFor='email'>
                이메일
              </label>
              <div className='inputCustom-textbox-wrap'>
                <input
                  className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
                  id='email'
                  type='email'
                  placeholder='이메일'
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: '올바른 이메일 주소를 입력해주세요.',
                    },
                    onChange: async (event) => {
                      const regex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                      if (regex.test(event.target.value.trim())) {
                        setIsOnExistsEmail(true);
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        existsEmailQuery;
                      }
                    },
                  })}
                />
                <InputIcon
                  status={errors?.email ? INPUTSTATUS.ERROR : undefined}
                  iconSize={5}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name='email'
                render={({ message }) => (
                  <p className='inputCustom-helptext'>{message}</p>
                )}
              />
            </div>

            {/*비밀번호*/}
            <div className='space-y-2'>
              <div className='inputCustom-group'>
                <label className='inputCustom-label' htmlFor='password'>
                  비밀번호
                </label>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    id='password'
                    className={`inputCustom-textbox w-full ${
                      errors?.password ? 'error' : ''
                    }`}
                    type='password'
                    placeholder='비밀번호를 입력해주세요. (8자리 이상)'
                    {...register('password', {
                      required: '비밀번호를 입력해주세요.',
                      pattern: {
                        // : 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
                        value:
                          /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/,
                        message: '숫자, 특수문자, 영문 포함 8자리 이상으로 입력해주세요.',
                      },
                    })}
                  />
                  <InputIcon
                    status={errors?.password ? INPUTSTATUS.ERROR : undefined}
                    iconSize={5}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='password'
                  render={({ message }) => (
                    <p className='inputCustom-helptext'>{message}</p>
                  )}
                />
              </div>

              <div className='inputCustom-group'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    id='confirmPassword'
                    className={`inputCustom-textbox w-full ${
                      errors?.confirmPassword ? 'error' : ''
                    }`}
                    type='password'
                    placeholder='비밀번호를 한 번 더 입력해주세요.'
                    {...register('confirmPassword', {
                      validate: (value: string) =>
                        value === passwordWatcher || '비밀번호가 일치하지 않아요.',
                    })}
                  />
                  <InputIcon
                    status={errors?.confirmPassword ? INPUTSTATUS.ERROR : undefined}
                    iconSize={5}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='confirmPassword'
                  render={({ message }) => (
                    <p className='inputCustom-helptext'>{message}</p>
                  )}
                />
              </div>
            </div>

            {/*휴대폰 인증*/}
            <SmsVerifyCodeForm
              useLabel={true}
              onChangePhone={(value: string) => {
                setPhone(value);
              }}
              onVerifyCodeSign={(value: string) => {
                setVerifyCodeSign(value);
              }}
              onChangeChildIsValid={(value: boolean) => {
                setChildIsValid(value);
              }}
            />

            {/*이용약관*/}
            <div className='space-y-4 text-grey-900'>
              <div className='rounded-md bg-grey-100 px-2.5 py-2'>
                <input
                  type='checkbox'
                  id='allAgree'
                  checked={isCheckedAll}
                  className='termsCheckbox peer'
                  onChange={(evnet) => onCheckAll(evnet.target.checked)}
                />
                <label htmlFor='allAgree' className='termsHeaderCheckbox-label'>
                  이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
                </label>
              </div>
              <ul className='space-y-2'>
                {TERMS_LIST.map((agreeTerm, index) => {
                  //항목별 체크 여부
                  let isChecked = false;
                  isChecked = checkedItems.includes(agreeTerm.id);

                  //항목별 자세히 보기 여부
                  let isOpened = false;
                  isOpened = openedAgreeDetailList.includes(index);
                  return (
                    <li key={index}>
                      <div className='flex items-center justify-between pl-3'>
                        <input
                          type='checkbox'
                          id={agreeTerm.id}
                          checked={isChecked}
                          className='termsCheckbox peer'
                          onChange={(event) =>
                            checkedItemHandler(agreeTerm.id, event.target.checked)
                          }
                        />
                        <label htmlFor={agreeTerm.id} className='termsBodyCheckbox-label'>
                          {`${agreeTerm.label} ${
                            agreeTerm.required ? '(필수)' : '(선택)'
                          }`}
                        </label>

                        <button
                          className='textButton-secondary-default-small-none'
                          type='button'
                          onClick={() => onClickOpenAgreeDetail(index)}
                        >
                          {isOpened ? '접기' : '보기'}
                        </button>
                      </div>
                      {isOpened && (
                        <div className='mt-1.5 ml-[30px]'>
                          <textarea
                            readOnly
                            className='h-[138px] w-full rounded border border-grey-400 px-4 py-3 text-S/Regular text-grey-900'
                            value={agreeTerm.detail}
                          ></textarea>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              {isValid && childIsValid && requiredAgreeTerm && verifyCodeSign !== '' ? (
                <button
                  type='submit'
                  className='button-filled-normal-xLarge-red-false-false-true w-full'
                >
                  회원가입
                </button>
              ) : (
                <button
                  type='submit'
                  className='button-filled-disabled-xLarge-primary-false-false-true w-full'
                  disabled={true}
                >
                  회원가입
                </button>
              )}
            </div>
          </form>
        </div>
        <FindAccountBottom />
      </div>
    </Layout>
  );
};

export default SignUp;
