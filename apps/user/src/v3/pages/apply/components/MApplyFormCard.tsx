import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useForm } from 'react-hook-form';

import { NOTIFICATION_MESSAGE, TERMS_LIST } from '@/auth/constants';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { Spin } from '@/components/Spin';
import { TERM_TYPE } from '@/types/enum.code';
import { IApplyForm } from '@/v3/pages/apply/components/ApplyFormCard';
import { SuccessModal } from '@/v3/pages/apply/components/SuccessModal';
import { useApplyPrefund } from '@/v3/pages/apply/hooks/apply.hook';

export const MApplyFormCard = () => {
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
      address: values.address,
      companyType: values.companyType,
      industryType: values.industryType,
      monthlySales: values.monthlySales,
      jobTitle: values.jobTitle,
      interestedService: values.interestedService,
      marketingAgree: values.marketingAgree,
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
      <div className={'mx-auto rounded-[8px] bg-grey-50 px-[16px] py-[33px]'}>
        <form onSubmit={handleSubmit(onValid)} className={`flex flex-col`}>
          <div>
            <div className='text-XL/Bold text-grey-900'>회사 정보</div>
            <Row className='mt-[20px]'>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='companyType'
                  >
                    사업자구분
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <select
                      className={`inputCustom-textbox h-[44px] w-full !bg-white placeholder:text-S/Regular ${
                        errors?.companyType ? 'error' : ''
                      }`}
                      placeholder='사업자구분을 선택해주세요.'
                      {...register('companyType', {
                        value: '신규사업자',
                        required: '사업자구분을 선택해주세요.',
                      })}
                    >
                      <option value='신규사업자'>신규사업자</option>
                      <option value='기존사업자'>기존사업자</option>
                    </select>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='mt-[20px]'>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='companyName'
                  >
                    상호명
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
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
                <div
                  className={`${errors?.companyName ? 'visible' : 'invisible'} h-[20px]`}
                >
                  <p className='inputCustom-helptext'>
                    {errors?.companyName?.message || ''}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='industryType'
                  >
                    업종
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <input
                      className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                        errors?.industryType ? 'error' : ''
                      }`}
                      type='text'
                      placeholder='업종을 입력해주세요.'
                      {...register('industryType', {
                        required: '업종을 입력해주세요.',
                      })}
                    />
                    <InputIcon
                      status={errors?.industryType ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
                    />
                  </div>
                </div>
                <div
                  className={`${errors?.industryType ? 'visible' : 'invisible'} h-[20px]`}
                >
                  <p className='inputCustom-helptext'>
                    {errors?.industryType?.message || ''}
                  </p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='address'
                  >
                    주소
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <input
                      className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                        errors?.address ? 'error' : ''
                      }`}
                      type='text'
                      placeholder='주소를 입력해주세요.'
                      {...register('address', {
                        required: '주소를 입력해주세요.',
                      })}
                    />
                    <InputIcon
                      status={errors?.address ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
                    />
                  </div>
                </div>
                <div className={`${errors?.address ? 'visible' : 'invisible'} h-[20px]`}>
                  <p className='inputCustom-helptext'>{errors?.address?.message || ''}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='monthlySales'
                  >
                    월 평균 매출
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <input
                      className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                        errors?.monthlySales ? 'error' : ''
                      }`}
                      type='text'
                      placeholder='월 평균 매출을 입력해주세요.'
                      {...register('monthlySales', {
                        onChange: (event) => {
                          event.target.value = Number(
                            event.target.value.replace(/[^0-9]/g, ''),
                          ).toLocaleString();
                        },
                      })}
                    />
                    <InputIcon
                      status={errors?.monthlySales ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className='mt-[50px] text-XL/Bold text-grey-900'>담당자 정보</div>
            <Row className='mt-[20px]'>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='jobTitle'
                  >
                    직함
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <input
                      className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                        errors?.jobTitle ? 'error' : ''
                      }`}
                      type='text'
                      placeholder='직함을 입력해주세요.'
                      {...register('jobTitle', {
                        required: '직함을 입력해주세요.',
                      })}
                    />
                    <InputIcon
                      status={errors?.jobTitle ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
                    />
                  </div>
                </div>
                <div className={`${errors?.jobTitle ? 'visible' : 'invisible'} h-[20px]`}>
                  <p className='inputCustom-helptext'>
                    {errors?.jobTitle?.message || ''}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='name'
                  >
                    성함
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <input
                      className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                        errors?.name ? 'error' : ''
                      }`}
                      type='text'
                      placeholder='담당자분의 성함을 입력해주세요.'
                      {...register('name', {
                        required: '성함을 입력해주세요.',
                      })}
                    />
                    <InputIcon
                      status={errors?.name ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
                    />
                  </div>
                </div>
                <div className={`${errors?.name ? 'visible' : 'invisible'} h-[20px]`}>
                  <p className='inputCustom-helptext'>{errors?.name?.message || ''}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='name'
                  >
                    연락처
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <input
                      className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                        errors?.phoneNumber ? 'error' : ''
                      }`}
                      type='text'
                      placeholder='담당자분의 연락처를 입력해주세요.'
                      {...register('phoneNumber', {
                        required: '연락처를 입력해주세요.',
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
                <div
                  className={`${errors?.phoneNumber ? 'visible' : 'invisible'} h-[20px]`}
                >
                  <p className='inputCustom-helptext'>
                    {errors?.phoneNumber?.message || ''}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='email'
                  >
                    이메일
                    <span className='ml-[3px] inline-block text-red-500'>*</span>
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <input
                      className={`inputCustom-textbox h-[44px] w-full placeholder:text-S/Regular ${
                        errors?.email ? 'error' : ''
                      }`}
                      type='text'
                      placeholder='담당자분의 이메일을 입력해주세요.'
                      {...register('email', {
                        required: '이메일을 입력해주세요.',
                      })}
                    />
                    <InputIcon
                      status={errors?.email ? INPUTSTATUS.ERROR : undefined}
                      iconSize={5}
                    />
                  </div>
                </div>
                <div className={`${errors?.email ? 'visible' : 'invisible'} h-[20px]`}>
                  <p className='inputCustom-helptext'>{errors?.email?.message || ''}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='w-full'>
                <div className='inputCustom-group flex flex-col'>
                  <label
                    className='inputCustom-label text-S/Medium text-grey-800'
                    htmlFor='interestedService'
                  >
                    관심 서비스
                  </label>
                  <div className='inputCustom-textbox-wrap w-full'>
                    <select
                      className={`inputCustom-textbox h-[44px] w-full !bg-white placeholder:text-S/Regular ${
                        errors?.interestedService ? 'error' : ''
                      }`}
                      {...register('interestedService', {
                        value: '선정산/미래정산 서비스',
                      })}
                    >
                      <option value='선정산/미래정산 서비스'>
                        선정산/미래정산 서비스
                      </option>
                      <option value='카드단말기 설치'>카드단말기 설치</option>
                    </select>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='mt-[30px]'>
              <Col className='w-full'>
                <div
                  className={`${
                    errors?.requiredAgreeTerm ? 'visible' : 'invisible'
                  } mb-[12px] h-[20px]`}
                >
                  <p className='inputCustom-helptext'>
                    {errors?.requiredAgreeTerm?.message}
                  </p>
                </div>
                <div className='w-full rounded-md py-2'>
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
              </Col>
            </Row>
            <Row>
              <Col className='mt-[40px] flex w-full flex-col justify-end'>
                <button
                  type='submit'
                  disabled={isApplyLoading}
                  className='to-purple-350 button-filled-normal-xLarge-red-false-false-true h-[58px] w-full bg-gradient-to-r from-purple-500'
                >
                  {isApplyLoading ? <Spin color='white' /> : '신청 완료'}
                </button>
              </Col>
            </Row>
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
