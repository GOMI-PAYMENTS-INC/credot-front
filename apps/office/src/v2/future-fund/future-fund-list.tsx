import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';

import { Default } from '@/common/layouts';
import { FutureFundFilterAtom } from '@/v2/future-fund/atom';
import { DataTable } from '@/v2/future-fund/components/DataTable';
import { Filter } from '@/v2/future-fund/components/Filter';
import { Header } from '@/v2/future-fund/components/header';
import { useFutureFundList } from '@/v2/future-fund/hooks/future-fund.hook';

export const FutureFundList = () => {
  const [filter] = useRecoilState(FutureFundFilterAtom);
  const { dataUpdatedAt, refetch } = useFutureFundList({
    startAt: filter.termRange[0].format('YYYY-MM-DD'),
    endAt: filter.termRange[1].format('YYYY-MM-DD'),
    userId: filter.userId,
  });

  return (
    <Default useGap>
      <Header
        title='미래 정산 내역'
        updateAt={dayjs(dataUpdatedAt).format('YYYY-MM-DD HH:mm:ss')}
        onRefetch={refetch}
      />
      <Filter dataFilterCriteriaLabel={'데이터 생성일'} />
      <DataTable />
    </Default>
  );
};
