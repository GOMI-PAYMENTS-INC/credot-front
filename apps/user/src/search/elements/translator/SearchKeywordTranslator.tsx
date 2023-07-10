import { Dispatch, KeyboardEvent, useEffect, useReducer, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { CountryType } from '@/generated/graphql';
import { CACHING_KEY, LANGUAGE_TYPE } from '@/types/enum.code';

import { useForm, UseFormSetValue } from 'react-hook-form';
import { recommenderInitialState, recommenderReducer } from '@/search/reducer';
import { SearchKeywordTranslationResult } from '@/search/elements';

import {
  initializeKeyword,
  searchKeyword,
  switchIsLoadingState,
  switchTranslationTab,
} from '@/search/elements/translator/container';

import { useSessionStorage } from '@/utils/useSessionStorage';
import DropDown, {
  DROPDOWN_STATUS,
  DROPDOWN_VARIANTS,
  TDropDownOption,
} from '@/components/dropDown';
import { convertLanguage } from '@/utils/convertEnum';

interface ISearchKeywordTranslator {
  _searchDispatch: Dispatch<TSearchActionType>;
  searchCountry: CountryType;
  searchSortBy: TSortBy;
  updateSearchKeyword: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>;
}

export const SearchKeywordTranslator = (props: ISearchKeywordTranslator) => {
  const [_state, _dispatch] = useReducer(recommenderReducer, recommenderInitialState);
  const scrollRef = useRef<HTMLTableSectionElement>(null);
  const { register, getValues, setValue, watch } = useForm<{
    country: LANGUAGE_TYPE;
    searchWord: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      country: LANGUAGE_TYPE.Us,
    },
  });

  const countryWatcher = watch('country');

  useEffect(() => {
    if (useSessionStorage.getItem(CACHING_KEY.STORED_TRANSLATION)) {
      initializeKeyword(setValue, _dispatch);
    }
  }, []);

  useEffect(() => {
    if (_state.isLoading) {
      void searchKeyword(
        countryWatcher,
        getValues('searchWord'),
        _dispatch,
        null,
        setValue,
      );
    }
  }, [_state.isLoading]);

  const getCachingData = () => useSessionStorage.getItem(CACHING_KEY.STORED_TRANSLATION);

  const languageOptions = () => {
    let result: TDropDownOption[] = [];
    const keys = Object.keys(LANGUAGE_TYPE);
    keys.map((languageCode) => {
      const languageEnum = LANGUAGE_TYPE[languageCode as keyof typeof LANGUAGE_TYPE];

      result.push({
        value: languageEnum,
        text: convertLanguage(languageEnum),
      });
    });
    return result;
  };

  const onClickOption = (languageCode: any) => {
    const languageTypeEnum: LANGUAGE_TYPE = languageCode;
    setValue('country', languageTypeEnum);
  };

  return (
    <div className='fixed bottom-[100px] right-6 block'>
      {_state.useTranslation === true ? (
        <article className='z-50 w-[360px] shadow-[0_8px_16px_-15px_rgba(0,0,0,0.5)]'>
          <section className='flex w-full flex-col rounded-t-[16px] border-[1px] border-grey-300 bg-white px-6 pb-5 pt-5'>
            <header className='flex w-full items-center'>
              <ReactSVG src='/assets/icons/GPTgomi.svg' className='h-10 w-10' />
              <h1 className='w-[224px] pl-3 text-XL/Bold text-grey-900'>키워드 번역</h1>
              <ReactSVG
                src='/assets/icons/filled/CloseCircle.svg'
                className='flex flex-grow cursor-pointer justify-end'
                wrapper='div'
                onClick={() => switchTranslationTab(_dispatch, false)}
              />
            </header>
            <div className='mt-6 flex h-10 items-center justify-around'>
              <div className='flex items-center'>
                <p className='text-S/Regular text-grey-800'>한국어</p>
              </div>
              <ReactSVG src='/assets/icons/outlined/ArrowRight.svg' />

              <DropDown
                name='country'
                minWidth={120}
                value={convertLanguage(countryWatcher)}
                isUseIcon={false}
                options={languageOptions()}
                status={DROPDOWN_STATUS.FILLED}
                variants={DROPDOWN_VARIANTS.CLEAR}
                onClickOption={onClickOption}
              ></DropDown>
            </div>
            <div className='mt-3 flex items-center'>
              <div className='inputCustom-group grow'>
                <div className='inputCustom-textbox-wrap'>
                  <input
                    id='searchWord'
                    type='text'
                    className='inputCustom-textbox w-full'
                    placeholder='수분 크림'
                    {...register('searchWord')}
                    onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
                      if (event.key === 'Enter') {
                        const callData =
                          getCachingData()?.keyword !== getValues('searchWord') ||
                          getCachingData()?.country !== getValues('country');
                        switchIsLoadingState(_dispatch, callData);
                      }
                    }}
                  />
                </div>
              </div>

              <button
                className='button-filled-normal-large-primary-false-false-true ml-2 h-fit min-w-[76px] text-M/Bold'
                onClick={() => {
                  const callData =
                    getCachingData()?.keyword !== getValues('searchWord') ||
                    getCachingData()?.country !== getValues('country');
                  switchIsLoadingState(_dispatch, callData);
                }}
              >
                번역
              </button>
            </div>
          </section>
          <section
            id='scrollbar'
            className='block h-[450px] w-full justify-center overflow-y-auto overflow-x-hidden rounded-b-[16px] bg-grey-100'
            ref={scrollRef}
          >
            <div className='block h-full w-full'>
              <SearchKeywordTranslationResult
                translatorState={_state}
                updateSearchKeyword={props.updateSearchKeyword}
                _searchDispatch={props._searchDispatch}
                searchSortBy={props.searchSortBy}
                setTranslatorState={_dispatch}
                scrollRef={scrollRef}
                searchCountry={props.searchCountry}
              />
            </div>
          </section>
        </article>
      ) : (
        <button
          onClick={() => {
            switchTranslationTab(_dispatch, true);
          }}
        >
          <ReactSVG src='/assets/icons/ChatGPTTalk.svg' />
        </button>
      )}
    </div>
  );
};
