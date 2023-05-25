import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Default as Layout } from '@/components/layouts';
import { _getReportInfo, openBrowser } from '@/containers/report/report.container';
import { convertShopeeSiteUrl, convertTitle } from '@/utils/convertEnum';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { DetailReportContentsBar } from '@/pages/report/DetailReportContentsBar';
import { PATH } from '@/types/enum.code';
import { TITLE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { DetailReportSwitch } from '@/pages/report/DetailReportSwitch';

const DetailReport = () => {
  const routeId = useParams();

  const scrollEventState = {
    scrollY: 0,
    title: 'Report',
    isOpen: true,
    current: 'Report',
  };

  const [_state, _dispatch] = useReducer(reportReducer, reportInitialState);
  const [scrollEvent, setScrollEvent] = useState(scrollEventState);

  const { main, relation } = _state;
  const navigation = useNavigate();

  const contentSection = useRef<HTMLDivElement>(null);
  const scrollController = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (isFalsy(routeId.id)) return;
    if (routeId.id && _state.main === null) {
      void _getReportInfo(routeId.id, _dispatch);
    }
  }, []);

  const combinedComponent = useMemo(() => {
    if (main === null) return <Fragment></Fragment>;

    const amplitudeData: TAmplitudeDetailData = {
      reportId: routeId.id ? routeId.id.toString() : '',
      keyword: main.text,
    };

    return (
      <Fragment>
        <DetailReportSwitch
          isUser={true}
          _state={_state}
          _dispatch={_dispatch}
          amplitudeData={amplitudeData}
          scrollController={scrollController}
        ></DetailReportSwitch>
      </Fragment>
    );
  }, [main]);

  if (isFalsy(main))
    return (
      <Layout>
        <div className='flex h-full flex-col items-center justify-center self-center'>
          <div className='absolute scale-[0.3] pb-[84px]'>
            <div id='loader' />
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <header className='border-b-[1px] border-b-grey-200 bg-white'>
        <div className='container'>
          <div className='flex h-[84px] items-center justify-between'>
            <div className='flex items-center'>
              <div
                className='h-5 w-5 cursor-pointer pl-[7px]'
                onClick={() => navigation(PATH.GET_REPORT_LIST)}
              >
                <ReactSVG src='/assets/icons/outlined/LeftArrow.svg' />
              </div>
              <h1 className='ml-[19px] text-2XL/Bold text-grey-900'>
                {convertTitle(scrollEvent.title)}
              </h1>
              {scrollEvent.title !== TITLE.REPORT && (
                <button
                  className='flex h-5 w-5 cursor-pointer items-center pl-3'
                  onClick={() => {
                    openBrowser(
                      `${convertShopeeSiteUrl(main!.country)}/search?keyword=${
                        main!.text
                      }`,
                    );
                    _amplitudeMovedToSERP(routeId.id, main!.text, null);
                  }}
                >
                  <ReactSVG src='/assets/icons/outlined/Linkout.svg' />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <section
        className='grow overflow-y-scroll'
        onScroll={(event) => {
          setScrollEvent(
            Object.assign({}, scrollEvent, {
              scrollY: (event.target as HTMLElement).scrollTop,
            }),
          );
        }}
        ref={contentSection}
      >
        <div className='min-h-full bg-white'>
          <div className='container pt-8 pb-[100px]'>
            <div className='grid grid-cols-12 gap-x-6'>
              <div className='col-span-10'>{combinedComponent}</div>
              <DetailReportContentsBar
                title={main!.text}
                scrollEvent={scrollEvent}
                contentSection={contentSection}
                scrollController={scrollController}
                setScrollEvent={setScrollEvent}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DetailReport;
