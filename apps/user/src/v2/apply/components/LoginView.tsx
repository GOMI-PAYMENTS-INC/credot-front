import { Divider } from 'antd';
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
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div className='flex flex-row items-center'>
          <div className='flex flex-row items-center'>
            <div className='inputCustom-group mr-[10px]'>
              <div className='inputCustom-textbox-wrap'>
                <CustomSelect
                  className={`h-[46px] w-[50%] w-[171px] rounded border border-grey-400 px-4  text-S/Regular text-grey-800 hover:border-orange-300 hover:shadow-inputHover`}
                  {...register('type', {
                    required: '타입을 입력해주세요.',
                  })}
                >
                  <option value={CrawlingTypeEnum.CREDIT_FINANCE}>여신금융협회</option>
                </CustomSelect>
              </div>
            </div>
            <div className='inputCustom-group relative mr-[10px]'>
              <div className='inputCustom-textbox-wrap'>
                <input
                  className={`inputCustom-textbox w-[207px] text-S/Regular ${
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
              <p
                className={`inputCustom-helptext -bottom-30 absolute left-0 ${
                  hasError ? 'visible' : 'invisible'
                } mb-[10px] flex min-h-[20px] w-[230px] justify-center`}
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
            </div>
            <div className='space-y-2'>
              <div className='inputCustom-group'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    className={`inputCustom-textbox w-[207px] text-S/Regular ${
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

          <Divider type='vertical' className='mx-[37px] h-[40px] bg-grey-300' />

          <button
            type='submit'
            disabled={loading}
            className='h-[56px] w-[223px] rounded-[8px] border-[1px] border-orange-300 bg-orange-100 text-L/Bold text-orange-400'
          >
            {loading ? <Spin size='small' /> : '조회하기'}
          </button>
        </div>
      </form>
    </div>
  );
};
