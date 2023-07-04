import React, { useMemo } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl, convertTitle } from '@/utils/convertEnum';
import { PATH, STYLE_ENUM } from '@/types/enum.code';
import { TITLE } from '@/types/enum.code';

import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
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

  const headerHeightStyle = useMemo(() => {
    return { height: STYLE_ENUM.REPORT_DETAIL_HEADER_HEIGHT };
  }, []);

  return (
    <header className='sticky top-0 z-10 border-b-[1px] border-b-grey-200 bg-white'>
      <div className='container'>
        <div style={headerHeightStyle} className='flex items-center justify-between'>
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
