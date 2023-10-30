import { ApplyFormCard } from '@/v2/apply/components/ApplyFormCard';
import { PrefundResultCard } from '@/v2/apply/components/PrefundResultCard';
import Logo from '@/v2/landing/assets/logo.png';

const Apply = () => {
  return (
    <>
      <div className='h-screen h-full bg-grey-100 pb-[174px]'>
        <div className='mx-auto w-[1004px] py-[80px]'>
          <div>
            <div className='inline-block'>
              <img src={Logo} width={233} />
            </div>

            <div className='mt-[20px] text-2XL/Medium text-grey-800'>
              정산금 확인 후 서비스 이용 신청서를 작성하시면 24시간 이내 담당자가 연락을
              드려요.
            </div>
          </div>
          <div className='mt-[60px]'>
            <PrefundResultCard />
          </div>
          <div className='mt-[40px]'>
            <ApplyFormCard />
          </div>
        </div>
        {/*<div className='flex justify-center'>*/}
        {/*  <div className='-mt-[169px] mr-[41px] w-[694px]'>*/}
        {/*    */}
        {/*  </div>*/}
        {/*  <div className='-mt-[169px] w-[694px]'>*/}
        {/*    <ApplyFormCard />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Apply;
