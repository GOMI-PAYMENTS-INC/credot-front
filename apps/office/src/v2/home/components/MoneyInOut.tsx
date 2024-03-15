import { List, Typography } from 'antd';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { HomeTitle } from '@/v2/home/components/HomeTitle';
import { useInOutIn, useInOutOut } from '@/v2/home/hooks';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

interface TListItem {
  title: string;
  value: number;
  date?: string;
}

export const CustomAntdList = styled(List)`
  .ant-list-header {
    background-color: #f8f8f8;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 45px 37px !important;
  }

  .ant-list-item {
    padding: 45px 37px !important;
  }
`;

export const MoneyInOut = () => {
  const { data } = useInOutOut();
  const { data: inData } = useInOutIn();
  const today = dayjs();
  return (
    <div className='mt-[70px]'>
      <HomeTitle title='자금 IN & OUT' />
      <div className='flex gap-x-6'>
        <div>
          <CustomAntdList
            className='min-w-[445px]'
            size='large'
            header={
              <div className='flex justify-between'>
                <div className='self-center text-L/Medium'>나가 있는 금액</div>
                <div className='text-L/Bold text-purple-800'>
                  {(
                    (data?.prefundPrice || 0) + (data?.futureFundPrice || 0)
                  ).toLocaleString()}{' '}
                  원
                </div>
              </div>
            }
            bordered
            dataSource={[
              {
                title: '선정산 지급액',
                value: data?.prefundPrice || 0,
              },
              {
                title: '선정산 지급액',
                value: data?.futureFundPrice || 0,
              },
            ]}
            renderItem={
              ((item: TListItem) => (
                <List.Item>
                  <div className='flex w-full justify-between'>
                    <div className='text-L/Medium'>{item.title}</div>
                    <div className='text-XL/Bold'>{item.value.toLocaleString()} 원</div>
                  </div>
                </List.Item>
              )) as (item: TListItem) => ReactNode
            }
          />
        </div>

        <div>
          <CustomAntdList
            className='min-w-[445px]'
            size='large'
            header={
              <div className='flex justify-between'>
                <div className='self-center text-L/Medium'>회수 예정 금액</div>
                <div className='text-L/Bold text-purple-800'>
                  {inData
                    ?.reduce((acc, cur) => acc + cur.returnPrice, 0)
                    .toLocaleString()}{' '}
                  원
                </div>
              </div>
            }
            bordered
            dataSource={(inData || [])?.map((item) => {
              const itemDate = dayjs(item.date);
              const diffDay = itemDate.diff(today, 'd');
              const beforeToday = diffDay < 0;

              return {
                title:
                  diffDay === 0
                    ? '오늘'
                    : `${itemDate.diff(today, 'd')}일${beforeToday ? '전' : '후'}`,
                value: item.returnPrice,
                date: dayjs(item.date).format('YYYY.MM.DD'),
              };
            })}
            renderItem={
              ((item: TListItem) => (
                <List.Item>
                  <div className='flex w-full justify-between'>
                    <div className='flex'>
                      <div className='mr-[6px] text-L/Medium'>{item.title}</div>
                      <div className='self-center text-S/Regular text-grey-600'>
                        {item.date}
                      </div>
                    </div>
                    <div className='text-XL/Bold'>{item.value.toLocaleString()} 원</div>
                  </div>
                </List.Item>
              )) as (item: TListItem) => ReactNode
            }
          />
        </div>
      </div>
    </div>
  );
};
