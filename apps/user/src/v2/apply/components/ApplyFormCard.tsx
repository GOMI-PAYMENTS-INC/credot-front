import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { NOTIFICATION_MESSAGE, TERMS_LIST } from '@/auth/constants';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { Spin } from '@/components/Spin';
import { TERM_TYPE } from '@/types/enum.code';
import { PrefundRequestIdAtom } from '@/v2/apply/atom/request.atom';
import { SuccessModal } from '@/v2/apply/components/SuccessModal';
import { useApplyPrefund } from '@/v2/apply/hooks/apply.hook';

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

export const ApplyFormCard = ({ prefund }: { prefund: number }) => {
  const [requestIds] = useRecoilState(PrefundRequestIdAtom);
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
  const { mutateAsync: applyMutate, isLoading: isApplyLoading } = useApplyPrefund();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IApplyForm>({
    mode: 'onChange',
  });

  const onValid = async (values: IApplyForm) => {
    const success = await applyMutate({
      name: values.name,
      companyName: values.companyName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      prefund,
      requestId: requestIds[0],
    });

    if (success) {
      setShowSuccessModal(true);
    }
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
      <div
        className={
          isMobile
            ? 'pb-[70px]'
            : 'rounded-[8px] bg-white px-[47px] py-[33px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'
        }
      >
        <form
          onSubmit={handleSubmit(onValid)}
          className={`flex ${isMobile ? 'flex-col' : ''}`}
        >
          <div className={isMobile ? '' : 'mr-[36px] w-[454px]'}>
            <div className='inputCustom-group flex'>
              <label
                className='inputCustom-label mr-[12px] w-[64px] self-center text-right text-S/Medium text-grey-800'
                htmlFor='name'
              >
                상호명
              </label>
              <div className='inputCustom-textbox-wrap w-full'>
                <input
                  className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                    errors?.companyName ? 'error' : ''
                  }`}
                  type='text'
                  placeholder='사업자등록증상의 상호명을 입력해주세요.'
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
                성명
              </label>
              <div className='inputCustom-textbox-wrap w-full'>
                <input
                  className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                    errors?.name ? 'error' : ''
                  } h-[46px]`}
                  type='text'
                  placeholder='담당자분의 성함을 입력해주세요.'
                  {...register('name', {
                    required: '셩명을 입력해주세요.',
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
                  className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                    errors?.phoneNumber ? 'error' : ''
                  }`}
                  id='verify'
                  type='text'
                  placeholder='담당자분의 전화번호를 입력해주세요.'
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
                  className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                    errors?.email ? 'error' : ''
                  }`}
                  id='email'
                  type='email'
                  placeholder='담당자분의 이메일 주소를 입력해주세요.'
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
          </div>
          <div
            className={`${isMobile ? 'mt-[10px]' : 'w-[416px]'} space-y-4 text-grey-900`}
          >
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
                className={`${
                  isMobile
                    ? 'termsHeaderCheckbox-label text-[14px] text-grey-800'
                    : 'termsHeaderCheckbox-label xs:text-M/Medium'
                } pl-[36px]`}
              >
                이용약관, 개인정보 수집 및 이용에 {isMobile ? <br /> : null} 모두
                동의합니다.
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
                        className='textButton-secondary-default-small-none min-w-[30px]'
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
            <div
              className={`${
                errors?.requiredAgreeTerm ? 'visible' : 'invisible'
              } h-[20px]`}
            >
              <p className='inputCustom-helptext'>{errors?.requiredAgreeTerm?.message}</p>
            </div>
            {!isMobile && (
              <div className='mt-[30px]'>
                <button
                  type='submit'
                  disabled={isApplyLoading}
                  className='button-filled-normal-xLarge-red-false-false-true h-[58px] w-full bg-gradient-to-r from-orange-500 to-orange-350'
                >
                  {isApplyLoading ? <Spin color='white' /> : '신청 완료'}
                </button>
              </div>
            )}
            {isMobile && (
              <button
                type='submit'
                disabled={isApplyLoading}
                className='fixed left-0 bottom-0 w-full bg-orange-500 bg-gradient-to-r from-orange-500 to-orange-350 px-2.5 py-[29px] text-L/Bold text-white'
              >
                {isApplyLoading ? <Spin size='small' /> : '서비스 신청하기'}
              </button>
            )}
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
