import { ReactSVG } from 'react-svg';
import { convertTime } from '@/utils/parsingTimezone';
import ChannelService from '@/config/channelTalk';
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

import { useMatch } from 'react-router-dom';
import { openBrowser } from '@/utils/openBrowser';
import { _postReportShareToken } from '@/report/container';
import { TReportAction } from '@/report/reducer';
import { Dispatch, useEffect } from 'react';
import { makeShareLink } from '@/report/container';

interface IKeywordInfoProps {
  _dispatch: Dispatch<TReportAction>;
  keywordInfo: TKeywordInfo;
  amplitudeData: TAmplitudeDetailData;
}

export const KeywordInfo = (props: IKeywordInfoProps) => {
  const { _dispatch, keywordInfo, amplitudeData } = props;
  const { text, country, createdAt, basePrice, currencyUnit, sorted, itemCount } =
    keywordInfo;
  const { param: reportIdOrShareToken } = amplitudeData;
  const isMatchSharePath = useMatch('/share/:id');

  useEffect(() => {
    ChannelService.track('PageView');
  }, []);

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
              <span className='keywordInfo-divide-by-single-dot text-grey-600'>
                데이터 수집 기준
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
              <span className='keywordInfo-divide-by-single-dot text-grey-600'>
                데이터 수집 기준
                <span className='ml-1 text-grey-800'>
                  {convertSortedType(sorted)} 상위 {itemCount}개
                </span>
              </span>
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
      </div>
    </section>
  );
};
