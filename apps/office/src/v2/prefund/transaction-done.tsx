import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';

import { Default } from '@/common/layouts';
import { PrefundStatusEnum } from '@/generated-rest/api/front';
import { usePrefundList } from '@/hooks/prefund.hook';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { DataTable } from '@/v2/prefund/components/DataTable';
import { Filter } from '@/v2/prefund/components/Filter';
import { Header } from '@/v2/prefund/components/header';

export const TransactionDone = () => {
  const [filter] = useRecoilState(PrefundFilterAtom);
  const { dataUpdatedAt, isLoading, refetch } = usePrefundList({
    status: PrefundStatusEnum.DONE,
    startAt: filter.termRange[0].format('YYYY-MM-DD'),
    endAt: filter.termRange[1].format('YYYY-MM-DD'),
    userId: filter.userId,
  });

  return (
    <Default useGap>
      <Header
        title='거래 완료'
        updateAt={dayjs(dataUpdatedAt).format('YYYY-MM-DD HH:mm:ss')}
        onRefetch={refetch}
      />
      <Filter dataFilterCriteriaLabel={'카드사 정산일'} />
      <DataTable status={PrefundStatusEnum.DONE} />
    </Default>
  );
};
