import { useRecoilState } from 'recoil';

import { Default } from '@/common/layouts';
import { FutureFundFilterAtom } from '@/v2/future-fund/atom';
import { DataTable } from '@/v2/future-fund/components/DataTable';
import { Filter } from '@/v2/future-fund/components/Filter';
import { Header } from '@/v2/future-fund/components/header';
import { UserInfoSection } from '@/v2/future-fund/components/UserInfoSection';

export const FutureFundList = () => {
  const [filter] = useRecoilState(FutureFundFilterAtom);

  return (
    <Default useGap>
      <Header title='미래 정산 내역' />
      <Filter dataFilterCriteriaLabel={'데이터 생성일'} />
      {filter.userId && <UserInfoSection />}
      <DataTable />
    </Default>
  );
};
