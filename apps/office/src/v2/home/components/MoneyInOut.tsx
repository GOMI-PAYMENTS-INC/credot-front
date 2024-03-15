import { List, Typography } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { HomeTitle } from '@/v2/home/components/HomeTitle';

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
                <div className='text-L/Bold text-purple-800'>45,000,000 원</div>
              </div>
            }
            bordered
            dataSource={[
              {
                title: '선정산 지급액',
                value: 2000000,
              },
              {
                title: '선정산 지급액',
                value: 2000000,
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
                <div className='text-L/Bold text-purple-800'>45,000,000원</div>
              </div>
            }
            bordered
            dataSource={[
              {
                title: '오늘',
                value: 2000000,
                date: '2024.03.01',
              },
              {
                title: '내일',
                value: 2000000,
                date: '2024.03.02',
              },
              {
                title: '2일후',
                value: 2000000,
                date: '2024.03.03',
              },
              {
                title: '3일후',
                value: 2000000,
                date: '2024.03.04',
              },
            ]}
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
                    <div className='text-XL/Bold'>2,000,000원</div>
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
