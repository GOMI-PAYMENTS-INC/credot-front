import { Divider } from 'antd';
import { useForm } from 'react-hook-form';
import { ReactSVG } from 'react-svg';

import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { Spin } from '@/components/Spin';
import {
  CrawlingResponseDto,
  CrawlingTypeEnum,
  RequestCrawlingDto,
} from '@/generated-rest/api/front';
import { CustomSelect } from '@/v2/apply/components/LoginView';

interface ISearchForm {
  id: string;
  password: string;
  type: CrawlingTypeEnum;
}

export const MLoginView = ({
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
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <div className='inputCustom-group'>
              <label className='inputCustom-label'>정산 받는 곳</label>
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
            <div className='inputCustom-group relative mt-[20px]'>
              <label className='inputCustom-label'>아이디</label>
              <div className='inputCustom-textbox-wrap'>
                <input
                  className={`inputCustom-textbox w-full text-S/Regular ${
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
            <div className='mt-[20px]'>
              <div className='inputCustom-group'>
                <label className='inputCustom-label'>비밀번호</label>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    className={`inputCustom-textbox w-full text-S/Regular ${
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
            } mt-[20px] flex min-h-[20px] w-full justify-center`}
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
            className='mt-[10px] h-[56px] w-full rounded-[8px] border-[1px] border-orange-300 bg-orange-100 text-L/Bold text-orange-400'
          >
            {loading ? <Spin size='small' /> : '조회하기'}
          </button>
        </div>
      </form>
    </div>
  );
};
