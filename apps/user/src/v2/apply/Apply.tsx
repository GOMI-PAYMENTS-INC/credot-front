import { ApplyFormCard } from '@/v2/apply/components/ApplyFormCard';
import Logo from '@/v2/landing/assets/logo.png';

const Apply = () => {
  return (
    <>
      <div className='h-screen h-max bg-grey-100 pb-[174px]'>
        <div className='flex items-start justify-center bg-gradient-to-r from-dark-orange-900 to-orange-400 py-[239px] pt-[70px] text-center'>
          <div>
            <div className='mb-4 inline-block'>
              <img src={Logo} width={233} />
            </div>

            <div className='text-[40px] font-bold leading-[56.5px] text-white'>
              선정산 서비스 이용 신청하기
            </div>

            <div className='mt-[20px] font-[20px] leading-[39px] text-white'>
              아래 양식을 작성하여 서비스 이용 신청을 완료해주시면, <br />
              24시간 이내로 담당자가 연락을 해드려요.
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='-mt-[169px] mr-[41px] w-[694px]'>
            <ApplyFormCard />
          </div>
          <div className='-mt-[169px] w-[694px]'>
            <ApplyFormCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
