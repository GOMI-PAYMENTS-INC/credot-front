export const SystemOverhaul = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <header>
        <img className='h-[197px] w-[264px]' src='/assets/images/System.png' />
      </header>
      <div className='mt-[50px] text-center text-2XL/Regular leading-10 xs:text-XL/Regular'>
        <p>
          고미인사이트는 현재{' '}
          <span className='text-2XL/Bold xs:text-XL/Bold'>시스템 점검중</span>입니다.
        </p>
        <p>더욱 좋은 서비스로 찾아뵙겠습니다.</p>
      </div>
      <footer className='mt-[30px] rounded-lg bg-grey-800 px-5 py-[14px] text-center text-2XL/Regular text-white xs:text-XL/Regular'>
        <p>점검시간</p>
        <p>2023.08.28 02:00 - 07:00</p>
      </footer>
    </div>
  );
};
