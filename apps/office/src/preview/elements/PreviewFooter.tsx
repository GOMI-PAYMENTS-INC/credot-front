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
      <section className='mt-[50px] hidden h-[450px] xs:block'>
        <div className='flex flex-col justify-center'>
          <div className='relative flex flex-col items-center'>
            <div className='absolute mt-[50px] h-[200px] w-full bg-orange-500 opacity-20 blur-[132px]' />
            <div className='flex h-full flex-col items-center justify-center text-L/Medium '>
              <div className='flex w-[252px] flex-col justify-center break-words text-center text-XL/Medium'>
                <p>회원가입 시 원하는 키워드를</p>
                <p className=''>
                  <span className='text-XL/Bold text-orange-400'>무제한</span>으로 분석할
                  수 있어요!
                </p>
              </div>
              <button
                className='button-filled-xLarge-primary-false-false-false mt-5 w-fit text-L/Bold'
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
          </div>
          <div className='z-10 mt-8 flex h-full'>
            <img src='/assets/images/MPreviewBanner.png' />
          </div>
        </div>
      </section>

      <section className='mt-[120px] xs:hidden'>
        <div className='flex h-[340px] justify-center'>
          <div className='relative flex w-full justify-around overflow-hidden'>
            <div className='absolute ml-[550px] mt-[200px] h-[600px] w-[600px] rounded-[600px] bg-orange-500 opacity-20 blur-[132px]' />
            <div className='flex h-full flex-col justify-center text-3XL/Medium'>
              <p>회원가입 시 원하는 키워드를</p>
              <p className='mt-1'>
                <span className='text-orange-400'>무제한</span>으로 분석할 수 있어요!
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
            <img
              className='z-10 h-[318px] w-[724px] self-end'
              src='/assets/images/PreviewBanner.png'
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
};
