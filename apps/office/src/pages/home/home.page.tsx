import 'swiper/swiper.min.css';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import SvgIcon from '@/util/SvgIcon';

export default function HomePage() {
  const [activeTabIndex, changeActiveTab] = useState<number>(0);
  const [activeFaqIndex, changeFaqTab] = useState<number>(0);
  const onClickTab = (tabIndex: number) => changeActiveTab(tabIndex);
  const onClickFaq = (faqIndex: number) => {
    // 같은걸 토글 하는 경우
    if (activeFaqIndex === faqIndex) {
      changeFaqTab(0);
    } else {
      changeFaqTab(faqIndex);
    }
  };
  const IMG_PATH = '../../../assets/images';
  const tabData = [
    {
      name: '시장 규모',
      icoName: (
        <SvgIcon
          iconName='Shopping'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '1',
        content:
          '상위 노출 상품들의 판매량과 매출을 파악하여 해당 키워드의 시장 규모를 추산해볼 수 있어요.',
        img: '1.png',
      },
    },
    {
      name: '브랜드 정보',
      icoName: (
        <SvgIcon
          iconName='Trophy'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '2',
        content:
          '검색 결과 내 브랜드들을 매출 순위별로 파악하여 트랜드 및 시장 수요를 예측할 수 있으며, 각 브랜드별 주력 상품에 대한 정보도 제공해요.',
        img: '2.png',
      },
    },
    {
      name: '키워드 품질',
      icoName: (
        <SvgIcon
          iconName='Like'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '3',
        content:
          '키워드의 검색량, 등록 상품 수, CPC 금액, 평균 판매가를 종합적으로 분석하여, 저렴한 가격으로 매출을 많이 낼 수 있는 키워드인지 여부를 판단할 수 있어요',
        img: '3.png',
      },
    },
    {
      name: '연관 키워드',
      icoName: (
        <SvgIcon
          iconName='Link'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '4',
        content:
          '키워드 검색 이후 많이 검색된 연관 키워드들의 정보를 파악하여. 노출이 쉽고 광고비가 저렴한 키워드 공략이 가능해요.',
        img: '4.png',
      },
    },
    {
      name: '판매 가격',
      icoName: (
        <SvgIcon
          iconName='DollarCircle'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '5',
        content:
          '상위 노출 상품들의 판매가격을 분석하여, 적절한 판매가격 산정할 수 있어요.',
        img: '5.png',
      },
    },
    {
      name: '카테고리 분석',
      icoName: (
        <SvgIcon
          iconName='Appstore'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '6',
        content: '상위 노출에 유리한 카테고리 등록이 무엇인지 알 수 있어요.',
        img: '6.png',
      },
    },
    {
      name: '상품명 분석',
      icoName: (
        <SvgIcon
          iconName='Edit'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '7',
        content:
          '상위 노출 상품들의 상품명 내 공통 키워드를 추출할 수 있고, 적절한 상품명 길이도 알 수 있어요.',
        img: '7.png',
      },
    },
    {
      name: '썸네일 분석',
      icoName: (
        <SvgIcon
          iconName='FileImage'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '8',
        content:
          '상위 노출 상품들의 이미지 썸네일 수, 영상 썸네일 등록률, 영상 썸네일의 평균 길이를 파악해 적절한 썸네일 콘텐츠 전략을 수립할 수 있어요.',
        img: '8.png',
      },
    },
    {
      name: '평점/리뷰 분석',
      icoName: (
        <SvgIcon
          iconName='Star'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '9',
        content:
          '상위 노출 상품들의 평균 평점과 평점이 높은 상품들을 한 눈에 모아 볼 수 있어, 평점 관리를 위한 레퍼런스로 삼을 수 있어요.',
        img: '9.png',
      },
    },
    {
      name: 'CS/셀러 분석',
      icoName: (
        <SvgIcon
          iconName='Smile'
          svgProp={{
            width: 20,
            height: 20,
            className: 'fill-grey-500 md:w-[14px]',
          }}
        />
      ),
      data: {
        insightNum: '10',
        content:
          '상위 노출 상품들을 판매하는 셀러들의 판매 경력, 문의 응답 시간 등 디테일한 정보를 제공해요. 베스트 셀러가 되기 위한 운영 조건을 알 수 있어요.',
        img: '10.png',
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
        '특정 상품군에 대한 시장규모와 가격에 대한 정보를\n' +
        '미리 알 수 있어서, 상품 소싱 과정에서 많은 시간을\n' +
        '절약할 수 있었어요.',
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
        '지금까지는 상품 수로 매출 승부를 걸었다면, 이제는 고미 키워드를 통해 전략적인 상품 소싱이 가능하기 때문에 상품당 매출을 130%까지 상승시켰습니다.',
    },
    {
      imgName: 'lab.png',
      name: '김재성 · 마케터',
      brand: 'Inventree Lab.',
      subject: '데이터를 기반으로 현지화 전략을 수립했어요.',
      content:
        '상위노출 상품을 판매하고 있는 셀러들의 가격, 이미지, CS운영 등 다양하고 자세한 데이터를 기반으로 현지 시장에 맞는 판매 전략을 수립할 수 있었어요. ',
    },
  ];

  const userTargetData = [
    {
      imgName: 'Reseller.png',
      name: '리셀러',
      content:
        '수요는 많지만 경쟁도가 낮은 키워드를 공략하여,최고의 상품 리스팅 전략을 수립할 수 있어요.',
    },
    {
      imgName: 'Brand.png',
      name: '브랜드사',
      content:
        '쇼피에서 수요가 많은 경쟁 브랜드와 판매자를 미리 분석하여 적절한 가격과 포지셔닝 정책을 수립할 수 있어요,',
    },
    {
      imgName: 'Marketer.png',
      name: '마케터',
      content:
        '키워드의 검색량, 경쟁도, CPC 금액을 종합 분석한 리포트를 통해 효율이 가장 높은 키워드 전략을 수립할 수 있어요',
    },
    {
      imgName: 'MD.png',
      name: 'MD',
      content:
        '데이터를 기반으로 해외에 수출할 상품의 사업성을 종합적으로 미리 파악할 수 있어요.',
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
        "현재는 ‘쇼피'의 모든 국가별 데이터를 제공해요. 이후 사용자의 니즈에 따라 라자다, 아마존과 같은 플랫폼의 인사이트도 점진적으로 추가될 예정이에요.",
    },
    {
      subject: '고미 인사이트는 어떤 서비스인가요?',
      content:
        '그 외 추가적인 문의가 있으신 경우 웹페이지 우측 하단의 채널톡으로 문의주시면 최대한 빠른 답변드릴께요.',
    },
  ];
  return (
    <main className='overflow-hidden'>
      <section className=' bg-[#FAFAF9]'>
        <div className='container-padding relative'>
          <div className=' absolute left-0 top-0 block lg:hidden'>
            <img src={`${IMG_PATH}/Section1/Background.png`} alt='' />
          </div>
          <div className='grid-12 relative items-center  justify-items-center  pb-11 lg:pb-6'>
            <div className=' xs:col-span-full col-span-5  col-start-2 px-8 py-[22px] px-5 pb-5 pt-[54px] sm:col-span-8 sm:col-start-3 sm:px-0 md:col-span-6 md:col-start-4 md:px-0 md:py-[42px] lg:pt-[22px]'>
              <div className='mb-6'>
                <h1 className='break-keep text-3XL/Bold lg:text-2XL/Bold'>
                  <span className='text-primary-red-orange'>Shopee</span>에서{' '}
                  <span className='text-primary-red-orange'>상위 노출</span>을 원하는{' '}
                  <span className='text-primary-red-orange'>키워드</span>를 입력해주세요.
                </h1>
              </div>
              <div className='mb-16 lg:mb-6'>
                <div className='mb-2'>
                  <select
                    name='country'
                    id='country'
                    className='bg-transparent py-3 text-S/Medium'
                  >
                    <option value='Vietnam' defaultValue='Vietnam'>
                      Vietnam
                    </option>
                    <option value='Vietnam1'>Vietna1</option>
                    <option value='Vietnam2'>Vietnam2</option>
                  </select>
                </div>
                <div className='form-control'>
                  <div className='input-group'>
                    <div className=' w-full !rounded-l-[10px] bg-gradient-to-r from-orange-500 to-[#FF7500] p-0.5'>
                      <input
                        type='text'
                        placeholder='키워드를 입력해주세요.'
                        className='input-bordered input h-full  w-full w-full rounded-r-none border-0 bg-white lg:text-S/Medium'
                      />
                    </div>
                    <button className='btn-square btn border-none bg-gradient-to-r from-orange-500 to-[#FF7500]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className='mb-6 rounded-2xl border border-grey-300 bg-white px-6 py-5 '>
                <div className='mb-5 lg:mb-4'>
                  <h3 className='text-L/Medium lg:text-S/Regular'>
                    월간 검색량
                    <SvgIcon iconName='Help' wrapperStyle='inline-block ml-[7px]' />
                  </h3>
                </div>
                <div>
                  <span className='text-4XL/Bold text-grey-300 lg:text-3XL/medium'>
                    ???
                  </span>
                </div>
              </div>
              <div className='mb-6  rounded-2xl border border-grey-300 bg-white px-6 py-5 lg:mb-4'>
                <div className='mb-5 lg:mb-4'>
                  <h3 className='text-L/Medium lg:text-M/Regular'>
                    이런 키워드들은 어때요?
                    <SvgIcon iconName='Help' wrapperStyle='inline-block ml-[7px]' />
                  </h3>
                </div>
                <div>
                  <ul className='overflow-y-hidden'>
                    <li className='float-left mb-3 h-[38px] w-[36%] rounded-[50px] border border-grey-300 bg-grey-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                    <li className='float-left mb-3 h-[38px] w-[60%] rounded-[50px] border border-grey-300  bg-grey-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                    <li className='float-left mb-3 h-[38px] w-[48%] rounded-[50px] border border-grey-300  bg-grey-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                    <li className='float-left mb-3 h-[38px] w-[48%] rounded-[50px] border border-grey-300 bg-grey-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                    <li className='float-left mb-3 h-[38px] w-[28%] rounded-[50px] border border-grey-300  bg-grey-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                    <li className='float-left mb-3 h-[38px] w-[68%] rounded-[50px] border border-grey-300 bg-grey-100 odd:mr-[4%] lg:mb-2 lg:h-6' />
                  </ul>
                </div>
              </div>

              <div>
                <button className='w-full rounded-md bg-primary-red-orange py-4'>
                  <span className='text-L/Bold text-white'>리포트 생성하기</span>
                </button>
              </div>
            </div>
            <div
              className='col-span-5
   block   md:hidden'
            >
              <img
                src={`${IMG_PATH}/Section1/Img-Skeleton.png`}
                alt=''
                className='w-full max-w-[400px]'
              />
            </div>
          </div>
          <div className=' block flex justify-center  pb-8 lg:hidden '>
            <SvgIcon
              iconName='DoubleRight'
              svgProp={{
                width: 24,
                height: 24,
                className: 'fill-grey-900',
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <div className='container-padding xs:py-[60px] py-[100px] md:mx-auto  md:mx-auto lg:py-20'>
          <div className='grid-12 xs:mb-[56px] mb-20 lg:mb-[70px]'>
            <div className='col-span-8 col-start-3 text-center lg:col-span-full lg:col-start-1'>
              <div className='mb-5 text-2XL/Bold text-grey-800  md:text-XL/Bold lg:mb-6'>
                알고 계신가요?
              </div>
              <div className='break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p className='mb-2'>이커머스 플랫폼 매출의 86%는</p>
                <p>
                  <span className='text-primary-red-orange'>키워드 검색</span>을 통해서
                  발생한다는 사실!
                </p>
              </div>
            </div>
          </div>
          <div className='grid-12 gap-6'>
            <div className='xs:col-span-full col-span-4 sm:col-span-10 sm:col-start-2 md:col-span-8  md:col-start-3 lg:col-span-6  lg:col-start-4'>
              <img src={`${IMG_PATH}/Section2/image-1.svg`} alt='' className='w-full' />
            </div>
            <div className='xs:col-span-full  col-span-4 sm:col-span-10  sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4'>
              <img src={`${IMG_PATH}/Section2/image-2.svg`} alt='' className='w-full' />
            </div>
            <div className='xs:col-span-full  col-span-4 sm:col-span-10  sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4'>
              <img src={`${IMG_PATH}/Section2/image-3.svg`} alt='' className='w-full' />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-grey-50'>
        <div className='container-padding pt-[100px]  pb-[74px] md:mx-auto md:pb-20  lg:py-20 '>
          <div className='grid-12 mb-14 sm:mb-10 lg:mb-[72px] '>
            <div className='xs:col-span-full col-span-8 col-start-3 text-center lg:col-span-full  lg:col-start-1'>
              <div className='break-keep text-4XL/Bold md:text-2XL/Bold lg:text-3XL/Bold'>
                <p className='mb-4'>데이터를 기반으로</p>
                <p>
                  <span className='text-primary-red-orange'>상위 노출 노하우</span>를 한
                  눈에!
                </p>
              </div>
            </div>
          </div>
          <div className='grid-12'>
            <div className='col-span-10 col-start-2 sm:hidden lg:col-span-full'>
              <img src={`${IMG_PATH}/Section3/Section3-morion-Large.gif`} alt='' />
            </div>
            <div className='xs:col-span-full col-span-10 col-start-2 hidden sm:block'>
              <img src={`${IMG_PATH}/Section3/Section3-morion-Small.gif`} alt='' />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container-padding pt-[100px]  sm:pt-[60px]  md:mx-auto'>
          <div className='grid-12 mb-[70px] sm:mb-10 lg:mb-[72px]'>
            <div className='col-span-8 col-start-3 text-center lg:col-span-full lg:col-start-1 '>
              <div className='mb-6 text-2XL/Bold text-orange-500  md:text-XL/Bold'>
                상위 노출을 위한 모든 것
              </div>
              <div className='break-keep text-3XL/Bold text-grey-900 md:text-2XL/Bold '>
                <div className=' sm:hidden'>
                  <p className='mb-2'>상위 100개 상품에 대한 15가지의 인사이트와</p>
                  <p>개별 상품 분석까지!</p>
                </div>
                <div className=' hidden sm:block'>
                  <p className='mb-2'>
                    상위 100개 상품에 대한 15가지의 인사이트와 개별 상품 분석까지!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-tab'>
          <div className='grid-12 mb-[100px] pb-8 sm:mb-10 sm:block  sm:pb-0 lg:mb-[72px] lg:pb-0 '>
            <div className='col-span-8 col-start-3 md:col-span-full md:col-start-1 lg:col-span-10 lg:col-start-2'>
              <ul className='grid-rows-tab grid grid-cols-5 grid-rows-1  gap-y-6 gap-x-8 sm:flex sm:overflow-x-auto lg:gap-x-4 lg:gap-y-6'>
                {tabData.map((tab, index) => (
                  <li
                    key={index}
                    tabIndex={index}
                    onClick={() => onClickTab(index)}
                    className={`lg: col-span-1 shrink-0 rounded-[30px] py-4 text-M/Bold sm:px-4   sm:text-S/Bold md:py-3 md:text-S/Medium
                      ${
                        index === activeTabIndex
                          ? 'bg-grey-900 text-white'
                          : 'bg-grey-200 text-grey-500'
                      }`}
                  >
                    <div className=' flex items-center  justify-center'>
                      <i className='mr-1'>{tab.icoName}</i>
                      <span>{tab.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='container-padding pb-[100px]  sm:pb-[60px]  md:mx-auto'>
          <div className='grid-12 mb-[18px] sm:justify-items-center md:items-start '>
            <div className='xs:col-span-full col-start-3 col-end-7 sm:col-start-2 sm:col-end-12 sm:mb-8 sm:text-center md:col-span-6  md:col-start-1 lg:col-span-5  lg:col-start-2 '>
              <div className='mb-6 '>
                <div className='mb-4 text-2XL/Bold text-primary-red-orange md:text-L/Bold lg:text-XL/Bold'>
                  Insight {tabData[activeTabIndex].data.insightNum}
                </div>
                <div className='md:text-2L/Bold text-4XL/Bold  text-grey-900 lg:text-3XL/Bold'>
                  {tabData[activeTabIndex].name}
                </div>
              </div>
              <div className='w-9/12 break-keep text-L/Medium text-grey-900 sm:w-full md:text-M/Medium'>
                {tabData[activeTabIndex].data.content}
              </div>
            </div>
            <div className='xs:col-span-full col-span-4 sm:col-start-2 sm:col-end-12 sm:max-w-[280px]   md:col-span-6  lg:col-span-5 '>
              <img
                src={`${IMG_PATH}/Section5/${tabData[activeTabIndex].data.img}`}
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-grey-50'>
        <div className='container-padding pt-[100px]  pb-[122px] md:mx-auto md:pt-[77px]  md:pb-[90px] lg:pb-[113px] '>
          <div className='grid-12 mb-20 md:mb-[61.3px] '>
            <div className='col-span-8 col-start-3 text-center lg:col-span-full lg:col-start-1 '>
              <div className='mb-5 text-2XL/Bold text-grey-800 md:text-XL/Bold lg:mb-6 '>
                고미 인사이트가 함께합니다
              </div>
              <div className='break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p className='mb-2'>서비스 오픈 1개월만에</p>
                <p>
                  무려 <span className='text-primary-red-orange'>248개사</span>가
                  이용했어요.
                </p>
              </div>
            </div>
          </div>

          <div className='sm:hidden'>
            <Swiper
              className='banner !overflow-visible'
              spaceBetween={24}
              slidesPerView={2}
              breakpoints={{
                720: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                960: {
                  slidesPerView: 2,
                },
                1440: {
                  slidesPerView: 3,
                },
              }}
              navigation
              pagination={{ clickable: true }}
            >
              {partnerData.map((partener, index) => (
                <SwiperSlide
                  key={index}
                  className='shadow-partner-card rounded-[16.5097px] border border-grey-300 bg-white p-6 md:p-[18.54px]'
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
      <section>
        <div className='container-padding pt-[100px] pb-[126px] sm:py-[60px] md:mx-auto  md:pb-[40px] lg:pb-[100px]'>
          <div className='grid-12 mb-20 sm:mb-[56px]'>
            <div className='col-span-8 col-start-3 text-center lg:col-span-full lg:col-start-1  '>
              <div className='mb-6 text-2XL/Bold text-orange-500  md:text-XL/Bold'>
                누가, 어떻게 활용할 수 있을 까요?
              </div>
              <div className='break-keep text-3XL/Bold text-grey-900 md:text-2XL/Bold '>
                <p>쇼피에 상품을 판매하는 누구나!</p>
              </div>
            </div>
          </div>
          <div>
            <ul className='grid-12'>
              {userTargetData.map((userTarget, index) => (
                <li
                  key={index}
                  className='xs:col-span-full xs:odd:col-start-1 col-span-3 p-2.5 sm:col-span-10 sm:col-start-2 sm:mb-5 sm:last:mb-0 md:col-span-5 md:mb-[50px] md:odd:col-start-2 '
                >
                  <div className='mb-6 lg:mb-4 '>
                    <img
                      src={`${IMG_PATH}/Section7/${userTarget.imgName}`}
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
      <section className='bg-main xs:bg-[40%] bg-cover bg-center py-[130px]  sm:bg-[20%] sm:py-[70px]  lg:py-[105px]'>
        <div className='container-padding'>
          <div className='grid-12 justify-items-right items-center sm:gap-y-12'>
            <div className='col-span-5 col-start-2 break-keep text-4XL/Bold  text-white sm:col-span-full  md:col-span-7 md:col-start-1 lg:text-3XL/Bold'>
              상위 노출을 위한
              <br />
              쇼피 판매 전략 인사이트
            </div>
            <div className='col-span-3 col-start-9 text-right sm:col-span-full md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8'>
              <button className='rounded bg-white py-4 px-4 text-L/Bold text-grey-800'>
                고미 인사이트 바로 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container-padding py-[120px] md:mx-auto md:mx-auto  lg:py-[60px]'>
          <div className='grid-12'>
            <div className='xs:gap-y-[33px] col-span-10 col-start-2 grid min-h-[300px] grid-cols-10 items-center justify-items-center gap-x-5  rounded-[49px] bg-grey-200 sm:justify-items-start sm:gap-y-[55px] sm:py-10 sm:pb-0 md:py-[39px]  lg:col-span-full  lg:col-start-1 lg:grid-cols-12  lg:py-[42px]'>
              <div className='col-span-5 break-keep pl-[53px] sm:col-span-full  sm:col-start-2 sm:pl-0 md:col-span-6  md:pl-[34px] lg:col-span-7'>
                <div className='mb-[13px] inline-block rounded-[33px] bg-grey-900 px-5 py-[7px]'>
                  <span className='text-S/Medium text-white'>Event 2022.12~ 종료시</span>
                </div>
                <div className='mb-[20px] text-3XL/Bold'>무제한 사용 이벤트</div>
                <div className='text-grey-700'>
                  고미 인사이트는 현재 무료 서비스 이벤트를 진행중이에요.
                  <br />
                  별도의 이벤트 종료 안내까지는 무제한 리포트 조회가 가능해요!
                </div>
              </div>
              <div className='xs:col-start-1 xs:mb-6 col-span-5 sm:col-span-full sm:col-start-4 md:col-span-6'>
                <img src={`${IMG_PATH}/Section9/Ticket.png`} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-grey-50 py-[120px] lg:py-[80px]'>
        <div className='container-padding'>
          <div className='grid-12 mb-12'>
            <div className='col-span-8 col-start-3 text-center lg:col-span-full lg:col-start-1 '>
              <div className='mb-6 text-2XL/Bold text-orange-500 lg:mb-8'>
                자주 묻는 질문을 모았어요.
              </div>
              <div className='break-keep text-3XL/Bold text-grey-900'>
                <p>FAQ</p>
              </div>
            </div>
          </div>
          <div className='grid-12'>
            <div className='col-span-10 col-start-2  rounded-[20.107px] bg-white px-12 py-14 lg:col-span-full lg:col-start-1  lg:py-6  lg:px-6'>
              {qnaData.map((qna, index) => (
                <dl
                  key={index}
                  className='border border-t-0 border-l-0 border-r-0  border-b-grey-300 py-8 first:pt-0 last:border-b-0 last:pb-0 lg:py-6'
                  onClick={() => onClickFaq(index + 1)}
                >
                  <dt className='relative'>
                    <p className='pr-12 text-2XL/Bold text-grey-900 lg:text-XL/Bold'>
                      {qna.subject}
                    </p>
                    <SvgIcon
                      iconName='Up'
                      wrapperStyle={`absolute top-1 right-0 lg:text-L/Medium text-L/Medium text-grey-700 
                      ${activeFaqIndex === index + 1 ? 'rotate-0' : 'rotate-180'}`}
                      svgProp={{
                        width: 24,
                        height: 24,
                        className: 'fill-grey-900',
                      }}
                    />
                  </dt>
                  <dd
                    className={`mt-4 text-L/Medium text-grey-700 lg:text-M/Medium  ${
                      activeFaqIndex === index + 1 ? 'block' : 'hidden'
                    }`}
                  >
                    {qna.content}
                  </dd>
                </dl>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
