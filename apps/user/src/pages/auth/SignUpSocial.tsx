import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Common1Section as Layout } from '@/components/layouts/Common1Section';

import SmsVerifyCodeForm from '@/components/form/sms-verify-code.form';
import { AuthContainer } from '@/containers/auth/auth.container';
import { GoogleSignUpInput } from '@/generated/graphql';

import { FindAccountBottom } from '@/pages/auth/FindAccountBottom';
import { TERMS_LIST } from '@/containers/auth/auth.constants';
import { useLocation } from 'react-router-dom';
import { _signupSignupStarted } from '@/amplitude/amplitude.service';
import { AccountType } from '@/amplitude/amplitude.enum';

interface ISignUpSocialForm {
  idToken: string;
  phone: string;
  verifyCode: string;
  requiredAgreeTerm: boolean;
}

const SignUpSocial = () => {
  const { onSubmitSignUpSocial } = AuthContainer();
  let location = useLocation();
  const [phone, setPhone] = useState('');

  //휴대폰 인증 후 리턴 받은 결과 코드
  const [verifyCodeSign, setVerifyCodeSign] = useState('');

  //휴대폰 인증 여부
  const [childIsValid, setChildIsValid] = useState(false);

  //전체 선택 체크 여부
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  //체크한 item 배열
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  //이용약관 자세히 보기한 목록
  const [openedAgreeDetailList, setOpenedAgreeDetailList] = useState<number[]>([]);

  useEffect(() => {
    //회원가입 화면 랜딩 시 앰플리튜드 이벤트
    _signupSignupStarted(AccountType.GOOGLE);
  }, []);

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
    setValue,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ISignUpSocialForm>();
  const requiredAgreeTerm = watch('requiredAgreeTerm');

  const onValid = () => {
    const signUpInput: GoogleSignUpInput = {
      idToken: location.state.token,
      phone,
      verifyCodeSign,
    };
    onSubmitSignUpSocial(signUpInput, location.state?.email);
  };

  const onInvalid = () => {
    toast.error('입력값을 재확인 해주십시오.', { autoClose: 3000 });
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

  return (
    <Layout>
      <div className='flex h-full flex-col justify-between'>
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
                  className=' inputCustom-textbox w-full'
                  type='email'
                  id='email'
                  value={location.state?.email}
                  placeholder='이메일'
                  readOnly
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

export default SignUpSocial;
