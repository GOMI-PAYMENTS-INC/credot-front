import { Button, Modal } from 'antd';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';

import { Default } from '@/common/layouts';
import { PrefundStatusEnum } from '@/generated-rest/api/front';
import { usePrefundList } from '@/hooks/prefund.hook';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { DataTable } from '@/v2/prefund/components/DataTable';
import { Filter } from '@/v2/prefund/components/Filter';
import { Header } from '@/v2/prefund/components/header';

export const WithdrawalDone = () => {
  const [filter] = useRecoilState(PrefundFilterAtom);
  const { dataUpdatedAt, isLoading, refetch } = usePrefundList({
    status: PrefundStatusEnum.DEPOSIT_DONE,
    startAt: filter.termRange[0].format('YYYY-MM-DD'),
    endAt: filter.termRange[1].format('YYYY-MM-DD'),
    userId: filter.userId,
  });

  return (
    <Default useGap>
      <Header
        title='정산금 회수하기'
        updateAt={dayjs(dataUpdatedAt).format('YYYY-MM-DD HH:mm:ss')}
      />
      <Filter dateRangeOn={false} dataFilterCriteriaLabel={undefined} />
      <DataTable
        status={PrefundStatusEnum.DEPOSIT_DONE}
        actions={(onUpdate: (status: PrefundStatusEnum) => void) => (
          <Button
            type='primary'
            onClick={() =>
              Modal.confirm({
                title: '회수 완료',
                content: '선택 건을 회수 완료로 처리하시겠습니까?',
                onOk: () => onUpdate(PrefundStatusEnum.DONE),
                okText: '회수 완료',
                cancelText: '취소',
              })
            }
          >
            회수 완료
          </Button>
        )}
      />
    </Default>
  );
};
