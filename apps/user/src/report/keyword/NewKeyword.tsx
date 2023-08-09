import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate } from '@/report/container';
import { openBrowser } from '@/utils/openBrowser';
import { convertEvaluateStatus, convertScoreToText } from '@/report/constants/Score';
import { TITLE } from '@/types/enum.code';
import { MRecommendationChart } from '@/report/keyword/MRecommendationChart';
import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';
import { DetailReportSectionHeader } from '@/report/elements/DetailReportSectionHeader';
import { RecommendationChart } from '@/report/keyword/RecommendationChart';
import { TReportAction } from '@/report/reducer';
import { getConversionRate } from '@/report/keyword/container';
import { KeywordAnalysisCard } from '@/report/keyword/elements';

interface IAnalysisKeyword {
  _state: TReportState;
  _dispatch: React.Dispatch<TReportAction>;
  isUser?: boolean;

  analysisInfo: TRecommendKeyword & {
    totalSalesCount: number;
    sorted: TSortBy;
    text: string;
  };
  relations: TRelationReport[] | null;
  amplitudeData?: TAmplitudeDetailData;
}

export const NewKeyword = (props: IAnalysisKeyword) => {
  const {
    _state,
    _dispatch,
    isUser = true,
    analysisInfo,
    relations,
    amplitudeData,
  } = props;

  const [
    cpcPrice,
    avgPrice,
    searchCount,
    competitionProductCount,
    cpcRate,
    totalSalesCount,
  ] = [
    analysisInfo.cpcPrice,
    analysisInfo.avgPrice,
    analysisInfo.searchCount,
    analysisInfo.competitionProductCount,
    analysisInfo.cpcRate,
    analysisInfo.totalSalesCount,
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
  const conversionRate = analysisInfo.totalSalesCount / analysisInfo.searchCount;

  const keywordReport = useMemo(() => {
    const rateGrade = analysisInfo.evaluateStatus + getConversionRate(conversionRate);
    return rateGrade.split('').map((score) => convertScoreToText(score));
  }, [analysisInfo.evaluateStatus]);
  const [search, competition, cpc, conversion] = keywordReport;

  const { top, bottom } = convertEvaluateStatus(analysisInfo.evaluateStatus);

  return (
    <section>
      <DetailReportSectionHeader id={TITLE.KEYWORD_INFO} />
      <div className='pt-6'>
        <div className='flex flex-col border-t-[2px] border-b-[1px] border-grey-300'>
          <div className=''>
            <div className='keywordInfo-span-subtitle border-b-[1px]'>
              <span>{analysisInfo.text}</span>
            </div>
            <div className='flex items-center bg-grey-50 text-center xs:flex-col'>
              <div className='m-5 flex w-full justify-around gap-10'>
                <KeywordAnalysisCard
                  title='검색량'
                  grade={search}
                  rate={searchCount}
                  rateText='월 검색량'
                />
                <KeywordAnalysisCard
                  title='구매 전환'
                  grade={conversion}
                  rate={formatNumber(conversionRate)}
                  rateText='구매 전환율'
                  subRate={`${searchCount} 건`}
                  subRateText='검색량'
                  secondSubRate={`${totalSalesCount} 건`}
                  secondSubRateText='판매량 합계'
                />
                <KeywordAnalysisCard
                  title='노출 경쟁'
                  grade={competition}
                  rate={analysisInfo.competitionRate}
                  rateText='노출 경쟁률'
                  subRate={`${searchCount} 건`}
                  subRateText='검색량'
                  secondSubRate={`${competitionProductCount} 건`}
                  secondSubRateText='경쟁상품 수'
                />
                <KeywordAnalysisCard
                  title='CPC 비율'
                  grade={cpc}
                  rate={cpcRate}
                  rateText='CPC 비율'
                  subRate={`${cpcPrice} 원`}
                  subRateText='CPC'
                  secondSubRate={`${avgPrice} 원`}
                  secondSubRateText='평균 판매가'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-6 xs:hidden'>
        <div className='bordered flex h-[92px] border-[1px]  border-grey-300 '>
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
      <div className='xs:hidden'>
        {isUser ? (
          <RecommendationChart
            relations={relations}
            _dispatch={_dispatch}
            sorted={analysisInfo!.sorted}
            toggleEvent={_state.toggleEvent}
            country={analysisInfo!.country}
            basePrice={analysisInfo!.basePrice}
            currencyUnit={analysisInfo!.currencyUnit}
            amplitudeData={amplitudeData}
          />
        ) : (
          <RecommendationChart
            relations={null}
            _dispatch={null}
            toggleEvent={[{ id: 168, isOpen: true }]}
            country={null}
            basePrice={968.92}
            sorted={analysisInfo!.sorted}
            currencyUnit={1}
          />
        )}
      </div>
      <div className='hidden xs:block'>
        <MRecommendationChart
          relations={relations}
          _dispatch={_dispatch}
          toggleEvent={_state.toggleEvent}
          country={analysisInfo!.country}
          basePrice={analysisInfo!.basePrice}
          currencyUnit={analysisInfo!.currencyUnit}
          sorted={analysisInfo!.sorted}
          amplitudeData={amplitudeData}
        />
      </div>
    </section>
  );
};
