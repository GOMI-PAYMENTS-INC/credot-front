import {
  CellClassParams,
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';

interface IPreFundDetailItem {
  date: string;
  cardCompanyName: string;
  preFundPrice: number;
  status: string;
  preFundDate: string;
  approvalAmount: number;
  commission: number;
  serviceCommission: number;
  setoff: number;
}

const Wrapper = styled.div`
  .ag-unselectable {
    user-select: none;
  }

  .ag-header-cell-label {
    justify-content: center;
  }

  --ag-header-cell-hover-background-color: #bfbfbf;

  .ag-header-cell:nth-child(3) {
    --ag-header-cell-hover-background-color: #ffa378;
  }

  .ag-header-cell:nth-child(6) {
    --ag-header-cell-hover-background-color: #8c8c8c;
  }

  --ag-borders: none;
  --ag-row-border-color: #ebebeb;
  --ag-cell-horizontal-border: solid #ebebeb;
`;

const localeValueFormatter = (params: ValueFormatterParams) =>
  params.value?.toLocaleString() || 0;

export const TodayPreFundDetail = () => {
  const listColumn: ColDef<IPreFundDetailItem, any>[] = [
    {
      headerName: '날짜',
      field: 'date',
      rowSpan: () => 4,
      cellRenderer: ({ node, value }: ICellRendererParams<ICellRendererParams>) => {
        return node.rowIndex === 0 ? value : '';
      },
      cellClass: 'text-center bg-grey-100 text-grey-800',
      minWidth: 142,
      flex: 1,
    },
    {
      headerName: '카드사',
      field: 'cardCompanyName',
      cellClass: 'text-center bg-grey-100 text-grey-800',
      width: 142,
    },
    {
      headerName: '선정산 금액',
      field: 'preFundPrice',
      headerClass: 'bg-orange-300 border-white border-r-[1px] text-white',
      cellClass: (params: CellClassParams) =>
        `${params.rowIndex === 0 ? 'font-bold' : ''} text-right bg-white text-red-600`,
      width: 142,
      valueFormatter: localeValueFormatter,
    },
    {
      headerName: '처리 상태',
      field: 'status',
      cellClass: 'text-center bg-white text-grey-800',
      width: 103,
    },
    {
      headerName: '선정산 일시',
      field: 'preFundDate',
      cellClass: 'text-center bg-white text-grey-800',
      width: 182,
    },
    {
      headerName: '전일 카드 매출',
      headerClass: 'bg-grey-700 border-white border-r-[1px] text-white',
      cellClass: (params: CellClassParams) =>
        `${params.rowIndex === 0 ? 'font-bold' : ''} text-right bg-white text-grey-800`,
      field: 'approvalAmount',
      width: 142,
      valueFormatter: localeValueFormatter,
    },
    {
      headerName: '전일 카드사 수수료',
      field: 'commission',
      cellClass: 'text-right bg-white text-blue-600',
      width: 142,
      valueFormatter: localeValueFormatter,
    },
    {
      headerName: '서비스 수수료',
      field: 'serviceCommission',
      cellClass: 'text-right bg-white text-blue-600',
      width: 142,
      valueFormatter: localeValueFormatter,
    },
    {
      headerName: '과정산 금액',
      cellClass: 'text-right bg-white text-blue-600',
      field: 'setoff',
      width: 144,
      valueFormatter: localeValueFormatter,
    },
  ];
  return (
    <div className='mt-[90px]'>
      <div className='text-XL/Bold'>상세내역</div>
      <Wrapper className='ag-theme-alpine gm-h-full mt-[10px]'>
        <AgGridReact
          headerHeight={44}
          rowData={[
            {
              date: '2023-10-24',
              cardCompanyName: '전체',
              preFundPrice: 50000000,
              status: '입금 준비중',
              preFundDate: '2023-10-24 17:23:23',
              approvalAmount: 3000000,
              commission: 3000000,
              serviceCommission: 1000000,
              setoff: 3000000,
            },
            {
              date: '2023-10-24',
              cardCompanyName: '현대 카드',
              preFundPrice: 50000000,
              status: '입금 준비중',
              preFundDate: '2023-10-24 17:23:23',
              approvalAmount: 3000000,
              commission: 3000000,
              serviceCommission: 1000000,
              setoff: 3000000,
            },
            {
              date: '2023-10-24',
              cardCompanyName: '현대 카드',
              preFundPrice: 50000000,
              status: '입금 준비중',
              preFundDate: '2023-10-24 17:23:23',
              approvalAmount: 3000000,
              commission: 3000000,
              serviceCommission: 1000000,
              setoff: 3000000,
            },
            {
              date: '2023-10-24',
              cardCompanyName: '현대 카드',
              preFundPrice: 50000000,
              status: '입금 준비중',
              preFundDate: '2023-10-24 17:23:23',
              approvalAmount: 3000000,
              commission: 3000000,
              serviceCommission: 1000000,
              setoff: 3000000,
            },
          ]}
          defaultColDef={{
            headerClass: 'bg-grey-500 border-white border-r-[1px] text-white',
            menuTabs: [],
          }}
          domLayout='autoHeight'
          columnDefs={listColumn}
        />
      </Wrapper>
    </div>
  );
};
