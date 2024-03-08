import { Col, Row } from 'antd';
import ReactECharts from 'echarts-for-react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FutureFundStatus } from '@/generated-rest/api/front';
import { useMeHook } from '@/hooks/user.hook';
import { authTokenStorage } from '@/utils/authToken';
import {
  useCancelFutureFund,
  useTodayFutureFundApplyHook,
  useTodayFutureFundHook,
} from '@/v3/pages/home/hooks/future-fund.hook';
import { localeString } from '@/v3/util';

export const FutureFundChart = () => {
  const navigation = useNavigate();
  const { data: futureFund } = useTodayFutureFundHook();
  const { data: futureFundApply, refetch } = useTodayFutureFundApplyHook();
  const { mutateAsync: cancelFutureFund } = useCancelFutureFund();
  const { data: userQueryData } = useMeHook(authTokenStorage.getToken());
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
        name: '',
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
            value: futureFund?.futureFundInUse || 0,
            name: '이용중 금액',
            itemStyle: {
              color: '#B657FF',
            },
          },
          {
            value: futureFund?.limit || 0,
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
      <Col className={`flex ${isMobile ? 'w-full' : 'w-[400px]'}`}>
        <div className='mt-[14px] w-full rounded-[8px] border border-grey-200 py-[24px] px-[24px]'>
          <div>
            <ReactECharts option={options} showLoading={false} />
          </div>
          <div className='mt-[20px] flex justify-between'>
            <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-[#F2F2FF] text-center text-M/Medium leading-[50px] text-[#787884]'>
              나의 한도
            </div>
            <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-[#F5F5F5] px-[20px] text-right text-M/Regular leading-[50px] text-grey-800'>
              {localeString(userQueryData?.limitFutureFund || 0)}원
            </div>
          </div>
          <div className='mt-[12px] flex justify-between'>
            <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-[#F2F2FF] text-center text-M/Medium leading-[50px] text-[#787884]'>
              이용중 금액
            </div>
            <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-[#F5F5F5] px-[20px] text-right text-M/Regular leading-[50px] text-grey-800'>
              {localeString(futureFund?.futureFundInUse || 0)}원
            </div>
          </div>
          <div className='mt-[12px] flex justify-between'>
            <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-purple-100 text-center text-M/Medium font-bold leading-[50px] text-purple-500'>
              신청 가능 금액
            </div>
            <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-[#F5F5F5] px-[20px] text-right text-M/Regular font-bold leading-[50px] text-grey-800'>
              {localeString(futureFund?.limit || 0)}원
            </div>
          </div>
          <div className='mt-[44px] w-full'>
            <div
              className={`h-[50px] w-full  rounded-[4px] text-center text-L/Bold leading-[50px] text-white ${
                futureFundApply
                  ? 'cursor-not-allowed border-0 bg-purple-300'
                  : 'cursor-pointer border-[1px] border-purple-400 bg-purple-600'
              }`}
              onClick={
                futureFundApply ? () => {} : () => navigation('/future-fund/apply')
              }
            >
              {futureFundApply ? (
                <div className='flex justify-center'>
                  <div className='mr-[16px]'>
                    {`${futureFundApply?.applyPrice?.toLocaleString() || 0}원 승인 대기`}
                  </div>
                  <div
                    className={`cursor-pointer self-center text-S/Regular text-purple-600 underline`}
                    onClick={async () => {
                      if (!futureFundApply) {
                        return;
                      }

                      const result = await cancelFutureFund(futureFundApply.id);
                      if (result) {
                        await refetch();
                        toast.success('취소가 완료되었습니다.');
                      }
                    }}
                  >
                    {`취소하기`}
                  </div>
                </div>
              ) : (
                '미래정산 신청하기'
              )}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
