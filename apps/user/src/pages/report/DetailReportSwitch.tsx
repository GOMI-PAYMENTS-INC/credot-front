import {TReportAction} from '@/containers/report/report.reducer';
import {KeywordInfo} from '@/pages/report/KeywordInfo';
import {MarketSize} from '@/pages/report/MarketSize';
import {AnalysisKeyword} from '@/pages/report/AnalysisKeyword';
import {SalePrice} from '@/pages/report/SalePrice';
import {AnalysisOverseaProduct} from '@/pages/report/AnalysisOverseaProduct';
import {Fragment} from 'react';
import {Params} from 'react-router-dom';
import {BlindReportDetail} from '@/pages/report/BlindReportDetail';
import BrandAnalysis from '@/pages/report/BrandAnalysis';
import CategoryAnalysis from "@/pages/report/CategoryAnalysis";

interface IDetailReportSwitchProps {
  isUser: boolean;
  _state: TReportState;
  _dispatch: React.Dispatch<TReportAction>;
  params: Params<string>;
}

export const DetailReportSwitch = ({
  isUser,
  _state,
  _dispatch,
  params,
}: IDetailReportSwitchProps) => {
  const { main,oversea, salePrice, relation, brand,category } = _state;

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
              _dispatch={_dispatch}
              keywordInfo={main!}
              amplitudeData={amplitudeData}
            />
            <MarketSize marketSize={main!} />
            <AnalysisKeyword
              _dispatch={_dispatch}
              _state={_state}
              isUser={isUser}
              analysisInfo={main!}
              relations={relation.relations}
              amplitudeData={amplitudeData}
            />

            {isUser && (
              <Fragment>
                <BrandAnalysis
                  _dispatch={_dispatch}
                  basePrice={main!.basePrice}
                  currencyUnit={main!.currencyUnit}
                  brandAnalysis={brand}
                  forceBrandIndex={brand.focus}
                  amplitudeData={amplitudeData}
                />
                <SalePrice
                  _dispatch={_dispatch}
                  currencyUnit={main!.currencyUnit}
                  salePriceInfo={salePrice?.data!}
                  list={salePrice.list}
                  focus={salePrice.focus}
                  amplitudeData={amplitudeData}
                />
                <AnalysisOverseaProduct
                  currencyUnit={main!.currencyUnit}
                  basePrice={main!.basePrice}
                  overseaProduct={oversea}
                  amplitudeData={amplitudeData}
                />
                <CategoryAnalysis categoryAnalysis={category}/>
              </Fragment>
            )}
          </Fragment>
        </BlindReportDetail>
      </div>
    </div>
  );
};
