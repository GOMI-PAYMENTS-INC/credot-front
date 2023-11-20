import { Default } from '@/common/layouts';
import { PrefundStatusEnum } from '@/generated-rest/api/front';
import { DataTable } from '@/v2/member/components/DataTable';
import { Filter } from '@/v2/member/components/Filter';
import { Header } from '@/v2/member/components/header';

export const MemberApplyList = () => {
  return (
    <div>
      <Default useGap>
        <Header title='서비스 신청 내역' />
        <Filter dataFilterCriteriaLabel={'상태'} />
        <DataTable status={PrefundStatusEnum.DONE} />
      </Default>
    </div>
  );
};
