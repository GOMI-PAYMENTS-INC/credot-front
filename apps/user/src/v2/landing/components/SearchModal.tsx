import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Calculator from '@/v2/landing/assets/calculator.png';
import { LoginView } from '@/v2/landing/components/LoginView';
import { useCheckVanLogin } from '@/v2/landing/hooks/interlock.hook';
import { useSearchMyPrefund } from '@/v2/landing/hooks/prefund.hook';

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
  const navigate = useNavigate();
  const { mutateAsync: checkVanLogin, isLoading: checkVanLoginLoading } =
    useCheckVanLogin();
  const {
    mutateAsync: searchMyBond,
    isSuccess,
    data,
    isLoading: requestBondLoading,
  } = useSearchMyPrefund();

  useEffect(() => {
    if (data) {
      navigate(`/apply?requestIds=${data.map((item) => item.crawlingId).join(',')}`);
    }
  }, [data]);

  const ModalComponent = isMobile ? Modal : CustomModal;
  return (
    <ModalComponent
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
          searchMyBond={searchMyBond}
          loading={checkVanLoginLoading || requestBondLoading}
        />
      )}
    </ModalComponent>
  );
};
