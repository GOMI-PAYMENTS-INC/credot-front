import { REPORT_CONTENTS, REPORT_CONTENT } from '@/preview/constants';
import { useMemo, useState } from 'react';
import { MarketSize } from '@/preview/elements/market/MarketSize';
export const Report = () => {
  const [activeToggle, setActiveToggle] = useState<REPORT_CONTENT>(REPORT_CONTENT.MARKET);
  const activeToggleCss =
    'bg-white font-bold text-orange-400 shadow-[0_0_3px_0_rgba(0,0,0,0.08)]';

  return (
    <section className='mt-[30px] flex flex-col items-center'>
      <ul className='flex w-fit rounded-lg bg-grey-300 p-1 text-center text-L/Medium text-grey-700'>
        {REPORT_CONTENTS.map((content) => {
          return (
            <li
              className={` ${
                activeToggle === content.key && activeToggleCss
              } block cursor-pointer rounded-lg`}
              onClick={() => setActiveToggle(content.key)}
            >
              <p className='mx-3 my-3 flex w-[136px] items-center justify-center gap-1'>
                {content.text}
              </p>
            </li>
          );
        })}
      </ul>
      <div className='w-full'>
        <div className='mt-8 flex justify-between gap-3'>
          <div className='h-fit w-full overflow-hidden rounded-lg border border-grey-300'>
            <MarketSize />
          </div>
          <div className='h-[668px] w-[281px] bg-grey-600' />
        </div>
      </div>
    </section>
  );
};
