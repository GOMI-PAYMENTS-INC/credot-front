import { useForm } from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { Spin } from '@/components/Spin';
import {
  CrawlingResponseDto,
  CrawlingTypeEnum,
  RequestCrawlingDto,
} from '@/generated-rest/api/front';

const CustomSelect = styled.select`
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  background-position: calc(100% - 0.75rem) center !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right: 2rem !important;
`;

interface ISearchForm {
  id: string;
  password: string;
  type: CrawlingTypeEnum;
}

export const LoginView = ({
  checkVanLogin,
  searchMyBond,
  loading = false,
}: {
  checkVanLogin(input: RequestCrawlingDto): Promise<boolean>;
  searchMyBond(
    input: RequestCrawlingDto,
  ): Promise<CrawlingResponseDto[] | Record<string, any>[]>;
  loading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISearchForm>({
    mode: 'onChange',
    defaultValues: {
      type: CrawlingTypeEnum.CREDIT_FINANCE,
    },
  });

  const onValid = async (values: ISearchForm) => {
    const input: RequestCrawlingDto = {
      loginId: values.id,
      password: values.password,
      type: values.type,
    };

    const result = await checkVanLogin(input);
    if (!result) {
      setError('id', { message: '' });
      setError('password', { message: '아이디 또는 패스워드가 일치하지 않습니다.' });
      return;
    }

    await searchMyBond(input);
  };

  const hasError = errors?.password?.message || errors?.id?.message;

  return (
    <>
      <p className='mb-[40px] text-S/Regular text-grey-800'>
        사용중인 가맹점 매출 관리사이트의 로그인 정보를 입력해주세요. 묶여 있는 정산금을
        바로 확인해드릴께요!
      </p>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <div className='mb-[40px] space-y-5'>
            <div className='inputCustom-group'>
              <div className='inputCustom-textbox-wrap'>
                <CustomSelect
                  className={`h-[46px] w-[50%] rounded border border-grey-400  px-4 text-grey-800 hover:border-orange-300 hover:shadow-inputHover`}
                  {...register('type', {
                    required: '타입을 입력해주세요.',
                  })}
                >
                  <option value={CrawlingTypeEnum.CREDIT_FINANCE}>여신금융협회</option>
                </CustomSelect>
              </div>
            </div>
            <div className='inputCustom-group'>
              <div className='inputCustom-textbox-wrap'>
                <input
                  className={`inputCustom-textbox w-full placeholder:text-grey-800 ${
                    errors?.id ? 'error' : ''
                  } h-[46px]`}
                  type='text'
                  placeholder='아이디'
                  {...register('id', {
                    required: '아이디를 입력해주세요.',
                  })}
                />
                <InputIcon
                  status={errors?.id ? INPUTSTATUS.ERROR : undefined}
                  iconSize={5}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <div className='inputCustom-group'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    className={`inputCustom-textbox w-full placeholder:text-grey-800 ${
                      errors?.password ? 'error' : ''
                    } h-[46px]`}
                    type='password'
                    placeholder='비밀번호'
                    {...register('password', {
                      required: '비밀번호를 입력해주세요.',
                    })}
                  />
                  <InputIcon
                    status={errors?.password ? INPUTSTATUS.ERROR : undefined}
                    iconSize={5}
                  />
                </div>
              </div>
            </div>
          </div>

          <p
            className={`inputCustom-helptext ${
              hasError ? 'visible' : 'invisible'
            } mb-[10px] flex min-h-[20px] justify-center`}
          >
            <ReactSVG
              src='/assets/icons/outlined/ExclamationCircle.svg'
              className='mr-[4px] self-center'
              beforeInjection={(svg) => {
                svg.setAttribute('class', `w-4 h-4 fill-red-600`);
              }}
            />
            {errors?.id?.message && !errors?.password?.message && errors?.id?.message}
            {!errors?.id?.message &&
              errors?.password?.message &&
              errors?.password?.message}
            {errors?.id?.message &&
              errors?.password?.message &&
              '아이디 또는 비밀번호를 입력해주세요.'}
          </p>
          <button
            type='submit'
            disabled={loading}
            className='button-filled-normal-xLarge-red-false-false-true h-[58px] w-full bg-gradient-to-r from-orange-500 to-orange-350'
          >
            {loading ? <Spin /> : '조회하기'}
          </button>
        </div>
      </form>
    </>
  );
};
