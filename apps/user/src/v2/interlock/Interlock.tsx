import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import { useSetRecoilState } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import LinkIcon from '@/common/assets/link-icon.png';
import { Default as Layout } from '@/common/layouts';
import { InputIcon, INPUTSTATUS } from '@/components/InputIcon';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { Spin } from '@/components/Spin';
import { CrawlingTypeEnum, RequestCrawlingDto } from '@/generated-rest/api/front';
import EasyPayImage from '@/v2/interlock/assets/easypay-img.png';
import { useCheckVanLogin, useRequestBond } from '@/v2/interlock/hooks/interlock.hook';

interface IInterLockForm {
  id: string;
  password: string;
}

const InterLock = () => {
  const setSideBarVisibility = useSetRecoilState(SideBarVisibility);
  const { mutateAsync: checkVanLogin, isLoading: checkVanLoginLoading } =
    useCheckVanLogin();
  const { mutateAsync: requestBond, isLoading: requestBondLoading } = useRequestBond();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IInterLockForm>({
    mode: 'onChange',
  });

  const onValid = async (values: IInterLockForm) => {
    const input: RequestCrawlingDto = {
      loginId: values.id,
      password: values.password,
      type: CrawlingTypeEnum.EASYSHOP,
    };

    const result = await checkVanLogin(input);
    if (!result) {
      setError('id', { message: '' });
      setError('password', { message: '아이디 또는 패스워드가 일치하지 않습니다.' });
      return;
    }

    await requestBond(input);
  };

  useEffect(() => {
    setSideBarVisibility(false);
  }, []);

  const hasError = errors?.password?.message || errors?.id?.message;
  return (
    <Layout useGap={true}>
      <ModalComponent isOpen>
        <div className='flex overflow-hidden rounded-[10px] bg-white py-[60px] px-[60px]'>
          <div className='mr-[40px] flex min-w-[410px] flex-col overflow-hidden rounded-[10px] bg-white px-[34px] pt-[40px] text-left shadow-default'>
            <div className='mb-[40px]'>
              <div className='text-XL/Bold leading-9 text-grey-800'>
                카드 매출 데이터 연동을 위해 <br />
                <span className='flex'>
                  <span className='text-gomi-green'>이지샵</span>
                  <span className='ml-[5px] mr-[10px] cursor-pointer self-center'>
                    <img
                      src={LinkIcon}
                      width={22}
                      onClick={() =>
                        window.open(
                          'https://www.easyshop.co.kr/taxLogn/taxLognLogin.kicc',
                        )
                      }
                    />
                  </span>
                  로그인 정보를 입력해주세요.
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit(onValid)}>
              <div>
                <div className='mb-[40px] space-y-5'>
                  <div className='inputCustom-group'>
                    <label className='inputCustom-label'>아이디</label>
                    <div className='inputCustom-textbox-wrap'>
                      <input
                        className={`inputCustom-textbox w-full ${
                          errors?.id ? 'error' : ''
                        }`}
                        type='text'
                        placeholder='아이디를 입력해주세요.'
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
                      <label className='inputCustom-label'>비밀번호</label>
                      <div className='inputCustom-textbox-wrap'>
                        <input
                          className={`inputCustom-textbox w-full ${
                            errors?.password ? 'error' : ''
                          }`}
                          type='password'
                          placeholder='비밀번호를 입력해주세요.'
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
                  {errors?.id?.message &&
                    !errors?.password?.message &&
                    errors?.id?.message}
                  {!errors?.id?.message &&
                    errors?.password?.message &&
                    errors?.password?.message}
                  {errors?.id?.message &&
                    errors?.password?.message &&
                    '아이디 또는 비밀번호를 입력해주세요.'}
                </p>
                <button
                  type='submit'
                  disabled={checkVanLoginLoading || requestBondLoading}
                  className='button-filled-normal-xLarge-red-false-false-true h-[58px] w-full bg-gradient-to-r from-orange-500 to-orange-350'
                >
                  {checkVanLoginLoading || requestBondLoading ? <Spin /> : '연동하기'}
                </button>
              </div>
            </form>
          </div>
          <div>
            <img src={EasyPayImage} width={501} height={487} className='shadow-default' />
          </div>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default InterLock;
