import { Button, Select } from 'antd';
import { useState } from 'react';

type StatusType = '출금완료' | null;

export const TableFilter = () => {
  const [status, setStatus] = useState<StatusType>(null);
  const handleChange = (value: StatusType) => {
    setStatus(value);
  };

  const handleUpdate = () => {
    setStatus(null);
  };

  return (
    <div className='mx-auto mt-[24px] flex w-[1280px] justify-between'>
      <div className='flex items-center'>
        <div className='mr-[20px] text-S/Regular text-grey-700'>선정산 금액 합계</div>
        <div className='text-XL/Bold text-orange-500'>999,999,999원</div>
      </div>
      <div className='flex items-center'>
        <div className='mr-[11px] text-S/Regular text-grey-700'>선택 건 상태</div>
        <Select
          placeholder='전체'
          className='mr-[40px]'
          value={status}
          style={{ width: 114 }}
          onChange={handleChange}
          options={[{ value: '출금완료', label: '출금완료' }]}
        />
        <Button onClick={handleUpdate} type='primary'>
          변경
        </Button>
      </div>
    </div>
  );
};
