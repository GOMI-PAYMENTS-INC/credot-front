import 'swiper/swiper.min.css';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TAB_DATA } from '@/home/HomeConstant';
import { ReactSVG } from 'react-svg';
import { Swiper as SwiperClass } from 'swiper/types';
import { InduceButton } from '@/home/elements/InduceButton';

import { onChangeTab, dragTab } from '@/home/container';

interface IInsightFunctions {
  imagePath: string;
  varidation: string;
}

export const InsightFunctions = ({ imagePath, varidation }: IInsightFunctions) => {
  const [activeTabIndex, changeActiveTab] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
    <section>
      <div className='pt-[100px]  md:mx-auto  sm:pt-[60px]'>
        <div className='container'>
          <div className='mb-[70px] lg:mb-[72px] sm:mb-10'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-orange-500 md:text-XL/Bold'>
                베스트 글로벌 셀러가 되기 위한
              </div>
              <div className='mt-6 break-keep text-3XL/Bold text-grey-900 md:text-2XL/Bold xs:mt-2'>
                <p>10여가지 종합 인사이트!</p>
              </div>
            </div>
          </div>
        </div>

        <div className='container-tab mx-auto mb-[100px] max-w-[870px] overflow-x-auto pb-8 lg:mb-[72px] lg:pb-0 md:max-w-[720px] sm:mb-10  sm:block sm:pb-0'>
          <ul className='swiper-pagination mx-auto grid  grid-cols-[repeat(5,_minmax(160px,_1fr))] grid-rows-1 gap-y-4 gap-x-2 md:grid-cols-[repeat(5,_minmax(140px,_1fr))] sm:gap-y-2 '>
            {TAB_DATA.map((tab, index) => (
              <li
                key={index}
                onClick={() => onChangeTab({ tabIndex: index, changeActiveTab, swiper })}
                className={`shrink-0 cursor-pointer rounded-[30px] py-4 text-M/Bold md:py-3 md:text-S/Medium
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
                      src={`/assets/icons/${tab.icon}.svg`}
                      beforeInjection={(svg) => {
                        svg.setAttribute(
                          'class',
                          `md:w-[14px] w-5 h-5 ${
                            index === activeTabIndex
                              ? 'fill-white'
                              : tab.launching
                              ? 'fill-orange-500'
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
          <div className='relative mx-auto max-w-[870px] md:max-w-[720px] sm:pb-[115px]'>
            <Swiper
              className='banner cursor-grab sm:max-w-[382px]'
              slidesPerView={1}
              onSlideChange={(e) => changeActiveTab(e.activeIndex)}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {TAB_DATA.map((tab, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <div className='mx-auto flex justify-between md:items-start sm:flex-wrap sm:justify-center'>
                      <div className='mr-6 lg:mr-0 sm:mb-8 sm:text-center'>
                        <div>
                          <div className='text-2XL/Bold text-orange-500 lg:text-XL/Bold md:text-L/Bold'>
                            Insight {tab.data.insightNum}
                          </div>
                          {tab.launching || (
                            <div className='mt-3 sm:mt-1'>
                              <div className='inline-block rounded-sm border-[2px] border-orange-300 p-1 text-XS/Regular text-orange-700'>
                                출시 예정
                              </div>
                            </div>
                          )}
                          <div className='mt-4 text-4XL/Bold  text-grey-900 lg:text-3XL/Bold md:text-2XL/Bold sm:mt-2'>
                            {tab.name}
                          </div>
                        </div>
                        <div className='mt-6 break-keep text-L/Medium text-grey-900 md:text-M/Medium sm:mt-4 sm:w-full'>
                          {tab.data.content}
                        </div>
                        <InduceButton
                          varidation={varidation}
                          text='더욱 자세히 알고싶다면'
                          className='md:item mt-[30px] justify-start lg:ml-[80px] lg:justify-center md:ml-0 md:flex md:flex-col md:items-center'
                        />
                      </div>
                      <div className='flex basis-full justify-center'>
                        <div className='w-[424px] md:w-[345px] sm:w-[280px]'>
                          <img src={`${imagePath}/Section5/${tab.data.img}`} alt='' />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='relative bottom-[300px] z-10 flex w-full translate-y-[-50%] justify-between'>
            <ReactSVG
              src={`/assets/icons/Tab.svg`}
              beforeInjection={(svg) => {
                svg.setAttribute(
                  'class',
                  'xs:w-[38px] xs:h-[38px] w-[58px] h-[58px] cursor-pointer',
                );
              }}
              onClick={() =>
                dragTab({ activeTabIndex, changeActiveTab, swiper, type: 'PREV' })
              }
            />
            <ReactSVG
              src={`/assets/icons/Tab.svg`}
              beforeInjection={(svg) => {
                svg.setAttribute(
                  'class',
                  'xs:w-[38px] xs:h-[38px] w-[58px] h-[58px] cursor-pointer rotate-180',
                );
              }}
              onClick={() =>
                dragTab({ activeTabIndex, changeActiveTab, swiper, type: 'NEXT' })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
