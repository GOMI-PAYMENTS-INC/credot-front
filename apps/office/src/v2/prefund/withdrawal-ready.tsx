import { Button, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Default } from '@/common/layouts';
import { PrefundStatusEnum } from '@/generated-rest/api/front';
import { OpenAPI } from '@/generated-rest/api/front/core/OpenAPI';
import { request as __request } from '@/generated-rest/api/front/core/request';
import { usePrefundList } from '@/hooks/prefund.hook';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { DataTable } from '@/v2/prefund/components/DataTable';
import { getWithdrawalReadyDataTableColumns } from '@/v2/prefund/components/DataTableColumns';
import { Filter } from '@/v2/prefund/components/Filter';
import { Header } from '@/v2/prefund/components/header';
import { SummaryPreFundCard } from '@/v2/prefund/components/SummaryPreFundCard';
import { UserInfoSection } from '@/v2/prefund/components/UserInfoSection';

export const WithdrawalReady = () => {
  const [filter, setFilter] = useRecoilState(PrefundFilterAtom);
  const { dataUpdatedAt, refetch } = usePrefundList({
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
        title='선정산 지급하기'
        updateAt={dayjs(dataUpdatedAt).format('YYYY-MM-DD HH:mm:ss')}
      >
        <Button
          onClick={() =>
            Modal.confirm({
              title: '선정산 요청',
              content: '선정산 내역을 다시 요청하시겠습니까?',
              okText: '요청하기',
              cancelText: '닫기',
              onOk: async () => {
                await __request(OpenAPI, {
                  method: 'GET',
                  url: '/request/daily/prefund',
                  query: {
                    target: filter.termRange[0].format('YYYY-MM-DD'),
                  },
                })
                  .then(() => {
                    message.success('성공적으로 선정산을 요청했어요.');
                    refetch();
                  })
                  .catch((err) => {
                    console.log(err);
                    message.error('선정산을 실패했어요.');
                  });
              },
            })
          }
        >
          선정산 요청
        </Button>
      </Header>
      <Filter dateRangeOn={false} dataFilterCriteriaLabel={undefined} />
      {filter.userId && (
        <>
          <UserInfoSection />
        </>
      )}
      <SummaryPreFundCard />
      <DataTable
        status={PrefundStatusEnum.READY}
        columns={getWithdrawalReadyDataTableColumns()}
        actions={(onUpdate: (status: PrefundStatusEnum) => void) => (
          <Button
            type='primary'
            onClick={() =>
              Modal.confirm({
                title: '지급 완료',
                content: '선택 건을 지급 완료로 처리하시겠습니까?',
                onOk: () => onUpdate(PrefundStatusEnum.DEPOSIT_DONE),
                okText: '지급 완료',
                cancelText: '취소',
              })
            }
          >
            지급 완료
          </Button>
        )}
      />
    </Default>
  );
};
