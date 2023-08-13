import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate } from '@/report/container';

import { convertEvaluateStatus, convertScoreToText } from '@/report/constants/Score';
import { TITLE } from '@/types/enum.code';
import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';
import { DetailReportSectionHeader } from '@/report/elements/DetailReportSectionHeader';

import { TReportAction } from '@/report/reducer';
import { getConversionRate } from '@/report/keyword/container';
import { KeywordAnalysisCard } from '@/report/keyword/elements';
import { RelativeKeywordTable } from '@/report/keyword/RelativeKeywordTable';

interface IAnalysisKeyword {
  _state: TReportState;
  _dispatch: React.Dispatch<TReportAction>;
  isUser?: boolean;

  analysisInfo: TRecommendKeyword & {
    totalSalesCount: number;
    sorted: TSortBy;
    text: string;
    itemCount: number;
  };
  relations: TRelationReport[] | null;
  amplitudeData?: TAmplitudeDetailData;
}

export const AnalysisKeyword = (props: IAnalysisKeyword) => {
  const {
    _state,
    _dispatch,
    isUser = true,
    analysisInfo,
    relations,
    amplitudeData,
  } = props;
  const { text, itemCount } = analysisInfo;
  const conversionRate = analysisInfo.totalSalesCount / analysisInfo.searchCount;
  const [
    cpcPrice,
    avgPrice,
    searchCount,
    competitionProductCount,
    cpcRate,
    totalSalesCount,
    competitionRate,
    _conversionRate,
  ] = [
    analysisInfo.cpcPrice,
    analysisInfo.avgPrice,
    analysisInfo.searchCount,
    analysisInfo.competitionProductCount,
    analysisInfo.cpcRate,
    analysisInfo.totalSalesCount,
    analysisInfo.competitionRate,
    conversionRate,
  ]
    .map((number, idx) => {
      if (idx > 1) return number;
      return convertExchangeRate(
        analysisInfo.currencyUnit,
        number,
        analysisInfo.basePrice,
      );
    })
    .map((number) => formatNumber(number));

  const keywordReport = useMemo(() => {
    const rateGrade = analysisInfo.evaluateStatus + getConversionRate(conversionRate);
    return rateGrade.split('').map((score) => convertScoreToText(score));
  }, [analysisInfo.evaluateStatus]);
  const [search, competition, cpc, conversion] = keywordReport;

  const { top, bottom } = convertEvaluateStatus(analysisInfo.evaluateStatus);
  console.log(cpcRate, 'rate', analysisInfo.cpcRate, 'analysisInfo.cpcRate');
  return (
    <section>
      <DetailReportSectionHeader id={TITLE.KEYWORD_INFO} />
      <div className='pt-6'>
        <div className='flex flex-col border-t-[2px] border-b-[1px] border-grey-300'>
          <div className=''>
            <div className='keywordInfo-span-subtitle border-b-[1px] text-M/Medium xs:text-L/Bold'>
              <span>{analysisInfo.text}</span>
            </div>
            <div className='flex items-center bg-grey-50 text-center'>
              <div className='m-5 flex w-full justify-around gap-10 xs:flex-col xs:items-center'>
                <KeywordAnalysisCard
                  grade={search}
                  rate={searchCount}
                  id='Search'
                  tooltipItem={{ text, itemCount }}
                />
                <KeywordAnalysisCard
                  grade={conversion}
                  rate={_conversionRate}
                  subRate={`${searchCount} 건`}
                  secondSubRate={`${totalSalesCount} 건`}
                  id='Conversion'
                  tooltipItem={{ text, itemCount }}
                />
                <KeywordAnalysisCard
                  grade={competition}
                  rate={competitionRate}
                  subRate={`${searchCount} 건`}
                  secondSubRate={`${competitionProductCount} 건`}
                  id='Competition'
                  tooltipItem={{ text, itemCount }}
                />
                <KeywordAnalysisCard
                  grade={cpc}
                  rate={`${cpcRate}%`}
                  subRate={`${cpcPrice} 원`}
                  secondSubRate={`${avgPrice} 원`}
                  id='CPC'
                  tooltipItem={{ text, itemCount }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-6'>
        <div className='flex h-[92px] border-[1px] border-grey-300 xs:h-full '>
          <div className='flex pl-3 pr-3 pb-3 pt-3'>
            <ReactSVG
              className='pt-[5px] pl-px'
              src='/assets/icons/filled/ExclamationCircle.14px.svg'
            />
            <div className='pl-[11px]'>
              <h1 className='text-M/Bold text-grey-900'>요약</h1>
              <div className='pt-1'>
                <div className='break-all text-S/Regular text-grey-800'>{top}</div>
                <div className='break-all text-S/Regular text-grey-800'>{bottom}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isUser && (
        <RelativeKeywordTable
          itemCount={itemCount}
          relations={relations}
          _dispatch={_dispatch}
          sorted={analysisInfo!.sorted}
          toggleEvent={_state.toggleEvent}
          country={analysisInfo!.country}
          basePrice={analysisInfo!.basePrice}
          currencyUnit={analysisInfo!.currencyUnit}
          amplitudeData={amplitudeData}
        />
      )}
    </section>
  );
};
