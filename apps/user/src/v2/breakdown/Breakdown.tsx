import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useSetRecoilState } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import { Default as Layout } from '@/common/layouts';
import { BreakdownLayout } from '@/v2/breakdown/components/BreakdownLayout';
import { MPeriodPreFund } from '@/v2/breakdown/components/MPeriodPreFund';
import { MPreFundHistory } from '@/v2/breakdown/components/MPreFundHistory';
import { MTodayPreFundCard } from '@/v2/breakdown/components/MTodayPreFundCard';
import { MTodayPreFundDetail } from '@/v2/breakdown/components/MTodayPreFundDetail';
import { PeriodPreFund } from '@/v2/breakdown/components/PeriodPreFund';
import { PreFundHistory } from '@/v2/breakdown/components/PreFundHistory';
import { Title } from '@/v2/breakdown/components/Title';
import { TodayPreFundCard } from '@/v2/breakdown/components/TodayPreFundCard';
import { TodayPreFundDetail } from '@/v2/breakdown/components/TodayPreFundDetail';

const Breakdown = () => {
  const setSideBarVisibility = useSetRecoilState(SideBarVisibility);

  useEffect(() => {
    setSideBarVisibility(false);
  }, []);

  return (
    <Layout useGap={true}>
      {isMobile ? null : <Title />}
      <BreakdownLayout className='py-[67px]'>
        {isMobile ? <MTodayPreFundCard /> : <TodayPreFundCard />}
        {isMobile ? <MTodayPreFundDetail /> : <TodayPreFundDetail />}
        {isMobile ? <MPeriodPreFund /> : <PeriodPreFund />}
        {isMobile ? <MPreFundHistory /> : <PreFundHistory />}
      </BreakdownLayout>
    </Layout>
  );
};

export default Breakdown;
