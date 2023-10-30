import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import { Default as Layout } from '@/common/layouts';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { CrawlingDto } from '@/generated-rest/api/front';
import ProgressImg from '@/v2/apply/assets/progress-img.png';
import { useGetInterlock } from '@/v2/interlock/hooks/interlock.hook';

export const InterlockProgress = () => {
  const setSideBarVisibility = useSetRecoilState(SideBarVisibility);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestId = searchParams.get('requestId'); // test
  const { data, refetch } = useGetInterlock(requestId || '');

  useEffect(() => {
    if (!requestId) {
      navigate('/interlock');
      return;
    }

    setSideBarVisibility(false);
  }, []);

  useEffect(() => {
    if (data) {
      if (data.status === CrawlingDto.status.DONE) {
        navigate('/apply');
      }
    }
  }, [data]);

  return (
    <Layout useGap={true}>
      <ModalComponent isOpen>
        <div className='flex flex-col overflow-hidden rounded-[10px] bg-white py-[100px] px-[100px]'>
          <div className='mb-[30px] self-center'>
            <img src={ProgressImg} width={100} />
          </div>
          <div className='mb-[10px] text-XL/Medium'>정산 데이터를 연동중이에요...</div>
          <div className='flex justify-center'>
            <div className='mr-[8px] self-center text-M/Medium'>약</div>
            <div className='mr-[14px] text-2XL/Bold text-orange-400'>30초</div>
            <div className='self-center text-M/Medium'>소요</div>
          </div>
        </div>
      </ModalComponent>
    </Layout>
  );
};
