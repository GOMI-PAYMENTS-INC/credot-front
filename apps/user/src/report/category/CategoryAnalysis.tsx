import { DetailReportSectionHeader } from '@/report/elements';
import { TITLE } from '@/types/enum.code';
import { convertedCategoryAnalysisData } from '@/report/container';
import { CategoryRankChart } from '@/report/category/CategoryRankChart';
import CategoryAnalysisList from '@/report/category/CategoryAnalysisList';

interface ICategoryAnalysis {
  categoryAnalysis: null | TCategoryAnalysis;
  itemCount: number;
}

export const CategoryAnalysis = (props: ICategoryAnalysis) => {
  const { categoryAnalysis, itemCount } = props;

  if (categoryAnalysis === null) return <></>;

  const { frontData, chartData } = convertedCategoryAnalysisData(categoryAnalysis);

  return (
    <section className='col-span-full'>
      <DetailReportSectionHeader id={TITLE.CATEGORY_ANALYSIS} />

      <div className='pt-6'>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='border-grey-30 relative col-span-10 flex w-full items-center border-t-[1px] border-b-[1px]  bg-grey-100'>
            <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
              카테고리 등록순
            </h1>
          </div>
          <div className='col-span-3 flex min-h-[244px] items-center justify-center'>
            <div>
              <div className='relative'>
                <div className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center text-M/Bold'>
                  <p>Total</p>
                  {itemCount}개
                </div>
                <CategoryRankChart data={chartData} />
              </div>
            </div>
          </div>
          <div className='col-span-7 col-start-4 flex h-full flex-col border-l-[1px] border-grey-300'>
            <ul className='space-y-3 p-5'>
              {frontData.map((data) => (
                <CategoryAnalysisList key={data.fullName} data={data} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
