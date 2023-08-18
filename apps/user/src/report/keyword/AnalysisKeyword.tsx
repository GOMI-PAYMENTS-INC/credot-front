import { ReactSVG } from 'react-svg';

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
  const { top, bottom } = convertEvaluateStatus(analysisInfo.evaluateStatus);

  return (
    <section>
      <DetailReportSectionHeader id={TITLE.KEYWORD_INFO} />
      <div className='pt-6'>
        <div className='flex flex-col border-t-[2px] border-b-[1px] border-grey-300'>
          <div className=''>
            <div className='keywordInfo-span-subtitle border-b-[1px] text-M/Medium xs:text-L/Bold'>
              <span>{analysisInfo.text}</span>
            </div>
            <KeywordAnalysisCard analysisInfo={analysisInfo} />
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
          itemCount={analysisInfo.itemCount}
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
