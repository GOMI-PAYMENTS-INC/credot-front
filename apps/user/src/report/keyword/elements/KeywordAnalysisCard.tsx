import type { ReactNode } from 'react';
import { CallbackToolTip } from '@/report/keyword/elements/Tooltip';
import { cardTextParser } from '@/report/keyword/container';
import UseTooltip from '@/components/UseTooltip';

interface IKeywordAnalysisCard {
  grade: ReactNode;
  rate: string | number;
  subRate?: string;
  secondSubRate?: string;
  id: TToolTipKey;
  tooltipItem: { itemCount: number; text: string };
}
export const KeywordAnalysisCard = (props: IKeywordAnalysisCard) => {
  const {
    grade,
    rate,
    subRate,
    secondSubRate,
    tooltipItem: { itemCount },
    id,
  } = props;

  const { titleTooltip, rateTooltip, subRateTooltip, secondSubRateTooltip } =
    CallbackToolTip(id);
  const { title, rateText, subRateText, secondSubRateText } = cardTextParser(id);
  return (
    <div
      id='keyword_card'
      className='flex w-[205px] flex-col divide-y-[1px] divide-dotted rounded-lg bg-white shadow-[0_2px_6px_0_rgba(0,0,0,0.08)] xs:w-[305px]'
    >
      <div
        id='keyword_condition'
        className='flex h-full flex-col items-center justify-center py-[22px]'
      >
        <div className='flex items-center pb-2.5'>
          <p className='text-S/Bold text-grey-800 xs:text-M/Bold'>{title}</p>
          <UseTooltip content={titleTooltip()} />
        </div>
        {grade}
      </div>

      <div id='keyword_analysis'>
        {subRate ? (
          <>
            <div className='flex h-[96px] items-center justify-center'>
              <div className='mx-6 flex h-[72px] w-[148px] items-center justify-center rounded-[7px] bg-grey-100 xs:w-[273px]'>
                <div className='flex h-12 w-[236px] flex-col items-center justify-center text-center'>
                  <p className='text-XL/Medium text-grey-900'>{rate}</p>
                  <div className='flex items-center pt-1'>
                    <p className='flex items-center text-XS/Medium text-grey-800 xs:text-S/Medium'>
                      {rateText}
                    </p>
                    <UseTooltip content={rateTooltip({ itemCount })} />
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
                <div className='flex items-center pt-2 text-XS/Medium text-grey-800 xs:text-S/Medium'>
                  {subRateText}
                  {subRateTooltip && <UseTooltip content={subRateTooltip()} />}
                </div>
              </div>
              <div className='flex w-1/2 flex-col items-center border-l-[1px]'>
                <div className='flex items-center '>
                  <span className='text-S/Regular text-grey-900 xs:text-L/Regular'>
                    {secondSubRate}
                  </span>
                </div>
                <div className='flex items-center pt-2 text-XS/Medium text-grey-800 xs:text-S/Medium'>
                  {secondSubRateText}
                  {secondSubRateTooltip && (
                    <UseTooltip content={secondSubRateTooltip({ itemCount })} />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex min-h-[170px] items-center justify-center'>
            <div className='mx-6 my-3 flex h-full min-h-[146px] w-[148px] flex-col items-center justify-center rounded-[7px] bg-grey-100 xs:w-[273px]'>
              <p className='text-XL/Medium text-grey-900'>{`${rate}`}</p>
              <div className='flex items-center pt-1'>
                <p className='text-XS/Medium text-grey-800 xs:text-S/Medium '>
                  {rateText}
                </p>
                <UseTooltip content={rateTooltip({ itemCount })} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
