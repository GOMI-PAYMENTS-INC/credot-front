import { isMobile } from 'react-device-detect';

import { ViewType } from '@/v2/apply/Apply';
import FailImg from '@/v2/apply/assets/fail.gif';

export const FailView = ({ onChange }: { onChange(view: ViewType): void }) => {
  return (
    <div
      className={`mx-auto flex ${
        isMobile ? 'flex-col' : 'flex-row'
      } items-center overflow-hidden rounded-[10px]`}
    >
      <div className={isMobile ? '' : 'mr-[24px]'}>
        <img
          src={FailImg}
          width={isMobile ? 54 * 2 : 54}
          className={isMobile ? '' : 'mr-[18px]'}
        />
      </div>
      <div
        className={
          isMobile
            ? 'mt-[20px] text-center text-M/Medium'
            : 'mr-[50px] text-L/Medium text-grey-800'
        }
      >
        <div className='mb-[6px]'>저희측 문제로 계정 연동에 실패했어요.</div>
        <div>오류가 반복되는 경우 문의주세요.</div>
      </div>
      <div className={isMobile ? 'mt-[20px]' : ''}>
        <button
          onClick={() => onChange(ViewType.LOGIN)}
          className='h-[47px] w-[114px] rounded-[8px] border border-orange-300 bg-orange-100 text-S/Medium text-orange-400'
        >
          재시도하기
        </button>
      </div>
    </div>
  );
};
