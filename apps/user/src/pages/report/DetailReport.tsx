import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Defalut as Layout } from '@/components/layouts';
import { _getReportInfo, openBrowser } from '@/containers/report/report.container';
import { convertTitle } from '@/utils/convertEnum';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { KeywordInfo } from '@/pages/report/KeywordInfo';
import { MartketSize } from '@/pages/report/MarketSize';
import { DetailReportContentsBar } from '@/pages/report/DetailReportContentsBar';
import { RecommendationOfKeyword } from '@/pages/report/RecommendationOfKeywrod';
import { PATH } from '@/types/enum.code';
import { TITLE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

import { SalePrice } from '@/pages/report/SalePrice';

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
      _getReportInfo(routeId.id, _dispatch);
    }
  }, []);

  const combinedComponent = useMemo(() => {
    if (main === null) return <Fragment></Fragment>;

    return (
      <Fragment>
        <KeywordInfo keywordInfo={main} />
        <MartketSize marketSize={main} />
        <AnalysisKeyword analysisInfo={main} />
        <RecommendationOfKeyword
          spinnerEvent={_state.spinnerEvent}
          relation={relation}
          _dispatch={_dispatch}
          toggleEvent={_state.toggleEvent}
          basePrice={main.basePrice}
        />
        <SalePrice
          scollerRef={scrollController}
          salePriceInfo={_state.salePrice?.data!}
          list={_state.salePrice.list}
          focus={_state.salePrice.focus}
          _dispatch={_dispatch}
        />
        <section className='h-[200px]'></section>
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
      <header className='border-b-[1px] border-b-gray-200 bg-white'>
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
                <div className='flex h-5 w-5 cursor-pointer items-center pl-3'>
                  <ReactSVG
                    src='/assets/icons/outlined/Linkout.svg'
                    onClick={() =>
                      openBrowser(`https://shopee.vn/search?keyword=${main!.text}`)
                    }
                  />
                </div>
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
          <div className='container pt-8'>
            <div className='grid grid-cols-12 gap-x-6'>
              <div className='col-span-10 space-y-[72px]'>{combinedComponent}</div>
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
