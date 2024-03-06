import { HomeFilled } from '@ant-design/icons';

import { Header } from '@/v3/components';
import { ContentLayout } from '@/v3/layouts';
import {
  FutureFundChart,
  PrefundSummary,
  PrefundTable,
  PrefundView,
} from '@/v3/pages/home/components';

export const PCHome = () => {
  return (
    <div className='bg-[#FCFCFF]'>
      <div
        className='bg-color h-[330px] bg-purple-600 bg-no-repeat pt-[63px]'
        style={{
          backgroundImage:
            'url("https://kr-settlement.s3.ap-northeast-2.amazonaws.com/production/home-bg.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
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
        <div className='mt-[40px]'>
          <div className='mb-[80px] flex w-full'>
            <div className='mr-[40px]'>
              <div className='text-XL/Bold text-[#262626]'>미래정산 신청가능 금액</div>
              <div className='mt-[14px] w-full'>
                <FutureFundChart />
              </div>
            </div>
            <div className='w-full'>
              <div className='text-XL/Bold text-[#262626]'>오늘 입금 내역</div>
              <div className='mt-[14px] w-full'>
                <PrefundSummary />
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className='text-XL/Bold text-[#262626]'>오늘 카드사별 선정산 내역</div>
            <div className='mt-[14px] w-full'>
              <PrefundTable />
            </div>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
