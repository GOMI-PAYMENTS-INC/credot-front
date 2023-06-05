import { TReportAction } from '@/containers/report/report.reducer';
import { KeywordInfo } from '@/pages/report/KeywordInfo';
import { MarketSize } from '@/pages/report/MarketSize';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { RecommendationChart } from '@/pages/report/RecommendationChart';
import { SalePrice } from '@/pages/report/SalePrice';
import { AnalysisOverseaProduct } from '@/pages/report/AnalysisOverseaProduct';
import { Fragment } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { Params } from 'react-router-dom';
import { BlindReportDetail } from '@/pages/report/BlindReportDetail';

interface IDetailReportSwitchProps {
  isUser: boolean;
  _state: TReportState;
  _dispatch: React.Dispatch<TReportAction>;
  scrollController: React.RefObject<HTMLTableSectionElement>;
  params: Params<string>;
}

export const DetailReportSwitch = ({
  isUser,
  _state,
  _dispatch,
  scrollController,
  params,
}: IDetailReportSwitchProps) => {
  const { main, relation } = _state;

  const amplitudeData: TAmplitudeDetailData = {
    param: params.id ? params.id : '',
    keyword: main!.text,
  };

  return (
    <div className='col-span-10'>
      <div className='space-y-[72px]'>
        <BlindReportDetail isUser={isUser}>
          <Fragment>
            <KeywordInfo
              keywordInfo={main!}
              itemCount={_state.salePrice?.data!.itemCount}
              amplitudeData={amplitudeData}
            />
            <MarketSize
              marketSize={main!}
              itemCount={_state.salePrice?.data!.itemCount}
            />
            <AnalysisKeyword analysisInfo={main!} />
            <RecommendationChart
              relation={relation}
              _dispatch={_dispatch}
              spinnerEvent={_state.spinnerEvent}
              toggleEvent={_state.toggleEvent}
              country={main!.country}
              basePrice={main!.basePrice}
              currencyUnit={main!.currencyUnit}
              amplitudeData={amplitudeData}
              isLimit={!isUser}
            />
            {isFalsy(isUser) === false && (
              <Fragment>
                <SalePrice
                  currencyUnit={main!.currencyUnit}
                  scollerRef={scrollController}
                  salePriceInfo={_state.salePrice?.data!}
                  list={_state.salePrice.list}
                  focus={_state.salePrice.focus}
                  _dispatch={_dispatch}
                  amplitudeData={amplitudeData}
                />
                <AnalysisOverseaProduct
                  currencyUnit={main!.currencyUnit}
                  basePrice={main!.basePrice}
                  overseaProduct={_state.oversea}
                  amplitudeData={amplitudeData}
                />
              </Fragment>
            )}
          </Fragment>
        </BlindReportDetail>
      </div>
    </div>
  );
};
