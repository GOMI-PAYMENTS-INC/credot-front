import React from 'react';
import DetailReportSectionHeader from '@/pages/report/DetailReportSectionHeader';
import { TITLE } from '@/types/enum.code';
import { convertedCategoryAnalysisData } from '@/containers/report';
import { CategoryRankChart } from '@/pages/report/CategoryRankChart';
import CategoryAnalysisList from '@/pages/report/CategoryAnalysisList';

interface ICategoryAnalysis {
  categoryAnalysis: null | TCategoryAnalysis;
}

const CategoryAnalysis = (props: ICategoryAnalysis) => {
  const { categoryAnalysis } = props;

  if (categoryAnalysis === null) {
    return <></>;
  }
  const { frontData, chartData, etcProductCount } =
    convertedCategoryAnalysisData(categoryAnalysis);

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
              <CategoryRankChart data={chartData} />
            </div>
          </div>
          <div className='col-span-7 col-start-4 flex h-full flex-col border-l-[1px] border-grey-300'>
            <ul className='space-y-3 p-5'>
              {frontData.map((data) => (
                <CategoryAnalysisList data={data} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CategoryAnalysis;
