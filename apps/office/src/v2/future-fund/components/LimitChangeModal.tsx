import { Button, InputNumber, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useUserById } from '@/hooks';
import { useUpdateFutureFundLimit } from '@/v2/future-fund/hooks/future-fund.hook';

export const LimitChangeModal = ({ userId }: { userId: number }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(0);

  /* 미래 정산 한도 정보 불러오기 */
  const { data: userData, refetch } = useUserById(userId);
  useEffect(() => {
    if (userData) {
      setLimit(userData.limitFutureFund);
    }
  }, [userData]);
  /* 미래 정산 한도 정보 불러오기 */

  const onHide = () => {
    setLimit(0);
    setOpen(false);
  };

  /* 미래 정산 한도 정보 수정하기 */
  const { mutateAsync, isLoading } = useUpdateFutureFundLimit();

  const onChangeLimit = async () => {
    if (!userId) {
      toast.error('가맹점을 선택해주세요.');
      return;
    }

    await mutateAsync({
      id: userId,
      data: {
        limitFutureFund: limit,
      },
    });
    await refetch();
    onHide();
  };
  /* 미래 정산 한도 정보 수정하기 */

  return (
    <>
      <Button size='small' onClick={() => setOpen(true)}>
        변경하기
      </Button>
      <Modal
        title='미래 정산 한도 변경하기'
        open={open}
        onCancel={onHide}
        okText='변경하기'
        cancelText='닫기'
        okButtonProps={{
          loading: isLoading,
        }}
        onOk={onChangeLimit}
      >
        <InputNumber
          className='w-full'
          value={limit}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onChange={(value) => setLimit(value || 0)}
          suffix='원'
          controls={false}
        />
      </Modal>
    </>
  );
};
