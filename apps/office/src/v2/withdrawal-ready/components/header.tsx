import RefreshImg from '@/v2/withdrawal-ready/assets/refresh.png';
export const Header = () => {
  return (
    <div className='mx-auto flex w-[1280px] items-center'>
      <div className='mr-[20px] text-XL/Bold text-grey-900'>출금 준비</div>
      <div className='mr-[10px] text-S/Regular text-grey-800'>업데이트 : 2023.09.23</div>
      <div>
        <img src={RefreshImg} width={28} className='cursor-pointer' />
      </div>
    </div>
  );
};
