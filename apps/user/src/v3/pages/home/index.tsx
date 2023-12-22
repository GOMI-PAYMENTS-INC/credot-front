import { HomeFilled } from '@ant-design/icons';

import { Header } from '@/v3/components';
import { ContentLayout, Default } from '@/v3/layouts';
import { PrefundSummary } from '@/v3/pages/home/components/PrefundSummary';
import { PrefundTable } from '@/v3/pages/home/components/PrefundTable';
import { PrefundView } from '@/v3/pages/home/components/PrefundView';
export const Home = () => {
  return (
    <Default>
      <div className='absolute top-0 left-0 z-[-9998] h-screen w-[1150px] bg-white' />
      <div className='absolute top-0 left-0 z-[-9999] h-screen w-screen bg-[#F8EFFF]' />
      <div className='absolute top-0 left-0 z-[-9997] h-[330px] w-screen bg-purple-600' />
      <div className='w-full'>
        <ContentLayout>
          <div className='h-[330px] pt-[63px]'>
            <Header icon={<HomeFilled className='text-white' />} title={'Home'} />
            <PrefundView />
          </div>
          <div className='mt-[40px] flex'>
            <div className='w-full'>
              <div className='text-XL/Bold text-grey-800'>오늘 선정산 현황</div>
              <div className='mt-[14px] w-full'>
                <PrefundTable />
              </div>
            </div>
            <div className='ml-[74px] min-w-[338px]'>
              <PrefundSummary />
            </div>
          </div>
        </ContentLayout>
      </div>
    </Default>
  );
};
