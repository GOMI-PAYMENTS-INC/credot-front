import { BlindReport } from '@/pages/report/BlindReport';
import { TReportAction } from '@/containers/report/report.reducer';
import { KeywordInfo } from '@/pages/report/KeywordInfo';
import { MarketSize } from '@/pages/report/MarketSize';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { RecommendationChart } from '@/pages/report/RecommendationChart';
import { SalePrice } from '@/pages/report/SalePrice';
import { AnalysisOverseaProduct } from '@/pages/report/AnalysisOverseaProduct';
import { Fragment } from 'react';

interface IDetailReportSwitchProps {
  isUser: boolean;
  _state: TReportState;
  _dispatch: React.Dispatch<TReportAction>;
  scrollController: React.RefObject<HTMLTableSectionElement>;
  amplitudeData: TAmplitudeDetailData;
}

export const DetailReportSwitch = ({
  isUser,
  _state,
  _dispatch,
  scrollController,
  amplitudeData,
}: IDetailReportSwitchProps) => {
  const { main, relation } = _state;

  if (main === null) return <Fragment></Fragment>;

  if (isUser) {
    return (
      <Fragment>
        <div className='space-y-[72px]'>
          <KeywordInfo
            keywordInfo={main}
            itemCount={_state.salePrice?.data!.itemCount}
            amplitudeData={amplitudeData}
          />
          <MarketSize marketSize={main} itemCount={_state.salePrice?.data!.itemCount} />
          <Fragment>
            <AnalysisKeyword analysisInfo={main} />
            <RecommendationChart
              relation={relation}
              _dispatch={_dispatch}
              spinnerEvent={_state.spinnerEvent}
              toggleEvent={_state.toggleEvent}
              country={main.country}
              basePrice={main.basePrice}
              currencyUnit={main.currencyUnit}
              amplitudeData={amplitudeData}
              isLimit={!isUser}
            />
          </Fragment>
          <SalePrice
            currencyUnit={main.currencyUnit}
            scollerRef={scrollController}
            salePriceInfo={_state.salePrice?.data!}
            list={_state.salePrice.list}
            focus={_state.salePrice.focus}
            _dispatch={_dispatch}
            amplitudeData={amplitudeData}
          />
          <AnalysisOverseaProduct
            currencyUnit={main.currencyUnit}
            basePrice={main.basePrice}
            overseaProduct={_state.oversea}
            amplitudeData={amplitudeData}
          />
        </div>
      </Fragment>
    );
  } else {
    return (
      <BlindReport>
        <KeywordInfo
          keywordInfo={main}
          itemCount={_state.salePrice?.data!.itemCount}
          amplitudeData={amplitudeData}
        />
        <MarketSize marketSize={main} itemCount={_state.salePrice?.data!.itemCount} />
        <Fragment>
          <AnalysisKeyword analysisInfo={main} />
          <RecommendationChart
            relation={relation}
            _dispatch={_dispatch}
            spinnerEvent={_state.spinnerEvent}
            toggleEvent={_state.toggleEvent}
            country={main.country}
            basePrice={main.basePrice}
            currencyUnit={main.currencyUnit}
            amplitudeData={amplitudeData}
            isLimit={!isUser}
          />
        </Fragment>
      </BlindReport>
    );
  }
};
