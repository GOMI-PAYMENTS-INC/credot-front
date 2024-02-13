import { useNavigate } from 'react-router-dom';

import { PATH } from '@/common/constants';
import { mServiceBenefitImage, serviceBenefitImage } from '@/v3/pages/landing/assets';

export const MServiceBenefit2 = () => {
  const navigation = useNavigate();

  return (
    <div className=''>
      <div className='py-[80px]'>
        <div className='mx-auto'>
          <div className='text-center text-XL/Medium text-grey-800'>
            <div>크레닷 단말기의 특.별.함.</div>
            <div className='mt-[14px]'>여기서 끝이 아니에요!</div>
          </div>
          <div className='mt-[30px]'>
            <img
              src={mServiceBenefitImage}
              className='mx-auto'
              alt='크레닷 단말기의 특.별.함. 여기서 끝이 아니에요!'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
