import { TReportAction } from '@/report/reducer';
import { KeywordInfo } from '@/report/keyword/KeywordInfo';
import { MarketSize } from '@/report/market/MarketSize';
import { AnalysisKeyword } from '@/report/keyword/AnalysisKeyword';
import { SalePrice } from '@/report/price/SalePrice';
import { AnalysisOverseaProduct } from '@/report/oversea/AnalysisOverseaProduct';
import { Fragment } from 'react';
import { Params } from 'react-router-dom';

import { BrandAnalysis } from '@/report/brand/BrandAnalysis';
import { CategoryAnalysis } from '@/report/category/CategoryAnalysis';
import { authReturnUrl } from '@/auth/container';
import { PATH } from '@/types/enum.code';

import { useRecoilValue } from 'recoil';
import { HackleAtom } from '@/atom/common/hackle.atom';

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
  const { main, oversea, salePrice, relation, brand, category } = _state;
  const hackleState = useRecoilValue(HackleAtom);

  const amplitudeData: TAmplitudeDetailData = {
    param: params.id ? params.id : '',
    keyword: main!.text,
  };
  const { saveReturnUrl } = authReturnUrl();

  return (
    <div className={`col-span-10 mt-[42px] xs:col-span-12 xs:mt-0`}>
      <div className='space-y-[72px] xs:space-y-5 xs:p-5'>
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

        {isUser ? (
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
              itemCount={main!.itemCount}
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
            <CategoryAnalysis itemCount={main!.itemCount} categoryAnalysis={category} />
          </Fragment>
        ) : (
          <Fragment>
            <div>
              <div className='relative'>
                <div
                  className='from-10% via-30% to-70% absolute top-[-300px]
            block h-[300px] w-full bg-gradient-to-t from-white via-white to-transparent'
                ></div>
              </div>
            </div>
            <div className='!- relative text-center'>
              <div>
                <p className='text-XL/Medium'>리포트의 다음 내용이 궁금하신가요?</p>
                <p className='mt-[9px] text-XL/Bold'>
                  1분 회원가입 후 모든 내용을 확인하세요!
                </p>
              </div>
              <div className='mt-[44px]'>
                <button
                  className='button-filled-normal-xLarge-red-false-false-true min-w-[600px] xs:my-[10px] xs:min-w-0 xs:rounded-lg xs:px-[15px]'
                  onClick={() => saveReturnUrl(window.location.href, PATH.SIGN_IN)}
                >
                  회원가입 하고 리포트 전체 내용 열람하기
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
