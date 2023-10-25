import { useNavigate } from 'react-router-dom';

import warningIcon from '@/common/assets/warning.png';
import { ModalComponent } from '@/components/modals/ModalComponent';

export const RequestInterlockModal = ({ isOpen }: { isOpen: boolean }) => {
  const navigation = useNavigate();
  return (
    <ModalComponent isOpen={isOpen}>
      <div className='flex w-full max-w-[383px] flex-col items-center overflow-hidden rounded-[10px] bg-white py-[50px]'>
        <div>
          <img src={warningIcon} width={50} />
        </div>
        <div className='mt-[20px] text-XL/Bold'>
          아직 VAN사 계정 연동이 되지 않았어요.
        </div>
        <div className='mt-[14px] text-L/Regular'>
          서비스 이용을 위해 VAN사 <br />
          계정 연동을 먼저 진행해주세요.
        </div>
        <button
          className='button-filled-normal-large-primary-false-false-true mt-[30px] ml-4 min-w-[194px] xs:min-w-[72px]'
          onClick={() => navigation('/interlock')}
        >
          계정 연동하러가기
        </button>
      </div>
    </ModalComponent>
  );
};
