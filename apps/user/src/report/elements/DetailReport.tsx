import { TReportAction } from '@/report/reducer';
import { Dispatch } from 'react';
import { convertTime } from '@/utils/parsingTimezone';

import { ReactSVG } from 'react-svg';
import { openBrowser } from '@/utils/openBrowser';
import { makeShareLink } from '@/report/container';

import {
  _amplitudeKeywordReportShared,
  _amplitudeMovedToSERP,
  _amplitudeSharedKeywordReportShared,
} from '@/amplitude/amplitude.service';

import {
  convertCountry,
  convertExchangeRate,
  convertShopeeSiteUrl,
  convertSortedType,
} from '@/utils/convertEnum';
import { useMatch } from 'react-router-dom';

interface IDetailReport {
  _dispatch: Dispatch<TReportAction>;
  keywordInfo: TKeywordInfo;
  amplitudeData: TAmplitudeDetailData;
}

export const DetailReport = ({
  _dispatch,
  keywordInfo,
  amplitudeData,
}: IDetailReport) => {
  const { param: reportIdOrShareToken } = amplitudeData;
  const { country, text, sorted, createdAt, itemCount, currencyUnit, basePrice } =
    keywordInfo;
  const isMatchSharePath = useMatch('/share/:id');

  return (
    <div className='divide-y-1 mt-[6px] w-[288px] rounded-lg border-[1px] border-grey-300 p-5'>
      <header className='border-b-[1px] border-grey-300 pb-2.5'>
        <p className='text-S/Medium text-grey-700'>키워드</p>
        <p className='break-words text-XL/Medium'>{text}</p>
      </header>
      <main className='flex gap-4 border-b-[1px] border-grey-300 py-5 text-S/Medium'>
        <div className='flex flex-col gap-3 text-grey-700'>
          <p>국가</p>
          <p>리포트 생성일</p>
          <p>데이터 수집 기준</p>
          <p>적용 환율</p>
        </div>

        <div className='flex flex-col gap-3'>
          <p>{convertCountry(country)}</p>
          <p>{convertTime(createdAt!, 'YYYY.MM.DD')}</p>
          <p>
            {convertSortedType(sorted)} 상위 {itemCount}개
          </p>
          <p>{`${currencyUnit} ${convertExchangeRate(country)} = ${basePrice} KRW`}</p>
        </div>
      </main>
      <footer className='mt-5 flex gap-3'>
        <button
          onClick={() => {
            openBrowser(
              `${convertShopeeSiteUrl(country)}/search?keyword=${text}`,
              sorted,
            );
            _amplitudeMovedToSERP(reportIdOrShareToken, text, null);
          }}
          className='button-filled-normal-medium-grey-false-true-true flex items-center justify-center px-[14px] py-2.5'
        >
          <span className='text-S/Bold text-grey-800'>키워드 검색결과</span>
          <ReactSVG
            src='/assets/icons/outlined/Linkout.svg'
            beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-900 pl-1')}
          />
        </button>
        <button
          className='button-filled-normal-medium-grey-false-true-true flex items-center gap-1 bg-orange-400 px-4 py-2.5 text-white'
          onClick={() =>
            makeShareLink(
              isMatchSharePath,
              reportIdOrShareToken,
              country,
              sorted,
              text,
              _dispatch,
            )
          }
        >
          <span>공유하기</span>
          <ReactSVG
            src='/assets/icons/outlined/ShareAlt.svg'
            beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-50')}
          />
        </button>
      </footer>
    </div>
  );
};
