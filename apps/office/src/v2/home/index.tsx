import { Default } from '@/common/layouts';
import { FutureFundMatrix } from '@/v2/home/components/FutureFundMatrix';
import { MoneyInOut } from '@/v2/home/components/MoneyInOut';
import { PrefundMatrix } from '@/v2/home/components/PrefundMatrix';
import { Report } from '@/v2/home/components/Report';
import { TodayWork } from '@/v2/home/components/TodayWork';

export const Home = () => {
  return (
    <Default useGap>
      <div className='mx-auto w-[1280px] px-[40px]'>
        <TodayWork />
        <MoneyInOut />
        <Report />
        <div className='mt-[70px] flex gap-x-12'>
          <PrefundMatrix />
          <FutureFundMatrix />
        </div>
      </div>
    </Default>
  );
};
