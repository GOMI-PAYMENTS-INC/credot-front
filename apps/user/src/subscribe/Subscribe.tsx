import { Default as Layout } from '@/common/layouts';
import { TransactionHistory } from '@/subscribe/elements';
import { FAQ } from './elements/FAQ';

import { SUBSCRIBE_QNA } from '@/subscribe/constant';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/routeList';

import { RegisterCards } from '@/subscribe/elements/RegisterCards';
import { useEffect } from 'react';

export const Subscribe = () => {
  const navigator = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Layout useGap={true}>
      <section className='space-y-[60px]'>
        <header className='relative bg-grey-50'>
          <div className='absolute left-0 top-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />
          <div className='absolute right-0 bottom-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />

          <div className='flex w-full justify-center'>
            <div className='flex w-[1148px] flex-col gap-10 py-[92px]'>
              <p className='text-4XL/Bold'>구독 및 결제</p>
            </div>
          </div>
        </header>

        <main>
          <div id='subscribe_frame' className='flex justify-center'>
            <div className='w-[1148px]'>
              <div className='flex justify-around gap-[88px]'>
                <div className='w-[608px] text-2XL/Bold'>
                  <p className='pb-5'>사용중인 플랜</p>
                  <div
                    id='subscription_plan'
                    className='flex h-[270px] overflow-hidden rounded-lg border-[1px] border-grey-300'
                  >
                    <div
                      id='subscription_plan_count'
                      className='h-full w-[263px] border-r-[1px] bg-grey-50'
                    >
                      <div className='flex h-full flex-col items-center justify-center gap-2.5'>
                        <img
                          src='/assets/images/Free.png'
                          className='h-[83px] w-[83px]'
                        />
                        <p className='w-[150px] border-b-[1px] border-grey-200 pb-2.5 text-center text-XL/Bold'>
                          Free 플랜
                        </p>
                        <p className=' text-M/Medium text-grey-800'>
                          리포트 발행 수 : <span className=''>0/5</span>
                        </p>
                        <div className='h-2 w-[187px] rounded bg-orange-200' />
                      </div>
                    </div>
                    <div
                      id='subscription_plan_date'
                      className='relative flex-grow px-6 py-[35px] text-M/Regular'
                    >
                      <p className='text-M/Bold'>사용 기간</p>
                      <p>2023.08.23 ~ 2023.09.23</p>
                      <div className='flex w-full justify-end'>
                        <button
                          className='button-filled-normal-large-primary-false-false-true absolute bottom-[35px] right-6  w-[134px] bg-gradient-to-t from-orange-500 to-[#FF8C04]'
                          onClick={() => navigator(PATH.UPGRADE_PLAN)}
                        >
                          업그레이드 하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <RegisterCards />
              </div>
              <TransactionHistory />
            </div>
          </div>
        </main>

        <footer>
          <FAQ list={SUBSCRIBE_QNA} />
        </footer>
      </section>
    </Layout>
  );
};
