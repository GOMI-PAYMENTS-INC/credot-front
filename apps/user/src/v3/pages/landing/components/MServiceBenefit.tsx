import {
  priceDropIcon,
  safetyIcon,
  starIcon,
  timerIcon,
} from '@/v3/pages/landing/assets';
import { BenefitItem } from '@/v3/pages/landing/components/ServiceBenefit';

export const MServiceBenefit = () => {
  return (
    <div className='m-service-benefit relative mt-[90px] inline-block w-full bg-[#4E1C77] py-[90px]'>
      <div className='mx-auto'>
        <div className='text-center text-2XL/Bold leading-[56px] text-white'>
          신용은 그대로! 현금 유동성만 확보하여 <br /> 안정적인 비즈니스를 만들어가세요!
        </div>
        <div className='mt-[50px] flex flex-col items-center gap-10'>
          <BenefitItem
            icon={starIcon}
            text='대출이 아니니깐, 신용도 영향 X'
            iconWidth={120}
          />
          <BenefitItem icon={priceDropIcon} text='원자재 구매비 절감' iconWidth={120} />
          <BenefitItem
            icon={timerIcon}
            text='각종 연체 방지(임대료, 급여 등)'
            iconWidth={120}
          />
          <BenefitItem icon={safetyIcon} text='흑자 도산 방지' iconWidth={110} />
        </div>
      </div>
    </div>
  );
};
