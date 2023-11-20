import { Button, Select } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { ApplyStatusEnum } from '@/generated-rest/api/front';

export const TableFilter = ({
  onUpdate,
}: {
  onUpdate(status: ApplyStatusEnum): void;
}) => {
  const [status, setStatus] = useState<ApplyStatusEnum>(ApplyStatusEnum.NEW_APPLY);
  const handleChange = (value: ApplyStatusEnum) => {
    setStatus(value);
  };

  const handleUpdate = () => {
    if (!status) {
      toast.error('변경할 상태를 선택해주세요.');
      return;
    }

    onUpdate(status);
    setStatus(status);
  };

  return (
    <div className='mx-auto mt-[24px] flex w-[1280px] justify-end'>
      <div className='flex items-center'>
        <div className='mr-[11px] text-S/Regular text-grey-700'>선택 건 상태</div>
        <Select
          placeholder='변경할 상태를 선택해주세요.'
          className='mr-[14px]'
          value={status}
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: 'NEW_APPLY', label: '신규 신청' },
            { value: 'IN_BUSINESS', label: '영업중' },
            { value: 'IN_CONTRACT', label: '계약중' },
            { value: 'IN_HOLD', label: '보류' },
          ]}
        />
        <Button onClick={handleUpdate} type='primary'>
          변경
        </Button>
      </div>
    </div>
  );
};
