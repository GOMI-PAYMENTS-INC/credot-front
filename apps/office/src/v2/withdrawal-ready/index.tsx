import { Default } from '@/common/layouts';
import { DataTable } from '@/v2/withdrawal-ready/components/DataTable';
import { Filter } from '@/v2/withdrawal-ready/components/Filter';
import { Header } from '@/v2/withdrawal-ready/components/header';
import { TableFilter } from '@/v2/withdrawal-ready/components/TableFilter';

export const WithdrawalReady = () => {
  return (
    <Default useGap>
      <Header />
      <Filter />
      <TableFilter />
      <DataTable />
    </Default>
  );
};
