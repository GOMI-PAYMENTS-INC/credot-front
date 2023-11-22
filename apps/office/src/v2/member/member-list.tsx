import { Default } from '@/common/layouts';
import { Header } from '@/v2/member/components/header';
import { DataTable } from '@/v2/member/components/list/DataTable';
import { Filter } from '@/v2/member/components/list/Filter';

export const MemberList = () => {
  return (
    <div>
      <Default useGap>
        <Header title='회원 조회' />
        <Filter />
        <DataTable />
      </Default>
    </div>
  );
};
