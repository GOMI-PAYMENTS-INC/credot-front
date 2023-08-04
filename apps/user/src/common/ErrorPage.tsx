export const ErrorPage = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center text-center'>
      <div>
        <img src='/assets/images/ErrorPage.png' />
      </div>
      <div className='mt-7'>
        <h1 className='text-2XL/Bold xs:hidden'>
          페이지를 정상적으로 불러오지 못했어요.
        </h1>
        <p className='mt-6 text-M/Regular xs:w-[280px] xs:break-words'>
          페이지를 연결하는 과정에서 저희측 문제가 있는 것 같아요. 재시도 부탁드리며,
          <br />이 문제가 계속해서 발생하는 경우
          <span className='text-orange-500'>{`support@gomiinsight.com`}</span>로
          문의주세요.
        </p>
      </div>
      <div className='mt-14 space-x-6 xs:mt-[38px] xs:flex'>
        <button
          className='button-filled-normal-large-primary-false-false-true h-12 w-[200px] bg-grey-200 xs:w-[142px]'
          onClick={async () => {
            history.go(-1);
            setTimeout(() => window.location.reload(), 100);
          }}
        >
          <p className='text-M/Bold text-grey-800'>이전 화면으로</p>
        </button>
        <button
          className='button-filled-normal-large-primary-false-false-true h-12 w-[200px] bg-orange-500 text-center xs:w-[142px]'
          onClick={() => window.location.reload()}
        >
          <p className='text-M/Bold text-white'>재시도</p>
        </button>
      </div>
    </div>
  );
};
