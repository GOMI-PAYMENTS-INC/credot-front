import { Button, DatePicker, Divider, Select, Tabs } from 'antd';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';

import { useUserListHook } from '@/hooks/user.hook';
import { PrefundFilterAtom } from '@/v2/prefund/atom';

export type TermType = 'today' | 'yesterday' | 'recent-7-days' | null;

export const Filter = ({
  dataFilterCriteriaLabel,
  dateRangeOn = true,
}: {
  dataFilterCriteriaLabel?: string;
  dateRangeOn?: boolean;
}) => {
  const [filter, setFilter] = useRecoilState(PrefundFilterAtom);
  const { data: users } = useUserListHook(null);

  const handleChangeTerm = (value: TermType) => {
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');
    const sevenDaysAgo = dayjs().subtract(7, 'day');

    value === 'today' && setFilter({ ...filter, term: value, termRange: [today, today] });
    value === 'yesterday' &&
      setFilter({ ...filter, term: value, termRange: [yesterday, yesterday] });
    value === 'recent-7-days' &&
      setFilter({ ...filter, term: value, termRange: [sevenDaysAgo, today] });
  };

  const handleChangeTermRange = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
    const datesSame = dates[0].format('YYYY-MM-DD') === dates[1].format('YYYY-MM-DD');
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');
    const sevenDaysAgo = dayjs().subtract(7, 'day');
    const isToday =
      datesSame && dates[0].format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
    const isYesterday =
      datesSame && dates[0].format('YYYY-MM-DD') === yesterday.format('YYYY-MM-DD');
    const isRecent7Days =
      dates[1].format('YYYY-MM-DD') === today.format('YYYY-MM-DD') &&
      dates[0].format('YYYY-MM-DD') === sevenDaysAgo.format('YYYY-MM-DD');

    isToday && setFilter({ ...filter, termRange: dates, term: 'today' });
    isYesterday && setFilter({ ...filter, termRange: dates, term: 'yesterday' });
    isRecent7Days && setFilter({ ...filter, termRange: dates, term: 'recent-7-days' });
    !isToday &&
      !isYesterday &&
      !isRecent7Days &&
      setFilter({ ...filter, termRange: dates, term: null });
  };

  return (
    <div className='mt-[20px] w-full bg-grey-50 py-[20px]'>
      <div className='mx-auto flex w-[1280px] flex-col'>
        {dateRangeOn && (
          <>
            <div className='flex items-center'>
              {dataFilterCriteriaLabel && (
                <div className='mr-[40px] text-S/Regular text-grey-700'>
                  {dataFilterCriteriaLabel}
                </div>
              )}
              <Button
                className='mr-[14px]'
                type={filter.term === 'today' ? 'primary' : 'default'}
                onClick={() => handleChangeTerm('today')}
              >
                오늘
              </Button>
              <>
                <Button
                  className='mr-[14px]'
                  type={filter.term === 'yesterday' ? 'primary' : 'default'}
                  onClick={() => handleChangeTerm('yesterday')}
                >
                  어제
                </Button>
                <Button
                  type={filter.term === 'recent-7-days' ? 'primary' : 'default'}
                  className='mr-[14px]'
                  onClick={() => handleChangeTerm('recent-7-days')}
                >
                  최근 7일
                </Button>
                <DatePicker.RangePicker
                  value={filter.termRange}
                  placeholder={['시작일', '종료일']}
                  onChange={(dates) =>
                    handleChangeTermRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
                  }
                />
              </>
            </div>
            <Divider />
          </>
        )}
        <Tabs
          onChange={(value) =>
            setFilter({ ...filter, userId: value === 'ALL' ? null : Number(value) })
          }
          type='card'
          items={[
            {
              key: 'ALL',
              label: '전체',
            },
            ...(users || []).map((user) => ({
              key: user.id.toString(),
              label: user.name,
            })),
          ]}
        />
      </div>
    </div>
  );
};
