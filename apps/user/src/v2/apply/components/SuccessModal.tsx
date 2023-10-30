import { ModalComponent } from '@/components/modals/ModalComponent';

export const SuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose(): void;
}) => {
  const handleSuccess = () => {
    onClose();
  };
  return (
    <ModalComponent isOpen={isOpen}>
      <div className='flex h-full max-h-[283px] w-full max-w-[403px] flex-col items-center overflow-hidden rounded-[10px] bg-white py-[30px] px-[30px]'>
        <div className='h-[57px] w-[57px]'>
          <img src='/assets/images/Success.gif' />
        </div>
        <div className='mt-[20px] text-XL/Bold text-grey-900'>서비스 신청 완료!</div>
        <div className='mt-[14px] text-L/Regular text-grey-900'>
          담당자 배정 후 최대한 빠른 시간 내 연락드릴께요
        </div>
        <button
          className='mt-[30px] h-[48px] w-[272px] rounded-[6px] bg-[#DBDBDB]'
          onClick={handleSuccess}
        >
          확인하기
        </button>
      </div>
    </ModalComponent>
  );
};
