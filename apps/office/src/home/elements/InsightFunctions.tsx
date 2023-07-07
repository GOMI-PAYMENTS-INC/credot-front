import 'swiper/swiper.min.css';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TAB_DATA } from '@/home/constant';
import { ReactSVG } from 'react-svg';
import { Swiper as SwiperClass } from 'swiper/types';

import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import { onChangeTab, dragTab } from '@/home/container';

interface IInsightFunctions {
  imagePath: string;
}

export const InsightFunctions = ({ imagePath }: IInsightFunctions) => {
  const [activeTabIndex, changeActiveTab] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
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
                onClick={() => onChangeTab({ tabIndex: index, changeActiveTab, swiper })}
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
                          <img src={`${imagePath}/Section5/${tab.data.img}`} alt='' />
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
                onClick={() =>
                  dragTab({ activeTabIndex, changeActiveTab, swiper, type: 'NEXT' })
                }
              />
              <ReactSVG
                src={`/assets/icons/Tab.svg`}
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'w-[38px] h-[38px] rotate-180');
                }}
                onClick={() =>
                  dragTab({ activeTabIndex, changeActiveTab, swiper, type: 'PREV' })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
