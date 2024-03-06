import { Button, Col, Row } from 'antd';
import ReactECharts from 'echarts-for-react';

export const FutureFundChart = () => {
  const options = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['90%', '68%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 1048,
            name: '이용중 금액',
            itemStyle: {
              color: '#B657FF',
            },
          },
          {
            value: 0,
            name: '신청 가능 금액',
            itemStyle: {
              color: '#EBEBEB',
            },
          },
        ],
      },
    ],
  };
  return (
    <Row gutter={[30, 30]}>
      <Col className='flex w-[400px]'>
        <div className='mt-[14px] w-full rounded-[8px] border border-grey-200 py-[24px] px-[24px]'>
          <div>
            <ReactECharts option={options} showLoading={false} />
          </div>
          <div className='mt-[20px] flex justify-between'>
            <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-[#F2F2FF] text-center text-M/Medium leading-[50px] text-[#787884]'>
              나의 한도
            </div>
            <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-[#F5F5F5] px-[20px] text-right text-M/Regular leading-[50px] text-grey-800'>
              50,000,000원
            </div>
          </div>
          <div className='mt-[12px] flex justify-between'>
            <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-[#F2F2FF] text-center text-M/Medium leading-[50px] text-[#787884]'>
              이용중 금액
            </div>
            <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-[#F5F5F5] px-[20px] text-right text-M/Regular leading-[50px] text-grey-800'>
              50,000,000원
            </div>
          </div>
          <div className='mt-[12px] flex justify-between'>
            <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-purple-100 text-center text-M/Medium leading-[50px] text-purple-500'>
              신청 가능 금액
            </div>
            <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-[#F5F5F5] px-[20px] text-right text-M/Regular leading-[50px] text-grey-800'>
              50,000,000원
            </div>
          </div>
          <div className='mt-[44px] w-full'>
            <div className='h-[50px] w-full cursor-pointer rounded-[4px] border-[1px] border-purple-400 bg-purple-600 text-center text-L/Bold leading-[50px] text-white'>
              미래정산 신청하기
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
