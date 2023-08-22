import { replaceOverLength } from '@/utils/replaceOverLength';
import { ReactSVG } from 'react-svg';
import { convertCountry, convertSortedType } from '@/utils/convertEnum';
import { Dispatch, SetStateAction } from 'react';
import { HotKeyword } from '@/search/elements';
import { useState } from 'react';

interface ISearchResult {
  _state: TSearchProps;
  setModal: Dispatch<SetStateAction<TNSearchModalStatus>>;
  modal: TNSearchModalStatus;
  _dispatch: Dispatch<SetStateAction<TSearchProps>>;
}

export const SearchResult = ({ _state, setModal, modal, _dispatch }: ISearchResult) => {
  const [isOpen, setIsOpen] = useState(false);
  const { keyword, sortBy, country } = _state;

  return (
    <div className='flex h-[848px] w-[508px] flex-col items-center'>
      <div id='result' className='z-[3] w-full'>
        <div className='relative flex flex-col justify-end'>
          <button
            className='button-outlined-normal-xLarge-grey-true-false-true flex items-center gap-2 self-end rounded-lg p-3 text-L/Bold text-orange-400'
            onClick={() => setIsOpen(!isOpen)}
          >
            <ReactSVG src='/assets/icons/filled/Star.svg' /> 오늘의 HOT 키워드
            <ReactSVG
              src='/assets/icons/outlined/CaretDown.svg'
              beforeInjection={(svg) =>
                svg.setAttribute(
                  'class',
                  `${isOpen ? 'rotate-90' : 'rotate-[270deg]'} fill-orange-500`,
                )
              }
            />
          </button>
          <div className='absolute right-1 top-[60px] flex w-[370px] justify-start'>
            {isOpen && (
              <HotKeyword
                country={_state.country}
                searchSortBy={_state.sortBy}
                _state={_state}
                _dispatch={_dispatch}
              />
            )}
          </div>
        </div>

        <div className='mt-[237px] text-3XL/Bold'>
          <p className='text-L/Medium text-grey-700'>{`${convertCountry(
            country,
          )} / ${convertSortedType(sortBy)}`}</p>
          <p className='text-3XL/Bold leading-[53px]'>
            <span className='text-orange-400'>{replaceOverLength(keyword, 31)}</span>
            의<br />
            키워드 리포트를 생성할까요?
          </p>
          <div className='mt-[30px] flex gap-20'>
            <p className='self-end text-L/Medium text-grey-700'>
              데이터 수집 소요시간
              <span className='pl-[14px] text-L/Medium text-grey-900'>최대</span>
              <span className='pl-1 text-XL/Medium text-orange-500'>4분</span>
            </p>
            <button
              className='button-filled-xLarge-primary-false-false-false w-[193px]'
              disabled={modal.isOpen}
              onClick={() => setModal({ ...modal, ...{ isOpen: true } })}
            >
              {modal.isOpen ? (
                <div className='scale-[0.2]'>
                  <div id='loader-white' />
                </div>
              ) : (
                '리포트 생성하기'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
