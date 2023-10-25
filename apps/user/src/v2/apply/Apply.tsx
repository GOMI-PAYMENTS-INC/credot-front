import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import { Default as Layout } from '@/common/layouts';
import { RequestInterlockModal } from '@/v2/apply/components/RequestInterlockModal';
import { useCheckInterLockVan } from '@/v2/apply/hooks/interlock.hook';

const Apply = () => {
  const navigation = useNavigate();
  const setSideBarVisibility = useSetRecoilState(SideBarVisibility);
  const { data: isInterlockVan } = useCheckInterLockVan();

  useEffect(() => {
    /*** VAN 연동 여부가 false 일 경우 사이드바 hidden ***/
    if (!isInterlockVan) {
      setSideBarVisibility(false);
    }
  }, [isInterlockVan]);

  return (
    <Layout useGap={true}>
      <RequestInterlockModal isOpen={!isInterlockVan} />
    </Layout>
  );
};

export default Apply;
