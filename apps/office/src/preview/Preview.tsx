import { Report } from '@/preview/elements/Resport';
import { useMemo, useState, useEffect, useRef, Fragment } from 'react';
import { REPORT_CONTENT, REPORT_INFO } from '@/preview/constants/reportData';

import { useScroll } from '@/common/useScroll';
import { PreviewFooter, PreviewHeader } from '@/preview/elements';
import { ReactSVG } from 'react-svg';
import { _keywordReportPreviewed } from '@/amplitude/amplitude.service';
import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';

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
    _keywordReportPreviewed();
  }, []);

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
        const isMobile = window.innerWidth < 431;
        if (isMobile && index === 1) return <Fragment key={`keyword_info_1`} />;
        return (
          <div className={`flex items-center`} key={`keyword_info_${index}`}>
            <p className='text-S/Medium text-grey-600'>{key}</p>
            <p className='ml-1 text-S/Medium text-grey-800'>{value}</p>
            {isMobile && index === 0 && (
              <p className='ml-1 text-S/Medium text-grey-600'>
                리포트 생성일
                <span className='ml-1 text-S/Medium text-grey-800'>2023.07.13</span>
              </p>
            )}
            {isMobile === false && REPORT_INFO.length !== index + 1 && (
              <p className='mx-2 text-grey-700'>•</p>
            )}
          </div>
        );
      }),
    [],
  );

  return (
    <Fragment>
      <PreviewHeader />
      <main className='container'>
        <section className='my-[50px] rounded-lg bg-white xs:my-0 xs:mt-[50px]'>
          <div className='flex flex-col items-center pt-10'>
            <p className='text-XL/Medium xs:text-S/Bold'>분석 키워드</p>
            <p className='mt-[7px] text-3XL/Bold xs:mt-1'>foundation</p>
            <div className='mt-4 flex xs:flex-col xs:items-center xs:gap-y-[6px]'>
              {ReportSummary}
            </div>
          </div>
        </section>

        <section ref={contentSection}>
          <Report setScrollEvent={setScrollEvent} scrollEvent={scrollEvent} />
        </section>
        <PreviewFooter />
      </main>
      <button
        className='z-100 fixed right-[60px] bottom-[50px] z-50 flex h-11 w-11 items-center justify-center rounded-[40px] border-[1px] border-grey-300 bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)] xs:right-[20px]'
        onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }}
      >
        <ReactSVG src='/assets/icons/ToTop.svg' />
      </button>
    </Fragment>
  );
};

export default Preview;
