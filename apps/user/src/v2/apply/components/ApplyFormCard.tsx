import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { NOTIFICATION_MESSAGE, TERMS_LIST } from '@/auth/constants';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { TERM_TYPE } from '@/types/enum.code';
import { SuccessModal } from '@/v2/apply/components/SuccessModal';

interface IApplyForm {
  companyName: string;
  name: string;
  phoneNumber: string;
  email: string;
  requiredAgreeTerm: boolean;
  useAgree: boolean;
  personalAgree: boolean;
  personalAgree2: boolean;
  marketingAgree: boolean;
}

export const ApplyFormCard = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [termTextStatus, setTermTextStatus] = useState<{
    useAgree: boolean;
    personalAgree: boolean;
    personalAgree2: boolean;
    marketingAgree: boolean;
  }>({
    useAgree: false,
    personalAgree: false,
    personalAgree2: false,
    marketingAgree: false,
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IApplyForm>({
    mode: 'onChange',
  });

  const onValid = (values: IApplyForm) => {
    setShowSuccessModal(true);
  };

  // 이용약관 하위를 모두 선택했을 경우 모든 동의 OK 처리
  const termForms = watch(['useAgree', 'personalAgree', 'personalAgree2']);
  useEffect(() => {
    if (termForms.every((value) => !!value)) {
      setValue('requiredAgreeTerm', true);
    }
  }, [termForms]);

  return (
    <>
      <div className='w-full rounded-t-[8px] bg-grey-800 py-[25px] text-center text-XL/Bold text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
        서비스 이용 신청서
      </div>
      <div className='rounded-b-[8px] bg-grey-100 px-[107px] py-[33px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
        <form onSubmit={handleSubmit(onValid)}>
          <div className='inputCustom-group flex'>
            <label
              className='inputCustom-label mr-[12px] w-[64px] self-center text-right text-S/Medium text-grey-800'
              htmlFor='name'
            >
              상호명
            </label>
            <div className='inputCustom-textbox-wrap w-full'>
              <input
                className={`inputCustom-textbox w-full ${
                  errors?.companyName ? 'error' : ''
                } h-[46px]`}
                type='text'
                placeholder='(주) 고미페이먼츠'
                {...register('companyName', {
                  required: '상호명을 입력해주세요.',
                })}
              />
              <InputIcon
                status={errors?.companyName ? INPUTSTATUS.ERROR : undefined}
                iconSize={5}
              />
            </div>
          </div>
          <div className={`${errors?.companyName ? 'visible' : 'invisible'} h-[20px]`}>
            <p className='inputCustom-helptext ml-[76px]'>
              {errors?.companyName?.message || ''}
            </p>
          </div>

          <div className='inputCustom-group mt-[8px] flex'>
            <label
              className='inputCustom-label mr-[12px] w-[64px] self-center text-right text-S/Medium text-grey-800'
              htmlFor='name'
            >
              이름
            </label>
            <div className='inputCustom-textbox-wrap w-full'>
              <input
                className={`inputCustom-textbox w-full ${
                  errors?.name ? 'error' : ''
                } h-[46px]`}
                type='text'
                placeholder='이름'
                {...register('name', {
                  required: '이름을 입력해주세요.',
                })}
              />
              <InputIcon
                status={errors?.name ? INPUTSTATUS.ERROR : undefined}
                iconSize={5}
              />
            </div>
          </div>
          <div className={`${errors?.name ? 'visible' : 'invisible'} h-[20px]`}>
            <p className='inputCustom-helptext ml-[76px]'>
              {errors?.name?.message || ''}
            </p>
          </div>

          <div className='inputCustom-group mt-[8px] flex'>
            <label
              className='inputCustom-label mr-[12px] w-[64px] self-center text-right text-S/Medium text-grey-800'
              htmlFor='name'
            >
              전화번호
            </label>
            <div className='inputCustom-textbox-wrap w-full'>
              <input
                className={`inputCustom-textbox w-full ${
                  errors?.phoneNumber ? 'error' : ''
                }`}
                id='verify'
                type='text'
                placeholder='전화번호를 숫자만 입력해주세요.'
                maxLength={11}
                {...register('phoneNumber', {
                  required: NOTIFICATION_MESSAGE.emptyPhoneNumber,
                  pattern: {
                    value: /(010)[0-9]{8}$/g,
                    message: NOTIFICATION_MESSAGE.invalidPhone,
                  },
                  onChange: (event) => {
                    event.target.value = event.target.value.replace(/[^0-9]/g, '');
                  },
                })}
              />
              <InputIcon
                status={errors?.phoneNumber ? INPUTSTATUS.ERROR : undefined}
                iconSize={5}
              />
            </div>
          </div>
          <div className={`${errors?.phoneNumber ? 'visible' : 'invisible'} h-[20px]`}>
            <p className='inputCustom-helptext ml-[76px]'>
              {errors?.phoneNumber?.message || ''}
            </p>
          </div>
          <div className='inputCustom-group mt-[8px] flex'>
            <label
              className='inputCustom-label mr-[12px] w-[64px] self-center text-right text-S/Medium text-grey-800'
              htmlFor='email'
            >
              이메일
            </label>
            <div className='inputCustom-textbox-wrap w-full'>
              <input
                className={`inputCustom-textbox w-full ${errors?.email ? 'error' : ''}`}
                id='email'
                type='email'
                placeholder='dbkim99@gmail.com'
                {...register('email', {
                  required: NOTIFICATION_MESSAGE.emptyEmail,
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: NOTIFICATION_MESSAGE.invalidEmail,
                  },
                })}
              />
              <InputIcon
                status={errors?.email ? INPUTSTATUS.ERROR : undefined}
                iconSize={5}
              />
            </div>
          </div>
          <div className={`${errors?.email ? 'visible' : 'invisible'} h-[20px]`}>
            <p className='inputCustom-helptext ml-[76px]'>
              {errors?.email?.message || ''}
            </p>
          </div>

          <Divider className='my-[30px]' />

          <div className='space-y-4 text-grey-900'>
            <div className='rounded-md bg-grey-100 px-2.5 py-2'>
              <input
                type='checkbox'
                id='requiredAgreeTerm'
                {...register('requiredAgreeTerm', {
                  required: '이용약관과 개인정보 수집에 동의해주세요.',
                  onChange: (e) => {
                    if (e.target.checked) {
                      setValue(TERM_TYPE.USE_AGREE, true);
                      setValue(TERM_TYPE.PERSONAL_AGREE, true);
                      setValue(TERM_TYPE.PERSONAL_AGREE_2, true);
                      setValue(TERM_TYPE.MARKETING_AGREE, true);
                    } else {
                      setValue(TERM_TYPE.USE_AGREE, false);
                      setValue(TERM_TYPE.PERSONAL_AGREE, false);
                      setValue(TERM_TYPE.PERSONAL_AGREE_2, false);
                      setValue(TERM_TYPE.MARKETING_AGREE, false);
                    }
                    setValue('requiredAgreeTerm', e.target.checked);
                  },
                })}
                className='termsCheckbox peer'
              />
              <label
                htmlFor='requiredAgreeTerm'
                className='termsHeaderCheckbox-label xs:text-S/Medium'
              >
                이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </label>
            </div>
            <ul className='space-y-2'>
              {TERMS_LIST.map((term, index) => {
                return (
                  <li key={index}>
                    <div className='flex items-center justify-between pl-3'>
                      <input
                        type='checkbox'
                        id={term.id}
                        className='termsCheckbox peer'
                        {...register(term.id, {
                          required: term.required === '필수',
                        })}
                      />
                      <label htmlFor={term.id} className='termsBodyCheckbox-label'>
                        {`${term.label} (${term.required})`}
                      </label>

                      <button
                        className='textButton-secondary-default-small-none'
                        type='button'
                        onClick={() => {
                          setTermTextStatus({
                            ...termTextStatus,
                            [term.id]: !termTextStatus[term.id],
                          });
                        }}
                      >
                        {termTextStatus[term.id] ? '접기' : '보기'}
                      </button>
                    </div>
                    {termTextStatus[term.id] && (
                      <div className='mt-1.5 ml-[30px]'>
                        <textarea
                          readOnly
                          className='h-[138px] w-full rounded border border-grey-400 px-4 py-3 text-S/Regular text-grey-900'
                          value={term.detail}
                        ></textarea>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className={`${errors?.requiredAgreeTerm ? 'visible' : 'invisible'} h-[20px]`}
          >
            <p className='inputCustom-helptext'>{errors?.requiredAgreeTerm?.message}</p>
          </div>

          <div className='mt-[30px]'>
            <button
              type='submit'
              className='button-filled-normal-xLarge-red-false-false-true h-[58px] w-full bg-gradient-to-r from-orange-500 to-orange-350'
            >
              신청 완료
            </button>
          </div>
        </form>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};
