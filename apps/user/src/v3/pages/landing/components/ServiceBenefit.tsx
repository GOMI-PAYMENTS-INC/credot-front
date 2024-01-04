import {
  priceDropIcon,
  safetyIcon,
  starIcon,
  timerIcon,
} from '@/v3/pages/landing/assets';

export function BenefitItem({
  text,
  icon,
  iconWidth = 150,
}: {
  iconWidth?: number;
  icon: string;
  text: string;
}) {
  return (
    <div className='w-[236px]'>
      <div className='flex h-[150px]'>
        <img src={icon} className='mx-auto self-center' width={iconWidth} />
      </div>
      <div className='mt-[28px] rounded-[50px] bg-purple-50 py-[16px] text-center text-M/Bold'>
        {text}
      </div>
    </div>
  );
}

export const ServiceBenefit = () => {
  return (
    <div className='service-benefit relative mt-[90px] inline-block w-full bg-[#4E1C77] pb-[110px]'>
      <div className='mx-auto w-[1100px]'>
        <div className='text-center text-3XL/Bold leading-[56px] text-white'>
          신용은 그대로! 현금 유동성만 확보하여 <br /> 안정적인 비즈니스를 만들어가세요!
        </div>
        <div className='mt-[80px] flex justify-center gap-20'>
          <BenefitItem
            icon={starIcon}
            text='대출이 아니니깐, 신용도 영향 X'
            iconWidth={140}
          />
          <BenefitItem icon={priceDropIcon} text='원자재 구매비 절감' />
          <BenefitItem icon={timerIcon} text='각종 연체 방지(임대료, 급여 등)' />
          <BenefitItem icon={safetyIcon} text='흑자 도산 방지' iconWidth={130} />
        </div>
      </div>
    </div>
  );
};
