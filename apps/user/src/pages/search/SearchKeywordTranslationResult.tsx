import { useEffect, Dispatch, useState, Fragment, RefObject } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { searchKeyword } from '@/containers/search/translator.container';
import { isFalsy } from '@/utils/isFalsy';
import { ReactSVG } from 'react-svg';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { queryKeywordByClick } from '@/containers/search';

interface ISearchKeywordTranslationResult {
  translatorState: TTranslationKeywordType;
  setTranslatorState: Dispatch<TRecommanderActionType>;
  _searchDispatch: Dispatch<TSearchActionType>;
  scrollController: RefObject<HTMLTableSectionElement>;
}

export const SearchKeywordTranslationResult = (
  props: ISearchKeywordTranslationResult,
) => {
  const { translatorState, setTranslatorState, _searchDispatch, scrollController } =
    props;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching) {
      searchKeyword(translatorState.keyword, setTranslatorState, setIsFetching);
      scrollController.current?.scroll({ top: 900, left: 0, behavior: 'smooth' });
    }
  }, [isFetching]);

  if (isFalsy(translatorState.keyword) && isFalsy(translatorState.isLoading)) {
    return (
      <div className='flex h-full flex-col'>
        <div className='flex h-full flex-col items-center justify-center'>
          <ReactSVG src='/assets/icons/outlined/Translation.svg' />
          <p className='pt-4 text-L/Medium text-grey-800'>
            번역할 키워드를 입력해주세요.
          </p>

          <div className='mt-6 flex w-[312px] flex-col rounded-[10px] bg-grey-300'>
            <div className='flex flex-col px-3 py-3 text-XS/Regular text-grey-800'>
              <h1 className='text-XS/Bold text-grey-900'>서비스 안내</h1>
              <p className='pt-1'>
                키워드 번역은 OpenAI에서 제공하는 ChatGPT 서비스를
                <br />
                활용해 키워드 추출 및 번역을 도와드리는 서비스에요.
              </p>
            </div>
          </div>

          <div className='mt-2 flex w-[312px] flex-col rounded-[10px] bg-grey-300'>
            <div className='flex flex-col px-3 py-3 text-XS/Regular text-grey-800'>
              <h1 className='text-XS/Bold text-grey-900'>주의해주세요.</h1>
              <p className='pt-1'>
                본 서비스의 주체는 고미인사이트가 아닌 OpenAI에 의해
                <br />
                제공되며, 2021년 이후 생성된 신규 단어이거나 입력된 키워
                <br />
                드에 따라 정확하지 않은 정보가 제공될 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isFalsy(translatorState.data) && translatorState.isError) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <ReactSVG
          src='/assets/icons/outlined/ExclamationCircle.svg'
          beforeInjection={(svg) => {
            svg.setAttribute('class', `w-[35px] h-[35px] fill-grey-400`);
          }}
        />
        <div className='flex flex-col items-center pt-[18.5px] text-center'>
          <p className='text-L/Medium text-grey-800'>
            서버로부터 데이터를 불러오지 못했어요.
            <br />
            잠시 후 다시 시도 해주세요.
          </p>
        </div>
      </div>
    );
  }

  if (translatorState.isLoading || isFalsy(translatorState.data?.dictionaries)) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='flex h-[100px] w-[100px] items-center justify-center opacity-[0.3] '>
          <img src='/assets/images/GptLoading.gif' />
        </div>
        <p className='text-L/Medium text-grey-800'>
          관련 키워드들을 추출하고 번역중이에요.
        </p>
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
        const lastIndex =
          dictionaries.length === idx + 1
            ? {
                style: translatorState.isError ? 'mb-[34px]' : 'mb-[96px]',
                isLastIndex: true,
              }
            : { style: 'mb-4', isLastIndex: false };

        return (
          <Fragment key={`${result.text}_${idx}`}>
            <div
              className={`mx-6 flex h-[70px] w-[312px] overflow-hidden rounded-[7px] bg-white hover:border-[1px] hover:bg-grey-200 ${lastIndex.style}`}
            >
              <button
                className='flex h-full w-full items-center'
                onClick={() => queryKeywordByClick(result.text, _searchDispatch)}
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
              </button>
            </div>

            {lastIndex.isLastIndex && translatorState.isError && (
              <div className='mb-[78px] flex h-full flex-col items-center justify-center'>
                <ReactSVG
                  src='/assets/icons/outlined/ExclamationCircle.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `w-[35px] h-[35px] fill-grey-400`);
                  }}
                />
                <div className='flex flex-col items-center pt-[18.5px] text-center'>
                  <p className='text-L/Medium text-grey-800'>
                    서버로부터 데이터를 불러오지 못했어요.
                    <br />
                    잠시 후 다시 시도 해주세요.
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
      {isFetching ? (
        <div className='mb-[142px] flex h-10  w-10 scale-[0.3] flex-col self-center'>
          <div id='loader-white' />
        </div>
      ) : (
        <button
          disabled={buttonStyle.disable}
          onClick={() => {
            setIsFetching(true);
          }}
          className={`${buttonStyle.buttonStyle} fixed bottom-[114px] flex items-center justify-center self-center`}
        >
          <p className='mx-2.5 my-2.5'>{buttonStyle.buttonText}</p>
        </button>
      )}
    </div>
  );
};
