import { SetStateAction, Dispatch } from 'react';
import { HotKeyword } from '@/search/elements';

import { ReactSVG } from 'react-svg';

interface INoneKeyword {
  _state: TSearchProps;
  _dispatch: Dispatch<SetStateAction<TSearchProps>>;
}

export const NoneKeyword = ({ _state, _dispatch }: INoneKeyword) => {
  return (
    <div className='flex h-full w-full items-center justify-between gap-[30px]'>
      <div
        id='guide'
        className='flex h-fit max-w-[508px] flex-col rounded-[20px] border-[1px] bg-white p-[44px]'
      >
        <div className='w-[420px]'>
          <div className='flex items-center justify-center'>
            <ReactSVG
              src='/assets/icons/outlined/CarbonReport.svg'
              beforeInjection={(svg) =>
                svg.setAttribute('class', 'fill-orange-400 w-8 h-8')
              }
            />
            <p className='text-2XL/Bold text-grey-900'>키워드 리포트 생성 방법</p>
          </div>
          <ul className='mt-9 grid list-inside list-decimal gap-12 text-XL/Medium'>
            <li>
              국가 선택
              <p className='pt-[6px] text-L/Medium text-grey-700'>
                데이터를 수집할 국가를 선택해주세요.
              </p>
            </li>
            <li>
              데이터 수집 기준 선택
              <p className='pt-[6px] text-L/Medium text-grey-700'>
                데이터를 수집할 상품 정렬순을 선택해주세요.
              </p>
              <ul className='mt-[14px] list-inside list-disc text-M/Medium leading-7 text-grey-700'>
                <li>연관도순 : 키워드 검색 시 기본값으로 노출되는 상품순</li>
                <li>판매량순 : 키워드 검색 후 판매량순으로 정렬시 노출되는 상품순</li>
              </ul>
            </li>
            <li>
              키워드 입력
              <p className='pt-[6px] text-L/Medium text-grey-700'>
                분석할 키워드를 입력해주세요.
              </p>
            </li>
            <li>
              리포트 생성하기
              <p className='pt-[6px] text-L/Medium text-grey-700'>
                키워드 정보를 확인 후
                <span className='text-orange-500'> 리포트 생성하기</span> 버튼을
                눌러주세요.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div id='result' className='z-[3] w-full max-w-[508px] '>
        <HotKeyword
          country={_state.country}
          searchSortBy={_state.sortBy}
          _state={_state}
          _dispatch={_dispatch}
        />
      </div>
    </div>
  );
};
