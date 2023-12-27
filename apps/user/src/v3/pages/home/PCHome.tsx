import { HomeFilled } from '@ant-design/icons';

import { Header } from '@/v3/components';
import { ContentLayout } from '@/v3/layouts';
import {
  FutureFundTable,
  PrefundSummary,
  PrefundTable,
  PrefundView,
} from '@/v3/pages/home/components';

export const PCHome = () => {
  return (
    <div className='#FCFCFF'>
      <div className='h-[330px] bg-purple-600 pt-[63px]'>
        <ContentLayout>
          <Header
            icon={
              <div className='h-[30px] w-[30px] rounded-[50%] bg-[#FFD873] text-center leading-[30px]'>
                <HomeFilled className='text-white' />
              </div>
            }
            title={<span className='text-white'>Home</span>}
          />
          <div className='mt-[30px]'>
            <PrefundView />
          </div>
        </ContentLayout>
      </div>

      <ContentLayout>
        <div className='mt-[40px] flex'>
          <div className='w-full'>
            <div className='text-XL/Bold text-grey-800'>오늘 선정산 현황</div>
            <div className='mt-[14px] w-full'>
              <PrefundTable />
            </div>
            <div className='mt-[70px] text-XL/Bold text-grey-800'>오늘 미래정산 현황</div>
            <div className='mt-[14px] mb-[60px] w-full'>
              <FutureFundTable />
            </div>
          </div>
          <div className='ml-[74px] min-w-[338px]'>
            <PrefundSummary />
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
