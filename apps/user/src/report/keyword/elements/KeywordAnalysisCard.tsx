import { useMemo } from 'react';
import { Card } from '@/report/keyword/elements/Card';
import { convertScoreToText } from '@/report/constants/Score';
import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate } from '@/report/container';
import { getConversionRate } from '@/report/keyword/container';

interface IKeywordAnalysisCard {
  analysisInfo:
    | (TRecommendKeyword & {
        totalSalesCount: number;
        sorted: TSortBy;
        text: string;
        itemCount: number;
      })
    | TRelationReport;
}
export const KeywordAnalysisCard = (props: IKeywordAnalysisCard) => {
  const { analysisInfo } = props;
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

  return (
    <div className='flex items-center bg-grey-50 text-center'>
      <div className='m-5 flex w-full justify-around gap-10 xs:flex-col xs:items-center'>
        <Card
          grade={search}
          rate={searchCount}
          id='Search'
          tooltipItem={{ text, itemCount }}
        />
        {analysisInfo.totalSalesCount && (
          <Card
            grade={conversion}
            rate={`${_conversionRate} 회`}
            subRate={`${searchCount} 건`}
            secondSubRate={`${totalSalesCount} 건`}
            id='Conversion'
            tooltipItem={{ text, itemCount }}
          />
        )}
        <Card
          grade={competition}
          rate={`1 : ${competitionRate}`}
          subRate={`${searchCount} 건`}
          secondSubRate={`${competitionProductCount} 건`}
          id='Competition'
          tooltipItem={{ text, itemCount }}
        />
        <Card
          grade={cpc}
          rate={`${cpcRate}%`}
          subRate={`${cpcPrice} 원`}
          secondSubRate={`${avgPrice} 원`}
          id='CPC'
          tooltipItem={{ text, itemCount }}
        />
      </div>
    </div>
  );
};
