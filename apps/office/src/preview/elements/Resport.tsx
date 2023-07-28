import { MarketSize } from '@/preview/elements/market/MarketSize';
import { AnalysisKeyword } from '@/preview/elements/keyword/AnalysisKeyword';
import { Dictionary } from '@/preview/elements/Dictionary';
import { CategoryAnalysis } from '@/preview/elements/category/CategoryAnalysis';
import { BrandAnalysis } from '@/preview/elements/brand/BrandAnalysis';
import { SalePrice } from '@/preview/elements/price/SalePrice';
import { AnalysisOverseaProduct } from '@/preview/elements/oversea/AnalysisOverseaProduct';
import { REPORT_CONTENT } from '@/preview/constants/reportData';

import { Fragment, useMemo, useEffect, type Dispatch, type SetStateAction } from 'react';
import { onScrollDetail } from '@/preview/container';

interface IReport {
  scrollEvent: TScrollEvent;
  setScrollEvent: Dispatch<SetStateAction<TScrollEvent>>;
}
export const Report = (props: IReport) => {
  const { scrollEvent, setScrollEvent } = props;

  const { scrollY, current } = scrollEvent;

  useEffect(() => {
    onScrollDetail(scrollEvent, setScrollEvent);
  }, [scrollY]);

  const ReportComponents = useMemo(
    () => (
      <Fragment>
        <MarketSize />
        <AnalysisKeyword />
        <BrandAnalysis />
        <SalePrice />
        <AnalysisOverseaProduct />
        <CategoryAnalysis />
      </Fragment>
    ),
    [],
  );

  return (
    <section>
      <div className='mt-[30px]'>
        <div className='w-full'>
          <div className='mt-8 flex items-start justify-around  gap-3'>
            <div className='h-fit w-full overflow-visible rounded-lg border border-grey-300 xs:border-0'>
              <div className='mx-[44px] space-y-[72px] xs:mx-0'>{ReportComponents}</div>
            </div>
            <Dictionary current={current as REPORT_CONTENT} />
          </div>
        </div>
      </div>
    </section>
  );
};

//flex flex-col items-center
