import { useEffect, Dispatch, MouseEvent } from 'react';
import {
  switcIsLoadingState,
  searchKeyword,
} from '@/containers/search/translator.container';
import { isFalsy } from '@/utils/isFalsy';
import { ReactSVG } from 'react-svg';
import { replaceOverLength } from '@/utils/replaceOverLength';
interface ISearchKeywordTranslationResult {
  translatorState: TTranslationKeywordType;
  setTranslatorState: Dispatch<TRecommanderActionType>;
}

export const SearchKeywordTranslationResult = (
  props: ISearchKeywordTranslationResult,
) => {
  const { translatorState, setTranslatorState } = props;

  useEffect(() => {
    switcIsLoadingState(setTranslatorState);
  }, [translatorState.data?.keyword]);

  if (translatorState.isLoading && isFalsy(translatorState.data)) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='flex h-[100px] w-[100px] items-center justify-center opacity-[0.3] '>
          <img src='/assets/images/GptLoading.gif' />
        </div>
        <p className='text-L/Medium text-grey-800'>키워드를 분류하고 있어요</p>
      </div>
    );
  }

  const { dictionaries } = translatorState.data!;

  const buttonStyle =
    dictionaries.length > 9
      ? {
          buttonStyle: 'button-outlined-normal-medium-primary-false-false-false-disabled',
          buttonText: '더 추천받을 키워드가 없어요',
          disable: true,
        }
      : {
          buttonStyle: 'button-outlined-normal-medium-primary-false-false-false',
          buttonText: '키워드 더 추천받기',
          disable: false,
        };

  return (
    <div className='relative flex w-full flex-col justify-center pt-[14px]'>
      {dictionaries.map((result, idx) => {
        const lastItemStyle = dictionaries.length === idx + 1 ? 'mb-[96px]' : 'mb-4 ';
        return (
          <div
            key={`${result.text}_${idx}`}
            className={`mx-6 flex h-[70px] w-[312px] cursor-pointer items-center overflow-hidden rounded-[7px] bg-white hover:border-[1px] hover:bg-grey-200 ${lastItemStyle}`}
          >
            <ReactSVG
              className='px-4'
              src={`assets/icons/outlined/number/number-${idx + 1}.svg`}
            />

            <div className='flex max-w-[200px] flex-col'>
              <p className='py-2 text-M/Regular text-grey-900 '>
                {replaceOverLength(result.text, 22)}
              </p>
              <div className='mb-2 w-fit rounded-[2px] border-[1.5px] border-grey-400 bg-white'>
                <p className='px-1 py-1 text-XS/Regular'>
                  {replaceOverLength(result.translate, 22)}
                </p>
              </div>
            </div>
            <ReactSVG
              src='/assets/icons/filled/LeftArrow.svg'
              className='mr-4 flex flex-grow rotate-180'
              wrapper='div'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'fill-grey-600');
              }}
            />
          </div>
        );
      })}

      <button
        disabled={buttonStyle.disable}
        onClick={() => {
          searchKeyword(translatorState.keyword, setTranslatorState);
        }}
        className={`${buttonStyle.buttonStyle} fixed bottom-[114px] flex items-center justify-center self-center`}
      >
        <p className='mx-2.5 my-2.5'>{buttonStyle.buttonText}</p>
      </button>
    </div>
  );
};
