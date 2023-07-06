import 'swiper/swiper.min.css';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { TAB_DATA, PARTENER_DATA, USER_TARGET_DATA, QUE_ANS_DATA } from '@/home/constant';
import { ReactSVG } from 'react-svg';
import { Swiper as SwiperClass } from 'swiper/types';
import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import { CTA_LOCATION, CTA_TYPE, PAGE_CATEGORY } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { openBrowser } from '@/utils/openBrowser';
import { onChangeTab } from '@/home/container';
import { FAQ } from '@/home/elements';

export default function HomePage() {
  const [activeTabIndex, changeActiveTab] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  //탭 이동 네비게이션-다음
  const onClickNextTab = () => {
    if (activeTabIndex !== TAB_DATA.length - 1) {
      const nextTab = activeTabIndex + 1;
      onChangeTab({ tabIndex: nextTab, changeActiveTab, swiper });
    }
  };
  //탭 이동 네비게이션-이전
  const onClickPrevTab = () => {
    if (activeTabIndex !== 0) {
      const prevTab = activeTabIndex - 1;
      onChangeTab({ tabIndex: prevTab, changeActiveTab, swiper });
    }
  };

  const IMG_PATH = '/assets/images';

  const repeatPartnerSlide = () => {
    let arr: JSX.Element[] = [];
    {
      //for (let i = 0; i < 2; i++) {
      PARTENER_DATA.map((partener, index) =>
        arr.push(
          <SwiperSlide
            key={index}
            className='shadow-partner-card !md:w-[286px] !h-auto !w-[424px]  rounded-[16.5097px] border border-grey-300 bg-white p-6 md:p-[18.54px]'
          >
            <div className='mb-6 md:mb-[18.54px]'>
              <div className='flex'>
                <div className='mr-2.5 h-[65px] w-[65px] md:mr-[7.73px] md:h-[43.25px] md:w-[43.25px]'>
                  <img
                    src={`${IMG_PATH}/Section6/${partener.imgName}`}
                    alt='{partener.name}'
                  />
                </div>
                <div>
                  <div className='mb-2 text-L/Medium  text-grey-900 md:mb-[3.09px]  md:text-S/Medium'>
                    {partener.name}
                  </div>
                  <div className='text-M/Regular text-grey-800  md:text-S/Regular'>
                    {partener.brand}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='mb-4 text-XL/Bold text-grey-900  md:mb-[12.36px] md:mb-[12.36px] md:text-S/Bold'>
                {partener.subject}
              </div>
              <div className='text-L/Medium text-grey-800 md:text-XS/Medium'>
                {partener.content}
              </div>
            </div>
          </SwiperSlide>,
        ),
      );
    }
    return arr;
  };

  return (
    <main>
      <section className='h-[560px] w-full bg-[#FAFAF9]'>
        <div className='container relative h-full'>
          <div className='relative z-10 flex h-full flex-col items-center justify-center text-center'>
            <h1 className='xs:text-2XL/Bold break-keep text-4XL/Bold sm:text-3XL/Bold'>
              <span className='gradientTitle'>데이터 기반의 판매전략 수립</span>을 위한
              <br />
              <span className='gradientTitle '>Shopee 종합 분석</span>솔루션
            </h1>
            <p className='mt-12 text-L/Medium text-grey-700'>
              동남아시아 No.1 마켓플레이스 Shopee의 상위노출 상품들을 분석하여
              <br />
              시장 정보와 최고의 판매 전략을 수립하세요!
            </p>
          </div>
          <div className='absolute left-0  top-0 h-full w-full'>
            <div className='relative left-0 top-0 h-full w-full'>
              <ReactSVG
                src='/assets/icons/Signal.svg'
                className='animation-ico absolute left-[194px] top-[43px] flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.08)]'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'w-8 h-8');
                }}
              />
              <div className='animation-ico absolute left-[38px] top-[180px]  h-3 w-3 rounded-full bg-orange-400'></div>
              <ReactSVG
                src='/assets/icons/Bulb.svg'
                className='animation-ico absolute left-[89px] bottom-[209px] flex h-12  w-12 items-center justify-center rounded-full bg-yellow-400 shadow-[0px_8px_16px_rgba(0,0,0,0.08)] sm:hidden'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'fill-white w-6 h-6');
                }}
              />
              <div className='animation-ico absolute left-[162px] bottom-[106px] h-3.5 w-3.5 rounded-full bg-grey-400'></div>
              <ReactSVG
                src='/assets/icons/Shopee.svg'
                className='animation-ico xs:hidden absolute right-[198px] top-[-10px] flex  h-16 w-16 items-center justify-center rounded-full bg-[#EA501F] shadow-[0px_8px_16px_rgba(0,0,0,0.08)]'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'fill-white w-8 h-9');
                }}
              />
              <div className='animation-ico xs:hidden absolute right-[12px] top-[200px] h-6 w-6 rounded-full bg-orange-200 sm:hidden'></div>
              <ReactSVG
                src='/assets/icons/File.svg'
                className='animation-ico absolute right-[3px] bottom-[31px] flex h-16  w-16 rotate-[-30deg] items-center justify-center rounded-full bg-grey-500 shadow-[0px_8px_16px_rgba(0,0,0,0.08)] sm:hidden'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'fill-white w-6 h-6');
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='xs:py-[60px] container py-[100px] md:mx-auto md:mx-auto lg:py-20'>
          <div className='xs:mb-[56px] mb-20 lg:mb-[70px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                알고 계신가요?
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>이커머스 플랫폼 매출의 86%는</p>
                <p className='mt-2'>
                  <span className='text-orange-400'>키워드 검색</span>을 통해서 발생한다는
                  사실!
                </p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center gap-x-6 lg:flex-wrap lg:gap-x-0 lg:gap-y-6'>
            <div className='inline-block sm:basis-[448px] lg:block lg:basis-[470px]'>
              <img src={`${IMG_PATH}/Section2/Search.png`} alt='' className='w-full' />
            </div>
            <div className='inline-block sm:basis-[448px] lg:block lg:basis-[470px]'>
              <img src={`${IMG_PATH}/Section2/Firstpage.png`} alt='' className='w-full' />
            </div>
            <div className='inline-block sm:basis-[448px] lg:block lg:basis-[470px]'>
              <img src={`${IMG_PATH}/Section2/Click.png`} alt='' className='w-full' />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-grey-50'>
        <div className='container pt-[100px] pb-[74px] md:mx-auto md:pb-20  lg:py-20 '>
          <div className='xs:mb-[56px] mb-20 lg:mb-[70px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                검색결과 상위 50개 상품들을 분석하여
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>
                  <span className='text-orange-400'>시장 정보</span>와{' '}
                  <span className='text-orange-400'>상위 노출 노하우</span>를 한 눈에!
                </p>
              </div>
            </div>
          </div>
          <div className='xs:max-w-full mx-auto mt-5 max-w-[960px] sm:max-w-[446px] md:max-w-full'>
            <div className='sm:hidden'>
              <img src={`${IMG_PATH}/Section3/Animation-Desktop.gif`} alt='' />
            </div>
            <div className='hidden sm:block'>
              <img src={`${IMG_PATH}/Section3/Animation-Mobile.gif`} alt='' />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='pt-[100px]  sm:pt-[60px]  md:mx-auto'>
          <div className='container'>
            <div className='mb-[70px] sm:mb-10 lg:mb-[72px]'>
              <div className='text-center'>
                <div className='text-2XL/Bold text-orange-500 md:text-XL/Bold'>
                  베스트 셀러가 되기 위한
                </div>
                <div className='mt-6 break-keep text-3XL/Bold text-grey-900 md:text-2XL/Bold '>
                  <p>10여가지 종합 인사이트!</p>
                </div>
              </div>
            </div>
          </div>

          <div className='container-tab mx-auto mb-[100px] max-w-[870px] overflow-x-auto pb-8 sm:mb-10 sm:block sm:pb-0 md:max-w-[720px]  lg:mb-[72px] lg:pb-0'>
            <ul className='swiper-pagination mx-auto grid  grid-cols-[repeat(5,_minmax(160px,_1fr))] grid-rows-1 gap-y-4 gap-x-2 sm:gap-y-2 md:grid-cols-[repeat(5,_minmax(140px,_1fr))] '>
              {TAB_DATA.map((tab, index) => (
                <li
                  key={index}
                  onClick={() =>
                    onChangeTab({ tabIndex: index, changeActiveTab, swiper })
                  }
                  className={`shrink-0 rounded-[30px] py-4 text-M/Bold md:py-3 md:text-S/Medium
                      ${
                        index === activeTabIndex
                          ? 'text-bold bg-grey-900 text-white'
                          : tab.launching
                          ? 'border border-grey-400 bg-white text-grey-800'
                          : 'bg-grey-200 text-grey-500'
                      }`}
                >
                  <div className=' flex items-center  justify-center'>
                    <i className='mr-1'>
                      <ReactSVG
                        src={`/assets/icons/${tab.icoName}.svg`}
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            'class',
                            `md:w-[14px] w-5 h-5 ${
                              index === activeTabIndex
                                ? 'fill-white'
                                : tab.launching
                                ? 'fill-grey-800'
                                : 'fill-grey-500'
                            }`,
                          );
                        }}
                      />
                    </i>
                    <span>{tab.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='container'>
            <div className='relative mx-auto max-w-[870px] pb-[98px] sm:pb-[115px] md:max-w-[720px]'>
              <Swiper
                className='banner sm:max-w-[382px]'
                slidesPerView={1}
                onSlideChange={(e) => changeActiveTab(e.activeIndex)}
                onSwiper={(swiper) => setSwiper(swiper)}
              >
                {TAB_DATA.map((tab, index) => (
                  <SwiperSlide key={index} className=''>
                    <div className=''>
                      <div className='mx-auto flex justify-between sm:flex-wrap sm:justify-center md:items-start '>
                        <div className='mr-6 sm:mb-8 sm:text-center'>
                          <div>
                            <div className='text-2XL/Bold text-orange-500 md:text-L/Bold lg:text-XL/Bold'>
                              Insight {tab.data.insightNum}
                            </div>
                            {tab.launching || (
                              <div className='mt-3 sm:mt-1'>
                                <div className='inline-block rounded-sm border-[2px] border-orange-300 p-1 text-XS/Regular text-orange-700'>
                                  출시 예정
                                </div>
                              </div>
                            )}
                            <div className='mt-4 text-4XL/Bold  text-grey-900 sm:mt-2 md:text-2XL/Bold lg:text-3XL/Bold'>
                              {tab.name}
                            </div>
                          </div>
                          <div className='mt-6 break-keep text-L/Medium text-grey-900 sm:mt-4 sm:w-full md:text-M/Medium'>
                            {tab.data.content}
                          </div>
                        </div>
                        <div className='flex basis-full justify-center'>
                          <div className='w-[424px] sm:w-[280px] md:w-[345px]'>
                            <img src={`${IMG_PATH}/Section5/${tab.data.img}`} alt='' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className='absolute top-1/2 z-10 hidden w-full translate-y-[-50%] justify-between sm:flex '>
                <ReactSVG
                  src={`/assets/icons/Tab.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'w-[38px] h-[38px]');
                  }}
                  onClick={onClickPrevTab}
                />
                <ReactSVG
                  src={`/assets/icons/Tab.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'w-[38px] h-[38px] rotate-180');
                  }}
                  onClick={onClickNextTab}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='overflow-hidden bg-grey-50'>
        <div className='container pt-[100px] pb-[122px] sm:pb-[60px] md:mx-auto md:pt-[77px] md:pb-[100px] lg:pb-[80px] '>
          <div className='mb-20 md:mb-[61.3px] '>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                고미인사이트가 함께합니다
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>서비스 오픈 1개월만에</p>
                <p className='mt-2'>
                  무려 <span className='text-orange-400'>248개사</span>가 이용했어요.
                </p>
              </div>
            </div>
          </div>

          <div className='sm:hidden'>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              centeredSlides={true}
              slidesPerView={'auto'}
              loopedSlides={PARTENER_DATA.length}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              effect='slide'
              grabCursor={true}
              speed={5000}
              //freeMode={{ enabled: true }}
              a11y={{ enabled: false }}
              className='banner !overflow-visible'
              //navigation
              //pagination={{ clickable: true }}
              //modules={[Autoplay, Pagination, Navigation]}
            >
              {repeatPartnerSlide()}
            </Swiper>
          </div>
          <div className='hidden sm:block'>
            <ul>
              {PARTENER_DATA.map((partener, index) => (
                <li
                  key={index}
                  className='shadow-partner-card mb-6 rounded-[16.5097px] border border-grey-300 bg-white p-6 md:p-[18.54px]'
                >
                  <div className='mb-6 md:mb-[18.54px]'>
                    <div className='flex'>
                      <div className='mr-2.5 h-[65px] w-[65px] md:mr-[7.73px] md:h-[43.25px] md:w-[43.25px]'>
                        <img
                          src={`${IMG_PATH}/Section6/${partener.imgName}`}
                          alt='{partener.name}'
                        />
                      </div>
                      <div>
                        <div className='mb-2 text-L/Medium  text-grey-900 md:mb-[3.09px]  md:text-S/Medium'>
                          {partener.name}
                        </div>
                        <div className='text-M/Regular text-grey-800  md:text-S/Regular'>
                          {partener.brand}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-4 text-XL/Bold text-grey-900  md:mb-[12.36px] md:mb-[12.36px] md:text-S/Bold'>
                      {partener.subject}
                    </div>
                    <div className='text-L/Medium text-grey-800 md:text-XS/Medium'>
                      {partener.content}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className='bg-[#FFFBF8]'>
        <div className='container py-[80px]'>
          <div className='mb-20 md:mb-[61.3px] '>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                고미인사이트와 함께
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>잘 팔릴 상품인지 미리 확인하고</p>
                <p className='mt-2'>
                  <span className='text-orange-400'>상위노출을 통해 </span>매출 선순환
                  구조를 만드세요!
                </p>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <img
              src={`${IMG_PATH}/Section7/Section7.png`}
              alt=''
              className='w-full max-w-[754px] md:max-w-[540px]'
            />
          </div>
        </div>
      </section>
      <section>
        <div className='container pt-[100px] pb-[126px] sm:py-[60px] md:mx-auto  md:pb-[40px] lg:pb-[100px]'>
          <div className='mb-20 sm:mb-[56px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-orange-500 md:text-XL/Bold'>
                누가, 어떻게 활용할 수 있을 까요?
              </div>
              <div className='mt-6 break-keep text-3XL/Bold text-grey-900 md:text-2XL/Bold '>
                <p>쇼피에 상품을 판매하는 누구나!</p>
              </div>
            </div>
          </div>
          <div>
            <ul className='flex md:flex-wrap '>
              {USER_TARGET_DATA.map((userTarget, index) => (
                <li
                  key={index}
                  className='w-[calc(100%/4)] p-2.5 sm:mb-5 sm:w-full sm:last:mb-0 md:mb-[50px] md:w-[calc(100%/2)]'
                >
                  <div className='mb-6 lg:mb-4 '>
                    <img
                      src={`${IMG_PATH}/Section8/${userTarget.imgName}`}
                      alt=''
                      className='w-full '
                    />
                  </div>
                  <div className='mb-4 text-2XL/Bold text-grey-900 lg:text-XL/Bold'>
                    {userTarget.name}
                  </div>
                  <div className='text-L/Medium text-grey-700 lg:text-M/Medium'>
                    {userTarget.content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className='bg-main xs:bg-[40%] bg-cover bg-center py-[130px] sm:bg-[20%] sm:py-[70px]  lg:py-[105px]'>
        <div className='container'>
          <div className='mx-auto max-w-[1096px]'>
            <div className='flex items-center justify-between sm:flex-wrap'>
              <div className='break-keep text-4XL/Bold text-white sm:w-full lg:text-3XL/Bold'>
                잘 팔릴 상품을 <br />잘 파는 방법
              </div>
              <div className='text-right sm:mt-12  sm:w-full'>
                <button
                  className='w-full max-w-[312px] rounded bg-white py-4 px-4 text-L/Bold text-grey-800 sm:max-w-[306px] md:max-w-[286px] lg:max-w-[306px]'
                  onClick={(event) => {
                    openBrowser(GlobalEnv.serviceUrl);

                    const eventTarget = event.target as HTMLElement;
                    _introPageMovedToSolution(
                      PAGE_CATEGORY.MAIN,
                      CTA_TYPE.BUTTON,
                      CTA_LOCATION.MIDDLE_OF_CONTENT,
                      eventTarget.innerText,
                    );
                  }}
                >
                  고미인사이트 바로 시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container py-[120px] md:mx-auto md:mx-auto lg:py-[60px]'>
          <div className='mx-auto max-w-[1096px]'>
            <div className='flex items-center justify-between rounded-[49px] bg-grey-200 pl-[52px] sm:flex-wrap sm:justify-items-start sm:pb-0 md:py-10 md:pl-[33px] lg:py-[42px] '>
              <div className='break-keep'>
                <div className='mb-[13px] inline-block rounded-[33px] bg-grey-900 px-5 py-[7px]'>
                  <span className='text-S/Medium text-white'>Event 2023.03~ 종료시</span>
                </div>
                <div className='mb-[20px] text-3XL/Bold'>무제한 사용 이벤트</div>
                <div className='text-grey-700'>
                  고미인사이트는 현재 무료 서비스 이벤트를 진행중이에요.
                  <br />
                  별도의 이벤트 종료 안내까지는 무제한 리포트 조회가 가능해요!
                </div>
              </div>

              <div className='xs:mt-[33px] sm:mt-[55px]'>
                <img src={`${IMG_PATH}/Section10/Ticket.png`} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}
