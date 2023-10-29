import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import { Default as Layout } from '@/common/layouts';
import { BreakdownLayout } from '@/v2/breakdown/components/BreakdownLayout';
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
      <Title />
      <BreakdownLayout className='py-[67px]'>
        <TodayPreFundCard />
        <TodayPreFundDetail />
        <PeriodPreFund />
        <PreFundHistory />
      </BreakdownLayout>
    </Layout>
  );
};

export default Breakdown;
