import { ReactSVG } from 'react-svg';
import { convertTime } from '@/utils/parsingTimezone';
import {
  convertCountry,
  convertExchangeRate,
  convertShopeeSiteUrl,
  convertSortedType,
} from '@/utils/convertEnum';
import {
  _amplitudeKeywordReportShared,
  _amplitudeMovedToSERP,
  _amplitudeSharedKeywordReportShared,
} from '@/amplitude/amplitude.service';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useMatch } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
import { openBrowser } from '@/utils/openBrowser';
import { _postReportShareToken } from '@/report/container';
import { TReportAction } from '@/report/reducer';
import type { Dispatch } from 'react';

interface IKeywordInfoProps {
  _dispatch: Dispatch<TReportAction>;
  keywordInfo: TKeywordInfo;
  amplitudeData: TAmplitudeDetailData;
}

export const KeywordInfo = (props: IKeywordInfoProps) => {
  const { text, country, createdAt, basePrice, currencyUnit, sorted, itemCount } =
    props.keywordInfo;
  const { param: reportIdOrShareToken } = props.amplitudeData;
  const isMatchSharePath = useMatch('/share/:id');

  const domain = window.location.origin;
  const href = window.location.href;

  const makeShareLink = async () => {
    let url = '';
    if (isMatchSharePath) {
      url = `${href}`;

      _amplitudeSharedKeywordReportShared(reportIdOrShareToken, country, sorted, text);
    } else {
      const shareToken = await _postReportShareToken(
        reportIdOrShareToken,
        props._dispatch,
      );

      const utmLink =
        'utm_source=gomiinsight&utm_medium=share&utm_campaign=keywordreport&utm_content=' +
        reportIdOrShareToken;
      url = `${domain}${PATH._REPORT_DETAIL_BY_SHARE}/${shareToken}?${utmLink}`;

      _amplitudeKeywordReportShared(reportIdOrShareToken, country, sorted, text);
    }

    copyToClipboard('주소가 복사되었습니다.원하는 곳에 붙여넣기(Ctrl+V)해주세요.', url);
  };

  return (
    <section>
      <div className='flex justify-between border-t-2 border-b-2 border-grey-200 xs:mt-[30px] xs:items-center xs:border-white'>
        <div className='basis-full py-5 pl-2 xs:flex xs:flex-col xs:items-center xs:justify-center'>
          <h1 className='break-all text-3XL/Bold text-grey-900'>{text}</h1>

          <div className=' xs:hidden xs:flex-col xs:items-center'>
            <div className='pt-4 text-S/Medium'>
              <span className='keywordInfo-divide-by-single-dot'>
                <span className='text-grey-600'>국가</span>
                <span className='ml-1 text-grey-800'>{convertCountry(country)}</span>
              </span>
              <span className='keywordInfo-divide-by-single-dot'>
                <span className='text-grey-600'>리포트 생성일</span>
                <span className='ml-1 text-grey-800'>
                  {convertTime(createdAt!, 'YYYY.MM.DD')}
                </span>
              </span>
            </div>

            <div className='pt-2 text-S/Medium'>
              <span className='keywordInfo-divide-by-single-dot'>
                <span className='text-grey-600'>데이터 수집 기준</span>
                <span className='ml-1 text-grey-800'>
                  {convertSortedType(sorted)} 상위 {itemCount}개
                </span>
              </span>
              <span className='keywordInfo-divide-by-single-dot xs:flex xs:items-center'>
                <span className='text-grey-600'>적용 환율</span>
                <span className='ml-1 space-x-1 text-grey-800'>
                  <span>{currencyUnit}</span>
                  <span className='text-grey-700'>{convertExchangeRate(country)}</span>
                  <span>=</span>
                  <span>{basePrice}</span>
                  <span className='text-grey-700'>KRW</span>
                </span>
              </span>
            </div>
          </div>

          <div className='mt-[14px] hidden flex-col items-center justify-center gap-y-[6px] text-M/Medium xs:flex'>
            <div className='flex gap-x-1'>
              <div className='flex'>
                <p className='text-grey-600'>국가</p>
                <p className='ml-1 text-grey-800'>{convertCountry(country)}</p>
              </div>
              <span className='text-grey-600'>리포트 생성일</span>
              <span className='ml-1 text-grey-800'>
                {convertTime(createdAt!, 'YYYY.MM.DD')}
              </span>
            </div>

            <div className='flex'>
              <p className='text-grey-600'>데이터 수집 기준</p>
              <p className='ml-1 text-grey-800'>
                {convertSortedType(sorted)} 상위 {itemCount}개
              </p>
            </div>
            <div className='flex gap-x-1'>
              <span className='text-grey-600'>적용 환율</span>
              <span>{currencyUnit}</span>
              <span className='text-grey-700'>{convertExchangeRate(country)}</span>
              <span>=</span>
              <span>{basePrice}</span>
              <span className='text-grey-700'>KRW</span>
            </div>
          </div>
        </div>
        <div className='mt-[30px] xs:hidden'>
          <div className='flex grow-0 flex-col items-end gap-y-4'>
            <button
              onClick={() => {
                openBrowser(
                  `${convertShopeeSiteUrl(country)}/search?keyword=${text}`,
                  sorted,
                );
                _amplitudeMovedToSERP(reportIdOrShareToken, text, null);
              }}
              className='button-filled-normal-medium-grey-false-true-true flex min-w-[205px] items-center justify-center gap-1 p-2.5'
            >
              <span>키워드 검색결과</span>
              <ReactSVG
                src='/assets/icons/outlined/Linkout.svg'
                beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-900')}
              />
            </button>
            <button
              className='button-filled-normal-medium-grey-false-true-true flex  gap-1 bg-orange-400 px-4 py-2.5 text-white'
              onClick={() => makeShareLink()}
            >
              <span>공유하기</span>
              <ReactSVG src='/assets/icons/outlined/ShareAlt.svg' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
