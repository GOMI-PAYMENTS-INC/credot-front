import { Select } from 'antd';
import { useRecoilState } from 'recoil';

import { useUserListHook } from '@/hooks/user.hook';
import { MemberListFilterType } from '@/v2/member/atom/member-list-filter.atom';

export const Filter = () => {
  const [filter, setFilter] = useRecoilState(MemberListFilterType);
  const { data } = useUserListHook(null);

  const users = data || [];
  return (
    <div className='mt-[20px] w-full bg-grey-50 py-[20px]'>
      <div className='mx-auto flex w-[1280px] justify-between'>
        <div className='flex items-center'>
          <div className='mr-[11px] text-S/Regular text-grey-700'>업체명</div>
          <Select
            placeholder='전체'
            value={filter.userId}
            style={{ width: 154 }}
            onChange={(value) => setFilter({ ...filter, userId: value })}
            options={(users || []).map((user) => ({ value: user.id, label: user.name }))}
          />
        </div>
      </div>
    </div>
  );
};
