import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

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

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

type PrefundRecord = {
  key: number;
  prefundGroupAt: string;
  name: string;
  cardCompanyName: string;
  status: string;
  prefund: number;
  bankName: string;
  bankAccountHolder: string;
  bankAccount: string;
  preSalesPrice: number;
  preCardCommission: number;
  cardSettlementPrice: number;
  setoff: number;
  serviceCommission: number;
  id: number;
  email: string;
  phoneNumber: string;
  cardSettlementGroupAt: string;
  prefundAt: string;
};

export const DataTable = () => {
  const listColumn: ColumnsType<PrefundRecord> = [
    {
      title: '데이터 생성일',
      width: 140,
      dataIndex: 'prefundGroupAt',
      key: 'prefundGroupAt',
      className: 'text-center',
    },
    {
      title: '업체명',
      width: 186,
      dataIndex: 'cardCompanyName',
      key: 'cardCompanyName',
      className: 'text-center',
    },
    {
      title: '카드사',
      width: 142,
      dataIndex: 'cardCompanyName',
      key: 'cardCompanyName',
      className: 'text-center',
    },
    {
      title: '처리 상태',
      width: 124,
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: '선정산 금액',
      width: 148,
      dataIndex: 'prefund',
      key: 'prefund',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '은행명',
      width: 124,
      dataIndex: 'bankName',
      key: 'bankName',
      className: 'text-center',
    },
    {
      title: '예금주',
      width: 124,
      dataIndex: 'bankAccountHolder',
      key: 'bankAccountHolder',
      className: 'text-center',
    },
    {
      title: '계좌번호',
      width: 168,
      dataIndex: 'bankAccount',
      key: 'bankAccount',
      className: 'text-center',
    },
    {
      title: 'D-1 매출',
      width: 124,
      dataIndex: 'preSalesPrice',
      key: 'preSalesPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: 'D-1 카드사 수수료',
      width: 160,
      dataIndex: 'preCardCommission',
      key: 'preCardCommission',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '카드사 정산금',
      width: 148,
      dataIndex: 'cardSettlementPrice',
      key: 'cardSettlementPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: 'D-1 과정산금',
      width: 124,
      dataIndex: 'setoff',
      key: 'setoff',
      className: 'text-right ',
      render: localeValueFormatter,
    },
    {
      title: '고미 수수료',
      width: 124,
      dataIndex: 'serviceCommission',
      key: 'serviceCommission',
      className: 'text-right ',
      render: localeValueFormatter,
    },
    {
      title: '거래 ID',
      width: 124,
      dataIndex: 'id',
      key: 'id',
      className: 'text-center',
    },
    {
      title: '이메일',
      width: 176,
      dataIndex: 'email',
      key: 'email',
      className: 'text-center',
    },
    {
      title: '휴대폰 번호',
      width: 170,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      className: 'text-center',
    },
    {
      title: '카드사 정산 예정일',
      width: 153,
      dataIndex: 'cardSettlementGroupAt',
      key: 'cardSettlementGroupAt',
      className: 'text-center',
    },
    {
      title: '선정산 일시',
      width: 176,
      dataIndex: 'prefundAt',
      key: 'prefundAt',
      className: 'text-center',
    },
  ];

  return (
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
            loading={false}
            columns={listColumn}
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys: React.Key[], selectedRows: PrefundRecord[]) => {
                console.log(
                  `selectedRowKeys: ${selectedRowKeys}`,
                  'selectedRows: ',
                  selectedRows,
                );
              },
            }}
            dataSource={[
              {
                key: 1,
                prefundGroupAt: '2023-11-07',
                name: 'testA',
                cardCompanyName: '삼성카드',
                status: '출금 준비',
                prefund: 70123,
                bankName: '하나은행',
                bankAccountHolder: '홍길동',
                bankAccount: '111-3333-4444',
                preSalesPrice: 232323,
                preCardCommission: 1212,
                cardSettlementPrice: 1212,
                setoff: 122,
                serviceCommission: 1212121,
                id: 1,
                email: 'test@ggg.com',
                phoneNumber: '010-2492-0223',
                cardSettlementGroupAt: '2023-11-30',
                prefundAt: '2023-11-07',
              },
            ]}
            scroll={{ x: 'max-content' }}
            pagination={false}
            bordered
          ></Table>
        </ConfigProvider>
      </Wrapper>
    </div>
  );
};
