import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Default as Layout } from '@/components/layouts';
import { _getReportInfo, openBrowser } from '@/containers/report/report.container';
import { convertShopeeSiteUrl, convertTitle } from '@/utils/convertEnum';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { DetailReportRightQuickBar } from '@/pages/report/DetailReportRightQuickBar';
import { PATH } from '@/types/enum.code';
import { TITLE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { DetailReportSwitch } from '@/pages/report/DetailReportSwitch';
import { getParameter } from '@/utils/getParameter';

interface TDetailReport {
  params: Params<string>;
  main: (TGetMainReportDataType & TKeywordInfo & TMarketSize & TRecommendKeyword) | null;
  scrollEvent: scrollEventState;
}

const DetailReportHeader = (props: TDetailReport) => {
  const { params, main, scrollEvent } = props;
  const navigation = useNavigate();

  const listUrlMake = () => {
    const limit = getParameter('limit');
    const page = getParameter('page');
    if (limit && page) {
      return `${PATH.REPORT_LIST}?limit=${limit}&page=${page}`;
    } else {
      return `${PATH.REPORT_LIST}`;
    }
  };

  return (
    <header className='border-b-[1px] border-b-grey-200 bg-white'>
      <div className='container'>
        <div className='flex h-[84px] items-center justify-between'>
          <div className='flex items-center'>
            <div
              className='h-5 w-5 cursor-pointer pl-[7px]'
              onClick={() => navigation(listUrlMake())}
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
                    `${convertShopeeSiteUrl(main!.country)}/search?keyword=${main!.text}`,
                  );
                  _amplitudeMovedToSERP(params.id, main!.text, null);
                }}
              >
                <ReactSVG src='/assets/icons/outlined/Linkout.svg' />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DetailReportHeader;
