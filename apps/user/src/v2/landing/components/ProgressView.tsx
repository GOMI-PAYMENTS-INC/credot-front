import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CrawlingDto } from '@/generated-rest/api/front';
import ProgressImg from '@/v2/interlock/assets/progress-img.png';
import { useGetInterlock } from '@/v2/landing/hooks/interlock.hook';

export const ProgressView = ({ requestId }: { requestId: number }) => {
  const [isFail, setIsFail] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data } = useGetInterlock(isFail ? null : Number(requestId));

  useEffect(() => {
    if (data) {
      if (data.status === CrawlingDto.status.DONE) {
        navigate(`/apply?requestId=${requestId}`);
      }

      if (data.status === CrawlingDto.status.FAILED) {
        setIsFail(true);
      }
    }
  }, [data]);

  return (
    <div className='flex flex-col overflow-hidden rounded-[10px] bg-white px-[61px] py-[107px]'>
      <div className='mb-[20px] self-center'>
        <img src={ProgressImg} width={100} />
      </div>
      <div className='mb-[10px] text-center text-L/Medium text-grey-800'>
        정산금을 조회중이에요...
      </div>
      <div className='flex justify-center'>
        <div className='mr-[8px] self-center text-S/Medium text-grey-900'>약</div>
        <div className='mr-[14px] text-XL/Bold text-orange-400'>30초</div>
        <div className='self-center text-S/Medium text-grey-700'>소요</div>
      </div>
    </div>
  );
};
