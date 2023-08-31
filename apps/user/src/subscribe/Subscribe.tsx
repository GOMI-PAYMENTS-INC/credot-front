import { Default as Layout } from '@/common/layouts';
import { ReactSVG } from 'react-svg';

const Subscribe = () => {
  return (
    <Layout>
      <section className='mt-[72px]'>
        <header className='relative bg-grey-50'>
          <div className='absolute left-0 top-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />
          <div className='absolute right-0 bottom-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />

          <div className='flex w-full justify-center'>
            <div className='flex w-[1148px] flex-col gap-10 py-[60px]'>
              <p className='text-4XL/Bold'>구독 및 결제</p>
              <div className='w-[141px] rounded-[58px] bg-orange-300 px-[27px] py-2.5'>
                <p className='text-M/Bold text-white'>키워드 리포트</p>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div id='subscribe_frame' className='flex justify-center'>
            <div className='w-[1148px]'>
              <div className='flex justify-around gap-20'>
                <div className='w-1/2 text-2XL/Bold'>
                  <p>사용중인 플랜</p>

                  <div className='mt-5 flex flex-col rounded-lg border-[1px] border-grey-300 px-10 py-[38px]'>
                    <div id='subscribe_plan'>
                      <div className='flex items-center gap-2.5 text-XL/Bold'>
                        <p className='flex'>
                          <ReactSVG
                            src='/assets/icons/outlined/BarChart.svg'
                            beforeInjection={(svg) =>
                              svg.setAttribute('class', 'fill-orange-400 x-[28px]')
                            }
                          />
                          키워드 리포트
                        </p>
                        <div className='h-5 w-[3px] bg-grey-500' />
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
                      <button className='button-filled-normal-large-primary-false-false-true w-[188px] bg-gradient-to-b from-orange-500 to-orange-300'>
                        업그레이드 하기
                      </button>
                    </div>
                  </div>
                </div>

                <div className='flex w-1/2 text-2XL/Bold'>
                  <p>결제 수단</p>
                </div>
              </div>

              <div>
                <p></p>
              </div>
            </div>
          </div>
        </main>
        <footer></footer>
      </section>
    </Layout>
  );
};
export default Subscribe;
