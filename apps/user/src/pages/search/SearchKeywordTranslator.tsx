import {
  Dispatch,
  useReducer,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  Fragment,
} from 'react';
import { ReactSVG } from 'react-svg';
import { CountryType } from '@/generated/graphql';
import { CACHING_KEY } from '@/types/enum.code';

import { useForm } from 'react-hook-form';
import { recommanderInitialState, recommanderReducer } from '@/containers/search';
import { SearchKeywordTranslationResult } from '@/pages/search/SearchKeywordTranslationResult';

import {
  switchTranslationTab,
  initializeKeyword,
  searchKeyword,
} from '@/containers/search/translator.container';
import { isFalsy } from '@/utils/isFalsy';
import { useSessionStorage } from '@/utils/useSessionStorage';

interface ISearchKeywordTranslator {
  _searchState: TSearchState;
  _searchDispatch: Dispatch<TSearchActionType>;
}

export const SearchKeywordTranslator = (props: ISearchKeywordTranslator) => {
  const [_state, _dispatch] = useReducer(recommanderReducer, recommanderInitialState);
  const { register, getValues, setValue } = useForm<{ keyword: string }>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (useSessionStorage.getItem(CACHING_KEY.STORED_TRANSLATION)) {
      initializeKeyword(setValue, _dispatch);
    }
  }, []);

  return (
    <div className='fixed bottom-[100px] right-6 block'>
      {_state.useTranslation === true ? (
        <article className='z-50 w-[360px] shadow-[0_8px_16px_-15px_rgba(0,0,0,0.5)]'>
          <section className='flex w-full flex-col rounded-t-[16px] border-[1px] border-grey-300 bg-white px-6 pb-5 pt-5'>
            <header className='flex w-full items-center'>
              <img src='/assets/images/Gomibot.png' />
              <h1 className='w-[224px] pl-3 text-XL/Bold text-grey-900'>키워드 번역</h1>
              <ReactSVG
                src='/assets/icons/filled/CloseCircle.svg'
                className='flex flex-grow cursor-pointer justify-end'
                wrapper='div'
                onClick={() => switchTranslationTab(_dispatch, false)}
              />
            </header>
            <div className='mt-6 h-10'>
              <div className='select-icon-group'>
                <ReactSVG src='/assets/icons/country/Vietnam.svg' />
                <select name='country' id='country' className='select-normal-clear-true'>
                  <option value={CountryType.Vn} defaultValue={CountryType.Vn}>
                    베트남
                  </option>
                </select>
              </div>
            </div>
            <div className='mt-3 flex items-center'>
              <div className='inputCustom-group grow'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    id='keyword'
                    type='text'
                    className='inputCustom-textbox w-full'
                    placeholder='수분 크림'
                    {...register('keyword', {})}
                    onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
                      searchKeyword(getValues('keyword'), _dispatch, event);
                    }}
                  />
                </div>
              </div>

              <button
                className='button-filled-normal-large-primary-false-false-true ml-2 h-fit min-w-[76px] text-M/Bold'
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  searchKeyword(getValues('keyword'), _dispatch, event);
                }}
              >
                번역
              </button>
            </div>
          </section>
          <section
            id='scrollbar'
            className='block h-[378px] w-full justify-center overflow-y-auto overflow-x-hidden rounded-b-[16px] bg-grey-100'
          >
            <div className='block h-full w-full'>
              {isFalsy(_state.keyword) && isFalsy(_state.isLoading) ? (
                <div className='flex h-full flex-col items-center justify-center'>
                  <ReactSVG src='/assets/icons/outlined/Translation.svg' />
                  <p className='pt-4 text-L/Medium text-grey-800'>
                    번역할 키워드를 입력해주세요.
                  </p>
                </div>
              ) : (
                <SearchKeywordTranslationResult
                  translatorState={_state}
                  setTranslatorState={_dispatch}
                />
              )}
            </div>
          </section>
        </article>
      ) : (
        <img
          src='/assets/images/ChatGPTTalk.png'
          className='cursor-pointer'
          onClick={() => {
            switchTranslationTab(_dispatch, true);
          }}
        />
      )}
    </div>
  );
};
