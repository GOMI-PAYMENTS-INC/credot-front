import { ReactSVG } from 'react-svg';
import { CTA_LOCATION, CTA_TYPE, PAGE_CATEGORY } from '@/amplitude/amplitude.enum';
import { _keywordReportPreviewed } from '@/amplitude/amplitude.service';

import { openAppWithTag } from '@/utils/openBrowser';
import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import { GlobalEnv } from '@/api/config';
import { Fragment } from 'react';

export const PreviewFooter = () => {
  return (
    <Fragment>
      <section className='mt-[50px] hidden h-[540px] xs:block'>
        <div className='flex justify-center'>
          <div className='relative flex flex-col items-center'>
            <div className='absolute mt-[50px] h-[335px] w-full bg-orange-500 opacity-20 blur-[132px]' />
            <div className='flex h-full flex-col items-center justify-center text-L/Medium '>
              <div className='flex w-[252px] flex-col justify-center break-words text-center leading-loose'>
                <p>고미인사이트의 키워드 리포트는 Shopee 키워드 검색결과 화면에서</p>
                <p className='mt-1'>
                  광고 상품을 제외한 상위 50개의 상품 데이터를 기반으로 제공되어요.
                </p>
              </div>
              <button
                className='button-filled-xLarge-primary-false-false-false mt-[26px] w-fit text-L/Bold'
                id='movedToSolution'
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

              <ReactSVG
                className='z-10'
                src='/assets/icons/ReportL.svg'
                beforeInjection={(svg) => svg.setAttribute('class', 'w-[360px]')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className='mt-[120px] xs:hidden'>
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
                id='movedToSolution'
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
    </Fragment>
  );
};
