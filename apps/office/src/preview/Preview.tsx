import { ReactSVG } from 'react-svg';
import { Report } from '@/preview/elements/Resport';

import { useMemo, useState, useEffect, useRef } from 'react';
import { REPORT_CONTENT, REPORT_INFO } from '@/preview/constants/reportData';
import { useScroll } from '@/common/useScroll';
import { CTA_LOCATION, CTA_TYPE, PAGE_CATEGORY } from '@/amplitude/amplitude.enum';

import { openAppWithTag } from '@/utils/openBrowser';
import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import { GlobalEnv } from '@/api/config';

const Preview = () => {
  const scrollEventState: TScrollEvent = {
    scrollY: 0,
    isOpen: true,
    current: REPORT_CONTENT.MARKET,
  };
  const contentSection = useRef<HTMLDivElement>(null);
  const [scrollEvent, setScrollEvent] = useState(scrollEventState);

  const { scrollY: windowScrollY } = useScroll();

  useEffect(() => {
    setScrollEvent(
      Object.assign({}, scrollEvent, {
        scrollY: windowScrollY,
      }),
    );
  }, [scrollY]);

  const ReportSummary = useMemo(
    () =>
      REPORT_INFO.map((data, index) => {
        const [key, value] = Object.entries(data)[0];
        return (
          <div className='flex items-center' key={`keyword_info_${index}`}>
            <p className='text-S/Medium text-grey-600'>{key}</p>
            <p className='ml-1 text-S/Medium text-grey-800'>{value}</p>
            {REPORT_INFO.length !== index + 1 && <p className='mx-2 text-grey-700'>•</p>}
          </div>
        );
      }),
    [],
  );

  return (
    <main className='container'>
      <section className='my-[50px] rounded-lg bg-white'>
        <div className='flex flex-col items-center'>
          <p className='text-XL/Medium'>분석 키워드</p>
          <p className='mt-[7px] mb-4 text-3XL/Bold'>foundation</p>
          <div className='flex'>{ReportSummary}</div>
        </div>
      </section>

      {/* 
      모바일에서 활성화 ??? 
      <PreviewHeader setScrollEvent={setScrollEvent} scrollEvent={scrollEvent} /> 
      */}
      <section ref={contentSection}>
        <Report setScrollEvent={setScrollEvent} scrollEvent={scrollEvent} />
      </section>
      <section className='mt-[120px]'>
        <div className='flex h-[340px] justify-center'>
          <div className='relative flex w-full justify-around overflow-hidden'>
            <div className='absolute ml-[500px] mt-[50px] h-[1000px] w-[1000px] rounded-[1000px] bg-orange-500 opacity-20 blur-[132px]' />
            <div className='flex h-full flex-col justify-center text-XL/Bold'>
              <p>고미인사이트의 키워드 리포트는 Shopee 키워드 검색결과 화면에서</p>
              <p className='mt-1'>
                광고 상품을 제외한 상위 50개의 상품 데이터를 기반으로 제공되어요.
              </p>
              <button
                className='button-filled-xLarge-primary-false-false-false mt-[26px] w-fit text-L/Bold'
                onClick={(event) => {
                  openAppWithTag({
                    url: GlobalEnv.serviceUrl,
                    path: PAGE_CATEGORY.KEYWORD_REPORT_PREVIEWED,
                    type: CTA_TYPE.BUTTON,
                    location: CTA_LOCATION.BOTTOM,
                    event: event,
                  });
                }}
              >
                내가 원하는 키워드 분석하러 가기
              </button>
            </div>
            <ReactSVG className='z-10 self-end' src='/assets/icons/ReportL.svg' />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Preview;
