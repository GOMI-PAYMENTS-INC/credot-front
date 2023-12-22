import { isMobile } from 'react-device-detect';

export const PrefundView = () => {
  return (
    <div className={`${isMobile ? 'py-[63px] pl-[34px]' : ''}`}>
      <div
        className={`${
          isMobile ? 'text-[30px] leading-[40px]' : 'text-[40px] leading-[50px]'
        } font-[400]  text-white`}
      >
        오늘은 {isMobile ? <br /> : ''}
        <span className='font-[900] text-[#FFD872]'>45,000,000원</span>을 <br />
        미리 정산 받았어요!
      </div>
      <div className='mt-[24px] text-M/Regular leading-[24px] text-white'>
        선정산금 : 4,535,450원 {isMobile ? <br /> : 'ㅣ'} 미래 정산금 5,000,000원
      </div>
    </div>
  );
};
