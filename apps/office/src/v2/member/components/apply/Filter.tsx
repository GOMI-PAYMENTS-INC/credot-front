import { Button, Select } from 'antd';
import { useRecoilState } from 'recoil';

import { ApplyStatusEnum } from '@/generated-rest/api/front';
import { MemberApplyFilterAtom } from '@/v2/member/atom';

export const Filter = ({
  dataFilterCriteriaLabel,
}: {
  dataFilterCriteriaLabel: string;
}) => {
  const [filter, setFilter] = useRecoilState(MemberApplyFilterAtom);

  const handleChangeStatus = (value: ApplyStatusEnum) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const users: { id: number; name: string }[] = [];
  return (
    <div className='mt-[20px] w-full bg-grey-50 py-[20px]'>
      <div className='mx-auto flex w-[1280px] justify-between'>
        <div className='flex items-center'>
          <div className='mr-[40px] text-S/Regular text-grey-700'>
            {dataFilterCriteriaLabel}
          </div>
          <Button
            className='mr-[14px]'
            type={filter.status === 'NEW_APPLY' ? 'primary' : 'default'}
            onClick={() => handleChangeStatus(ApplyStatusEnum.NEW_APPLY)}
          >
            신규 신청
          </Button>
          <Button
            className='mr-[14px]'
            type={filter.status === 'IN_BUSINESS' ? 'primary' : 'default'}
            onClick={() => handleChangeStatus(ApplyStatusEnum.IN_BUSINESS)}
          >
            영업중
          </Button>
          <Button
            className='mr-[14px]'
            type={filter.status === 'IN_CONTRACT' ? 'primary' : 'default'}
            onClick={() => handleChangeStatus(ApplyStatusEnum.IN_CONTRACT)}
          >
            계약중
          </Button>
          <Button
            className='mr-[14px]'
            type={filter.status === 'IN_HOLD' ? 'primary' : 'default'}
            onClick={() => handleChangeStatus(ApplyStatusEnum.IN_HOLD)}
          >
            보류
          </Button>
        </div>
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
