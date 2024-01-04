import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Default } from '@/common/layouts';
import { PrefundStatusEnum } from '@/generated-rest/api/front';
import { usePrefundList } from '@/hooks/prefund.hook';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { DataTable } from '@/v2/prefund/components/DataTable';
import { Filter } from '@/v2/prefund/components/Filter';
import { Header } from '@/v2/prefund/components/header';
import { SummaryPreFundCard } from '@/v2/prefund/components/SummaryPreFundCard';
import { UserInfoSection } from '@/v2/prefund/components/UserInfoSection';

export const WithdrawalReady = () => {
  const [filter, setFilter] = useRecoilState(PrefundFilterAtom);
  const { dataUpdatedAt } = usePrefundList({
    status: PrefundStatusEnum.READY,
    startAt: filter.termRange[0].format('YYYY-MM-DD'),
    endAt: filter.termRange[1].format('YYYY-MM-DD'),
    userId: filter.userId,
  });

  useEffect(() => {
    setFilter({
      term: 'today',
      termRange: [dayjs(), dayjs()],
      userId: null,
    });
  }, []);

  return (
    <Default useGap>
      <Header
        title='출금 준비'
        updateAt={dayjs(dataUpdatedAt).format('YYYY-MM-DD HH:mm:ss')}
      />
      <Filter dateRangeOn={false} dataFilterCriteriaLabel={'데이터 생성일'} />
      <UserInfoSection />
      <SummaryPreFundCard />
      <DataTable status={PrefundStatusEnum.READY} />
    </Default>
  );
};
