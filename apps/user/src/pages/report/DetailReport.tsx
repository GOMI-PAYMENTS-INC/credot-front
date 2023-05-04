import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Defalut as Layout } from '@/components/layouts';
import { _getReportInfo, openBrowser } from '@/containers/report/report.container';
import { convertShopeeSiteUrl, convertTitle } from '@/utils/convertEnum';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { KeywordInfo } from '@/pages/report/KeywordInfo';
import { MarketSize } from '@/pages/report/MarketSize';
import { DetailReportContentsBar } from '@/pages/report/DetailReportContentsBar';
import { RecommendationChart } from '@/pages/report/RecommendationChart';
import { AnalysisOverseaProduct } from '@/pages/report/AnalysisOverseaProduct';
import { PATH } from '@/types/enum.code';
import { TITLE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

import { SalePrice } from '@/pages/report/SalePrice';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';

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
        <KeywordInfo
          keywordInfo={main}
          itemCount={_state.salePrice?.data!.itemCount}
          amplitudeData={amplitudeData}
        />
        <MarketSize
          marketSize={main}
          itemCount={_state.salePrice?.data!.itemCount}
          country={main.country}
          createdAt={main.createdAt}
        />
        <Fragment>
          <AnalysisKeyword analysisInfo={main} />
          <RecommendationChart
            spinnerEvent={_state.spinnerEvent}
            relation={relation}
            country={main.country}
            _dispatch={_dispatch}
            toggleEvent={_state.toggleEvent}
            basePrice={main.basePrice}
            amplitudeData={amplitudeData}
          />
        </Fragment>
        <SalePrice
          scollerRef={scrollController}
          salePriceInfo={_state.salePrice?.data!}
          list={_state.salePrice.list}
          focus={_state.salePrice.focus}
          amplitudeData={amplitudeData}
          _dispatch={_dispatch}
        />
        <AnalysisOverseaProduct
          basePrice={main.basePrice}
          overseaProduct={_state.oversea}
          amplitudeData={amplitudeData}
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
