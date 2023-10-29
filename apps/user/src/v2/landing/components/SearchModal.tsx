import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Calculator from '@/v2/landing/assets/calculator.png';
import { LoginView } from '@/v2/landing/components/LoginView';
import { ProgressView } from '@/v2/landing/components/ProgressView';
import { useCheckVanLogin, useRequestBond } from '@/v2/landing/hooks/interlock.hook';

const CustomModal = styled(Modal)`
  position: fixed !important;
  right: 70px !important;
  bottom: 140px !important;
  top: auto;
`;

export const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose(): void;
}) => {
  const { mutateAsync: checkVanLogin, isLoading: checkVanLoginLoading } =
    useCheckVanLogin();
  const {
    mutateAsync: requestBond,
    isSuccess,
    data,
    isLoading: requestBondLoading,
  } = useRequestBond();

  return (
    <CustomModal
      open={isOpen}
      title={
        <div className='flex justify-between text-white'>
          <div className='flex justify-start'>
            <div className='mr-[20px]'>
              <img src={Calculator} width={50} />
            </div>
            <div>
              <div className='text-L/Bold'>오늘 받을 수 있는</div>
              <div className='text-L/Bold'>정산금 조회하기</div>
            </div>
          </div>
          <CloseOutlined
            className='cursor-pointer text-[15px]'
            onClick={() => onClose()}
          />
        </div>
      }
      styles={{
        content: {
          padding: 0,
        },
        body: {
          padding: '30px 20px',
        },
        header: {
          padding: '14px 29px',
          background: 'linear-gradient(#585858, #363636)',
        },
      }}
      closeIcon={null}
      width={357}
      onCancel={() => {
        onClose();
      }}
      footer={null}
      mask={false}
      maskClosable
      getContainer={() => {
        document.body.style.overflow = 'auto';
        return document.body;
      }}
    >
      {!isSuccess && (
        <LoginView
          checkVanLogin={checkVanLogin}
          requestBond={requestBond}
          loading={checkVanLoginLoading || requestBondLoading}
        />
      )}
      {isSuccess && <ProgressView requestId={data.crawlingId} />}
    </CustomModal>
  );
};
