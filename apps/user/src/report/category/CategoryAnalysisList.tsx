import { useMemo } from 'react';

interface ICategoryAnalysisList {
  data: TCategoryAnalysisFrontResult;
}

export const CategoryAnalysisList = ({ data }: ICategoryAnalysisList) => {
  const chartColorStyle = useMemo(() => {
    return {
      backgroundColor: data.color,
    };
  }, [data.color]);

  return (
    <li>
      <div className='flex gap-x-[11px] bg-grey-100 p-2'>
        <div className='flex h-5 items-center justify-center gap-x-1'>
          <div className='h-2 w-2' style={chartColorStyle}></div>
          <div className='text-S/Medium text-[#1D2129]'>{data.rank}위</div>
        </div>

        <div>
          <div className='text-L/Medium text-grey-900'>
            {data.shortName} ({data.productCount}개)
          </div>
          <div className='mt-0.5 text-XS/Medium text-grey-700'>{data.fullName}</div>
        </div>
      </div>
    </li>
  );
};
