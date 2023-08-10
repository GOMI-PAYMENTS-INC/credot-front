import type { ReactNode } from 'react';

interface IKeywordAnalysisCard {
  grade: ReactNode;
  rate: string | number;
  title: string;
  rateText: string;
  subRate?: string;
  subRateText?: string;
  secondSubRate?: string;
  secondSubRateText?: string;
}
export const KeywordAnalysisCard = (props: IKeywordAnalysisCard) => {
  const {
    grade,
    rate,
    rateText,
    subRate,
    secondSubRate,
    title,
    subRateText,
    secondSubRateText,
  } = props;

  return (
    <div
      id='keyword_card'
      className='flex w-[205px] flex-col divide-y-[1px] divide-dotted rounded-lg bg-white shadow-[0_2px_6px_0_rgba(0,0,0,0.08)] xs:w-[305px]'
    >
      <div
        id='keyword_condition'
        className='flex h-full flex-col items-center justify-center py-[22px]'
      >
        <p className='pb-2.5 text-S/Bold text-grey-800 xs:text-M/Bold'>{title}</p>
        {grade}
      </div>

      <div id='keyword_analysis'>
        {subRate ? (
          <>
            <div className='flex h-[96px] items-center justify-center'>
              <div className='mx-6 flex h-[72px] w-[148px] items-center justify-center rounded-[7px] bg-grey-100 xs:w-[273px]'>
                <div className='flex h-12 w-[236px] flex-col items-center justify-center text-center'>
                  <p className='text-XL/Medium text-grey-900'>{`1 : ${rate}`}</p>
                  <div className='pt-1'>
                    <p className='text-XS/Medium text-grey-800 xs:text-S/Medium '>
                      {rateText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex h-[72px] items-center border-t-[1px] border-dashed xs:h-[96px]'>
              <div className='flex w-1/2 flex-col items-center'>
                <div className='flex items-center '>
                  <span className='text-S/Regular text-grey-900 xs:text-L/Regular'>
                    {subRate}
                  </span>
                </div>
                <div className='pt-2 text-XS/Medium text-grey-800 xs:text-S/Medium'>
                  {subRateText}
                </div>
              </div>
              <div className='flex w-1/2 flex-col items-center border-l-[1px]'>
                <div className='flex items-center '>
                  <span className='text-S/Regular text-grey-900 xs:text-L/Regular'>
                    {secondSubRate}
                  </span>
                </div>
                <div className='pt-2 text-XS/Medium text-grey-800 xs:text-S/Medium'>
                  {secondSubRateText}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex min-h-[170px] items-center justify-center'>
            <div className='mx-6 my-3 flex h-full min-h-[146px] w-[148px] flex-col items-center justify-center rounded-[7px] bg-grey-100 xs:w-[273px]'>
              <p className='text-XL/Medium text-grey-900'>{`${rate}`}</p>
              <div className='pt-1'>
                <p className='text-XS/Medium text-grey-800 xs:text-S/Medium '>
                  {rateText}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
