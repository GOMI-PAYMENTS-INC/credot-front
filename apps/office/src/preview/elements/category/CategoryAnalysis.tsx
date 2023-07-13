import { useMemo } from 'react';
import { setCategoryData } from '@/preview/elements/category/container';
import { CategoryRankChart } from '@/preview/elements/category/CategoryRankChart';
import { CATEGORY_DATA } from '@/preview/elements/category/constant';
import { DetailReportSectionHeader } from '@/preview/elements';
import { REPORT_CONTENT } from '@/preview/constants/reportData';

export const CategoryAnalysis = () => {
  const formatedData = setCategoryData(CATEGORY_DATA);

  const CategoryList = useMemo(
    () =>
      formatedData.map((data, index) => {
        const { category, background, count } = data;
        const firstPlaceCss =
          index === 0
            ? {
                divStyle: 'flex-col',
                place: 'text-XL/Medium',
                square: 'w-[10px] h-[10px]',
                category: 'text-L/Medium text-grey-900 ml-5 mt-[11px] max-w-[600px]',
              }
            : {
                divStyle: 'items-center',
                place: 'text-M/Medium',
                square: 'w-2 h-2',
                category: 'text-M/Medium text-grey-700 max-w-[570px]',
              };
        return (
          <li key={`category_${index}`}>
            <div
              className={`flex ${firstPlaceCss.divStyle}  gap-x-[10px] bg-grey-100 p-2`}
            >
              <div className='flex h-5 items-center justify-start gap-x-1'>
                <div
                  className={firstPlaceCss.square}
                  style={{ background: background }}
                />
                <div className={`${firstPlaceCss.place} text-[#1D2129]`}>
                  {index + 1}위
                </div>
              </div>

              <div>
                <div className={`break-word ${firstPlaceCss.category}`}>
                  {category} ({count}개)
                </div>
              </div>
            </div>
          </li>
        );
      }),
    [],
  );

  return (
    <section className='col-span-full'>
      <DetailReportSectionHeader id={REPORT_CONTENT.CATEGORY} />
      <div className=''>
        <div className='grid grid-cols-10 border-t-[1px] border-grey-300'>
          <div className='border-grey-30 relative col-span-10 flex w-full items-center border-t-[1px] border-b-[1px]  bg-grey-100'>
            <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
              카테고리 등록순
            </h1>
          </div>
          <div className='col-span-3 flex flex-col items-center justify-center'>
            <CategoryRankChart data={formatedData} />
            <div className='pt-[11px] text-center text-2XL/Bold'>
              <p className='text-S/Medium'>Total</p>
              50개
            </div>
          </div>
          <div className='col-span-7 col-start-4 flex h-full flex-col border-l-[1px] border-grey-300'>
            <ul className='space-y-3 p-5'>{CategoryList}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};
