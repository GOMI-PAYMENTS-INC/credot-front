import 'swiper/swiper.min.css';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import { SERVICE_URL } from '@/router/paths';
import { ReactSVG } from 'react-svg';
import { Swiper as SwiperClass } from 'swiper/types';

export default function HomePage() {
  const [activeTabIndex, changeActiveTab] = useState<number>(0);
  const [activeFaqIndex, changeFaqTab] = useState<number[]>([]);
  const onChangeTab = (tabIndex: number) => {
    changeActiveTab(tabIndex);
    //하단 내용 변경
    slideTo(tabIndex);
  };

  const onClickFaq = (faqIndex: number) => {
    if (activeFaqIndex.find((one) => one === faqIndex)) {
      //체크 해제할때 checkedItems에 있을 경우
      const activeFaqFilter = activeFaqIndex.filter((one) => one !== faqIndex);
      changeFaqTab([...activeFaqFilter]);
    } else {
      changeFaqTab([...activeFaqIndex, faqIndex]);
    }
  };

  //탭 이동 네비게이션-다음
  const onClickNextTab = () => {
    if (activeTabIndex !== tabData.length - 1) {
      const nextTab = activeTabIndex + 1;
      onChangeTab(nextTab);
    }
  };
  //탭 이동 네비게이션-이전
  const onClickPrevTab = () => {
    if (activeTabIndex !== 0) {
      const prevTab = activeTabIndex - 1;
      onChangeTab(prevTab);
    }
  };

  const [swiper, setSwiper] = useState<SwiperClass>();
  const slideTo = (index: number) => swiper?.slideTo(index);

  const IMG_PATH = '/assets/images';
  const tabData = [
    {
      name: '시장 분석',
      icoName: 'Shopping',
      launching: true,
      data: {
        insightNum: '1',
        content:
          '월별 검색량 트랜드와 함께, 상위 노출 상품들의 판매량과 매출을 파악하여 해당 키워드에 대한 시장 규모를 추산해볼 수 있어요.',
        img: '1-New.png',
      },
    },
    {
      name: '키워드 분석',
      icoName: 'KeywordSearch',
      launching: true,
      data: {
        insightNum: '2',
        content:
          '키워드의 검색량, 등록 상품 수, CPC 금액, \n' +
          '평균 판매가를 종합적으로 분석하여, 저렴한 가격으로 매출을 많이 낼 수 있는 키워드인지 여부를 \n' +
          '판단할 수 있어요',
        img: '2-New.png',
      },
    },
    {
      name: '추천 키워드',
      icoName: 'Like',
      launching: true,
      data: {
        insightNum: '3',
        content:
          '키워드 검색 이후 많이 검색된 연관 키워드들의 정보를 파악하여. 노출이 쉽고 광고비가 저렴한 키워드 공략이 가능해요.',
        img: '3-New.png',
      },
    },
    {
      name: '판매가 분석',
      icoName: 'DollarCircle',
      launching: true,
      data: {
        insightNum: '4',
        content:
          '상위 노출 상품들의 판매가격을 분석하여, 적절한 판매가격 산정할 수 있어요.',
        img: '4-New.png',
      },
    },
    {
      name: '브랜드 분석',
      icoName: 'Brand',
      launching: false,
      data: {
        insightNum: '5',
        content:
          '검색 결과 내 브랜드들을 매출 순위별로 파악하여 트랜드 및 시장 수요를 예측할 수 있으며, \n' +
          '각 브랜드별 주력 상품에 대한 정보도 제공해요.',
        img: '5-New.png',
      },
    },
    {
      name: '카테고리 분석',
      icoName: 'Appstore',
      launching: false,
      data: {
        insightNum: '6',
        content: '상위 노출에 유리한 카테고리 등록이 무엇인지 \n' + '알 수 있어요.',
        img: '6-New.png',
      },
    },
    {
      name: '상품명 분석',
      icoName: 'Edit',
      launching: false,
      data: {
        insightNum: '7',
        content:
          '상위 노출 상품들의 상품명 내 공통 키워드를 추출할 수 있고, 적절한 상품명 길이도 알 수 있어요.',
        img: '7-New.png',
      },
    },
    {
      name: '썸네일 분석',
      icoName: 'FileImage',
      launching: false,
      data: {
        insightNum: '8',
        content:
          '상위 노출 상품들의 이미지 썸네일 수, 영상 썸네일 등록률, 영상 썸네일의 평균 길이를 파악해 적절한 썸네일 콘텐츠 전략을 수립할 수 있어요.',
        img: '8-New.png',
      },
    },
    {
      name: '평점/리뷰 분석',
      icoName: 'Star',
      launching: false,
      data: {
        insightNum: '9',
        content:
          '상위 노출 상품들의 평균 평점과 평점이 높은 상품들을 한 눈에 모아 볼 수 있어, 평점 관리를 위한 레퍼런스로 삼을 수 있어요.',
        img: '9-New.png',
      },
    },
    {
      name: 'CS/셀러 분석',
      icoName: 'Smile',
      launching: false,
      data: {
        insightNum: '10',
        content:
          '상위 노출 상품들을 판매하는 셀러들의 판매 경력, 문의 응답 시간 등 디테일한 정보를 제공해요. 베스트 셀러가 되기 위한 운영 조건을 알 수 있어요.',
        img: '10-New.png',
      },
    },
  ];

  const partnerData = [
    {
      imgName: 'hansell.png',
      name: '김채아 · 마케터',
      brand: '한셀뷰티',
      subject: '마케터의 시간절약에 꼭 필요해요',
      content:
        '특정 상품군에 대한 시장규모와 가격에 대한 정보를 미리 알 수 있어서, 상품 소싱 과정에서 많은 시간을 절약할 수 있었어요.',
    },
    {
      imgName: 'ProfileImg.png',
      name: '이준 · 리셀러',
      brand: '월드리뷰트',
      subject: '전략적인 판매를 할 수 있도록 도와줍니다.',
      content:
        '판매 가능성이 높은 상품을 미리 알고 소싱할 수 있기 때문에 소싱에 대한 기회비용을 줄이고 매출에 대한 가능성은 높일 수 있었습니다.',
    },
    {
      imgName: 'carPlus.png',
      name: '오채윤 대표 · CEO',
      brand: '차량용품 플러스',
      subject: '클릭수를 230%까지 상승시킬 수 있었어요',
      content:
        '키워드 선별을 번역기에만 의존했었는데, 플랫폼 내 검색량이 많은 키워드를 경쟁도와 함께 직접 알려주니 클릭수를 230%까지 상승시킬 수 있었어요.',
    },
    {
      imgName: 'wt.png',
      name: '최덕진 · MD',
      brand: 'WT코퍼레이션',
      subject: '전략적인 판매를 할 수 있도록 도와줍니다.',
      content:
        '지금까지는 상품 수로 매출 승부를 걸었다면, 이제는 고미인사이트를 통해 전략적인 상품 소싱이 가능하기 때문에 상품당 매출을 130%까지 상승시켰습니다.',
    },
    {
      imgName: 'lab.png',
      name: '김재성 · 마케터',
      brand: 'Inventree Lab.',
      subject: '데이터를 기반으로 현지화 전략을 수립했어요.',
      content:
        '상위노출 상품을 판매하고 있는 셀러들의 가격, 이미지, CS운영 등 다양하고 자세한 데이터를 기반으로 현지 시장에 맞는 판매 전략을 수립할 수 있었어요. ',
    },
    {
      imgName: 'ProfileImg-1.png',
      name: 'william · 리셀러',
      brand: 'Betelgeuse',
      subject: '효율적인 재고관리가 가능해요',
      content:
        '월별 키워드의 검색 수요에 대한 트랜드 정보를 통해 사입할 상품들의 재고를 언제 얼마나 준비해야 하는지 미리 알 수 있어서 재고부담을 줄일 수 있어요.',
    },
  ];

  const userTargetData = [
    {
      imgName: 'Reseller.png',
      name: '리셀러',
      content:
        '소싱할 상품에 대한 수요와 적정 판매가를 미리 파악하고 진입이 유리한 키워드 및 콘텐츠 전략을 수립할 수 있어요.',
    },
    {
      imgName: 'Brand.png',
      name: '브랜드사',
      content:
        '시장규모와 인기 브랜드 정보를 파악하여, 자사 상품의 성공 가능성을 미리 검토하고 가격 및 포지셔닝 전략을 수립할 수 있어요.',
    },
    {
      imgName: 'Marketer.png',
      name: '마케터',
      content:
        '키워드의 검색량, 경쟁도, CPC 금액을 종합 분석한 리포트를 통해 효율 높은 키워드 전략을 수립할 수 있어요',
    },
    {
      imgName: 'MD.png',
      name: 'MD',
      content:
        '데이터를 기반으로 해외에 수출할  상품의 사업성을 종합적으로 미리 파악할 수 있어요.',
    },
  ];

  const qnaData = [
    {
      subject: '고미 인사이트는 어떤 서비스인가요?',
      content:
        "고미 인사이트는 동남아 대표 이커머스 플랫폼의 ‘쇼피'의 종합 분석 솔루션이에요. 키워드에 대한 시장분석 및 상위 노출 인사이트를 제공하며, 추후 내 상품의 품질 측정과 경쟁사 모니터링 등 다양한 솔루션들이 추가될 예정이에요.",
    },
    {
      subject: '어떤 장점이 있고 언제 도움을 받을 수 있나요?',
      content:
        '데이터를 기반으로 쇼피 진입을 위한 유리한 키워드, 적절한 판매가, 경쟁사 분석에 대한 결과를 알려드려요. 신규 상품을 업로드하거나 이미 판매중인 상품의 품질 개선을 위해 사용할 수 있어요.',
    },
    {
      subject: '서비스 이용료가 궁금해요!',
      content:
        '현재 고미 인사이트는 무제한 사용이 가능한 이벤트를 진행중이에요! 별도의 이벤트 종료 안내까지는 무료로 무제한 사용하실 수 있어요.',
    },
    {
      subject: '지원하는 국가와 플랫폼이 어떤게 있을까요?',
      content:
        '현재는 Shopee 베트남에 대한 인사이트를 제공해요. 이후 Shopee의 모든 국가를 지원할 예정이며, 라자다, 아마존과 같은 마켓 플레이스의 인사이트도 점진적으로 추가될 예정이에요. 회원가입 시 업데이트 소식을 빠르게 받아보실 수 있어요!',
    },
    {
      subject: '고미 인사이트는 어떤 서비스인가요?',
      content:
        '그 외 추가적인 문의가 있으신 경우 웹페이지 우측 하단의 채널톡으로 문의주시면 최대한 빠른 답변드릴께요.',
    },
  ];
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
              시장 정보와 최고의 판매 전략을 제공해요!
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
            <ul className='swiper-pagination mx-auto grid grid-cols-[repeat(5,_minmax(119px,_1fr))] grid-rows-1 gap-y-4 gap-x-2 sm:gap-y-2 '>
              {tabData.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => onChangeTab(index)}
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
                {tabData.map((tab, index) => (
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
                고미 인사이트가 함께합니다
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
              className='banner !overflow-visible'
              spaceBetween={24}
              width={286}
              breakpoints={{
                720: {
                  width: 424,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              speed={30000}
              loop={true}
              freeMode={{ enabled: true }}
              a11y={{ enabled: true }}
              grabCursor={true}
              navigation
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {partnerData.map((partener, index) => (
                <SwiperSlide
                  key={index}
                  className='shadow-partner-card !h-auto rounded-[16.5097px] border border-grey-300 bg-white p-6 md:p-[18.54px]'
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='hidden sm:block'>
            <ul>
              {partnerData.map((partener, index) => (
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
                고미 인사이트와 함께
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
              {userTargetData.map((userTarget, index) => (
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
                    onClick={() => window.open(`${SERVICE_URL}`, '_blank')}
                  >
                    고미 인사이트 바로 시작하기
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
                  고미 인사이트는 현재 무료 서비스 이벤트를 진행중이에요.
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

      <section className='bg-grey-50 py-[120px] lg:py-[80px]'>
        <div className='container'>
          <div className='mx-auto max-w-[1096px]'>
            <div>
              <div className='text-center'>
                <div className='mb-6 text-2XL/Bold text-orange-500 lg:mb-8'>
                  자주 묻는 질문을 모았어요.
                </div>
                <div className='break-keep text-3XL/Bold text-grey-900'>
                  <p>FAQ</p>
                </div>
              </div>
            </div>
            <div className='mt-12'>
              <div className='rounded-[20.107px] bg-white px-12 py-14  lg:py-6 lg:px-6'>
                {qnaData.map((qna, index) => {
                  const indexNum = index + 1;

                  let isOpened = false;
                  isOpened = activeFaqIndex.includes(indexNum);

                  return (
                    <dl
                      key={indexNum}
                      className='border border-t-0 border-l-0 border-r-0 border-b-grey-300 py-8 first:pt-0 last:border-b-0 last:pb-0 lg:py-6'
                      onClick={() => onClickFaq(indexNum)}
                    >
                      <dt className='relative'>
                        <p className='pr-12 text-2XL/Bold text-grey-900 lg:text-XL/Bold'>
                          {qna.subject}
                        </p>
                        <ReactSVG
                          src='/assets/icons/Up.svg'
                          className={`absolute top-1 right-0 text-L/Medium text-grey-700 lg:text-L/Medium 
                      ${isOpened ? 'rotate-0' : 'rotate-180'}`}
                          beforeInjection={(svg) => {
                            svg.setAttribute('class', 'w-6 h-6 fill-grey-900');
                          }}
                        />
                      </dt>
                      <dd
                        className={`mt-4 text-L/Medium text-grey-700 lg:text-M/Medium  ${
                          isOpened ? 'block' : 'hidden'
                        }`}
                      >
                        {qna.content}
                      </dd>
                    </dl>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
