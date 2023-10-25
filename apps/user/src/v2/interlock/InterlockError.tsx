import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import { Default as Layout } from '@/common/layouts';
import { ModalComponent } from '@/components/modals/ModalComponent';
import ErrorImg from '@/v2/interlock/assets/error-img.png';

export const InterlockError = () => {
  const navigate = useNavigate();
  const setSideBarVisibility = useSetRecoilState(SideBarVisibility);

  useEffect(() => {
    setSideBarVisibility(false);
  }, []);

  return (
    <Layout useGap={true}>
      <ModalComponent isOpen>
        <div className='flex w-full max-w-[434px] flex-col overflow-hidden rounded-[10px] bg-white py-[60px] px-[33px]'>
          <div className='mb-[20px] self-center'>
            <img src={ErrorImg} width={100} />
          </div>
          <div className='mb-[64px] text-XL/Medium'>
            저희측 문제로 계정 연동에 실패했어요. <br />
            오류가 반복되는 경우 문의주세요.
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='button-filled-normal-xLarge-red-false-false-true mr-[20px] h-[58px] w-full border-[1px] border-grey-300 bg-white text-grey-800'
              onClick={() => navigate('/interlock')}
            >
              이전 화면으로
            </button>
            <button
              type='submit'
              className='button-filled-normal-xLarge-red-false-false-true h-[58px] w-full bg-gradient-to-r from-orange-500 to-orange-350'
              onClick={() => navigate('/interlock')}
            >
              재시도 하기
            </button>
          </div>
        </div>
      </ModalComponent>
    </Layout>
  );
};
