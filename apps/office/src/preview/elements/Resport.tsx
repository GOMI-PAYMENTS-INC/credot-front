import { MarketSize } from '@/preview/elements/market/MarketSize';
import { AnalysisKeyword } from '@/preview/elements/keyword/AnalysisKeyword';
import { Dictionary } from '@/preview/elements/Dictionary';
import { REPORT_CONTENT } from '@/preview/constants/reportData';
import { CategoryAnalysis } from '@/preview/elements/category/CategoryAnalysis';
interface IReport {
  toggle: REPORT_CONTENT;
}
export const Report = ({ toggle }: IReport) => {
  const Content = () => {
    switch (toggle) {
      case REPORT_CONTENT.MARKET:
        return <MarketSize />;
      case REPORT_CONTENT.KEYWORD:
        return <AnalysisKeyword />;
      case REPORT_CONTENT.CATEGORY:
        return <CategoryAnalysis />;
      default:
        return <></>;
    }
  };
  return (
    <section>
      <div className='mt-[30px]'>
        <div className='w-full'>
          <div className='mt-8 flex items-start justify-around  gap-3'>
            <div className='h-fit w-full overflow-visible rounded-lg border border-grey-300'>
              <div className='my-[34px] mx-[44px]'>{Content()}</div>
            </div>
            <Dictionary toggle={toggle} />
          </div>
        </div>
      </div>
    </section>
  );
};

//flex flex-col items-center
