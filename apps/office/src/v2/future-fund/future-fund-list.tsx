import { Default } from '@/common/layouts';
import { DataTable } from '@/v2/future-fund/components/DataTable';
import { Filter } from '@/v2/future-fund/components/Filter';
import { Header } from '@/v2/future-fund/components/header';

export const FutureFundList = () => {
  return (
    <Default useGap>
      <Header title='미래 정산 내역' />
      <Filter dataFilterCriteriaLabel={'데이터 생성일'} />
      <DataTable />
    </Default>
  );
};
