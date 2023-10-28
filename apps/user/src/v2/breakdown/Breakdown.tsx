import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import { Default as Layout } from '@/common/layouts';
import { BreakdownLayout } from '@/v2/breakdown/components/BreakdownLayout';
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
      <BreakdownLayout className='mt-[67px]'>
        <TodayPreFundCard />
        <TodayPreFundDetail />
      </BreakdownLayout>
    </Layout>
  );
};

export default Breakdown;
