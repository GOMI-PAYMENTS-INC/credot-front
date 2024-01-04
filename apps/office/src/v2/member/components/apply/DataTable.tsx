import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { ApplyStatusEnum } from '@/generated-rest/api/front';
import { MemberApplyFilterAtom } from '@/v2/member/atom';
import { getDataTableColumns } from '@/v2/member/components/apply/DataTableColumns';
import { TableFilter } from '@/v2/member/components/apply/TableFilter';
import { useApplyList, useUpdateApplyStatus } from '@/v2/member/hooks/apply.hook';

const Wrapper = styled.div`
  .ant-table-thead .ant-table-cell,
  .ant-table-row .ant-table-cell {
    height: 40px;
    padding: 10px 16px;
  }

  .ant-table-thead > tr > th {
    text-align: center;
  }
`;

export type ApplyRecord = {
  id: number;
  key: number;
  createdAt: string;
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  status: string;
  companyType: string;
  industryType: string;
  address: string;
  monthlySales: string;
  jobTitle: string;
  interestedService: string;
  marketingAgree: boolean;
};

export const DataTable = () => {
  const [filter] = useRecoilState(MemberApplyFilterAtom);
  const [selectedRows, setSelectedRows] = useState<ApplyRecord[]>([]);
  const listColumn: ColumnsType<ApplyRecord> = getDataTableColumns();
  const { mutateAsync: updateApplyStatus } = useUpdateApplyStatus();
  const { refetch, data, isLoading } = useApplyList({
    status: filter.status,
    userId: filter.userId,
  });

  /*** 선정산 상태 변경 ***/
  const handleUpdateStatus = async (updateStatus: ApplyStatusEnum) => {
    const applyIds = selectedRows.map((i) => i.id);
    if (!applyIds.length) {
      toast.error('변경할 신청 내역을 선택해주세요.');
      return;
    }

    await updateApplyStatus({
      status: updateStatus,
      applyIds,
    });
    await refetch();
  };

  return (
    <>
      <TableFilter onUpdate={handleUpdateStatus} />
      <div className='mx-auto w-[1280px]'>
        <Wrapper className='gm-h-full mt-[10px]'>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: '#F5F5F5',
                  headerColor: '#595959',
                  headerBorderRadius: 0,
                  colorText: '#595959',
                },
              },
            }}
          >
            <Table
              loading={isLoading}
              columns={listColumn}
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys: React.Key[], selectedRows: ApplyRecord[]) => {
                  setSelectedRows(selectedRows);
                },
              }}
              dataSource={(data || []).map((item) => ({
                ...item,
                key: item.id,
              }))}
              scroll={{ x: 'max-content' }}
              pagination={false}
              bordered
            ></Table>
          </ConfigProvider>
        </Wrapper>
      </div>
    </>
  );
};
