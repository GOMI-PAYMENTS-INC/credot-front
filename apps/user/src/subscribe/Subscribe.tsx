import { Default as Layout } from '@/common/layouts';
import { TransactionHistory } from '@/subscribe/elements';
import { FAQ } from './elements/FAQ';
import { SUBSCRIBE_QNA } from '@/subscribe/constant';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/routeList';
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
            <div className='flex w-[1148px] flex-col gap-10 py-[60px]'>
              <p className='text-4XL/Bold'>구독 및 결제</p>
            </div>
          </div>
        </header>

        <main>
          <div id='subscribe_frame' className='flex justify-center'>
            <div className='w-[1148px]'>
              <div className='flex justify-around gap-20'>
                <div className='w-1/2 space-y-5 text-2XL/Bold'>
                  <p>사용중인 플랜</p>
                  <div
                    id='subscribe_plan'
                    className='flex flex-col rounded-lg border-[1px] border-grey-300 px-10 py-[38px]'
                  >
                    <div>
                      <div className='flex items-center gap-2.5 text-XL/Bold'>
                        <div className='flex h-[25px] w-[25px] items-center justify-center rounded-full bg-grey-300'>
                          <p className='mt-[2px] text-M/Bold'>F</p>
                        </div>
                        <p>Free 플랜</p>
                      </div>

                      <p id='subscribe_date' className='mt-3 text-L/Medium text-grey-800'>
                        사용 기간 : <span>2023.08.23 ~ 2023.09.23</span>
                      </p>
                    </div>

                    <div
                      id='request_report_count'
                      className='text-L/Medium text-grey-800 '
                    >
                      <div className='mt-5'>
                        <p>
                          리포트 발행량 : <span>0/10</span>
                        </p>
                        <div className='mt-3 h-[9px] w-full bg-orange-100' />
                      </div>
                    </div>

                    <div
                      id='upgrade_area'
                      className='mt-[30px] flex items-center justify-between'
                    >
                      <p className='text-L/Regular text-grey-800'>
                        다음 결제일 : <span>-</span>
                      </p>
                      <button
                        className='button-filled-normal-large-primary-false-false-true w-[188px] bg-gradient-to-r from-orange-500 to-[#FF8C04]'
                        onClick={() => navigator(PATH.UPGRADE_PLAN)}
                      >
                        플랜 변경하기
                      </button>
                    </div>
                  </div>
                </div>

                <div className='w-1/2 space-y-5 text-2XL/Bold'>
                  <p>결제 수단</p>
                  <div id='registed_card'>
                    <div className='flex justify-center rounded-lg border-[1px] border-grey-300 bg-grey-50'>
                      <p className='py-[35px] text-L/Medium text-grey-500'>
                        등록된 카드가 없어요
                      </p>
                    </div>
                  </div>
                </div>
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
