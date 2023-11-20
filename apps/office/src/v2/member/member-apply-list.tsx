import { Default } from '@/common/layouts';
import { DataTable } from '@/v2/member/components/apply/DataTable';
import { Filter } from '@/v2/member/components/apply/Filter';
import { Header } from '@/v2/member/components/header';

export const MemberApplyList = () => {
  return (
    <div>
      <Default useGap>
        <Header title='서비스 신청 내역' />
        <Filter dataFilterCriteriaLabel={'상태'} />
        <DataTable />
      </Default>
    </div>
  );
};
