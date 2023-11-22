import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useGetFiles } from '@/hooks/upload.hook';
import { useUserListHook } from '@/hooks/user.hook';
import { MemberListFilterType } from '@/v2/member/atom';
import { getDataTableColumns } from '@/v2/member/components/list/DataTableColumns';

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

export type MemberRecord = {
  id: number;
  key: number;
  createdAt: string;
  name: string;
  managerName: string;
  phoneNumber: string;
  email: string;
  businessNumber: string;
  corporateRegistrationNumber: string;
  industryType: string;
  businessType: string;
  companyAddress: string;
  bankName: string;
  bankAccountHolder: string;
  bankAccount: string;
  businessLicenseFileId: number;
  corporateRegisterFileId: number;
  certificateOfCorporateSealFileId: number;
};

export const DataTable = () => {
  const [filter] = useRecoilState(MemberListFilterType);
  const listColumn: ColumnsType<MemberRecord> = getDataTableColumns();
  const { data, isLoading } = useUserListHook(filter.userId);

  return (
    <>
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
