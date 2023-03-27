import { Dispatch, useReducer } from 'react';
import { ReactSVG } from 'react-svg';
import { CountryType } from '@/generated/graphql';
import { useForm } from 'react-hook-form';
import { recommanderInitialState, recommanderReducer } from '@/containers/search';
import { switchTranslationTab } from '@/containers/search/recommander.container';

interface ISearchKeywordRecommander {
  _searchState: TState;
  _searchDispatch: Dispatch<TSearchActionType>;
}

export const SearchKeywordRecommander = (props: ISearchKeywordRecommander) => {
  const [_state, _dispatch] = useReducer(recommanderReducer, recommanderInitialState);
  const { register } = useForm<{ keyword: string }>({
    mode: 'onChange',
  });

  return (
    <div className='fixed bottom-[100px] right-6 block'>
      {_state.useTranslation === true ? (
        <article className='z-50 w-[360px] shadow-[0_8px_16px_-15px_rgba(0,0,0,0.5)]'>
          <section className='w-full rounded-t-[16px] border-[1px] border-grey-300 bg-white px-6 pb-5 pt-5'>
            <header className='flex w-full items-center justify-around'>
              <img src='/assets/images/Gomibot.png' />
              <h1 className='w-[224px] pl-1 text-XL/Bold text-grey-900'>키워드 번역</h1>
              <ReactSVG
                src='/assets/icons/filled/CloseCircle.svg'
                className='cursor-pointer'
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
                    placeholder='키워드를 입력해주세요.'
                    maxLength={11}
                    {...register('keyword', {
                      onChange: (event) => {},
                    })}
                    onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {}}
                  />
                </div>
              </div>

              <button
                className='button-filled-normal-large-primary-false-false-true ml-2 h-fit min-w-[76px] text-M/Bold'
                onClick={() => {}}
              >
                번역
              </button>
            </div>
          </section>
          <section className='flex h-[378px] justify-center rounded-b-[16px] bg-grey-100'>
            <div className='flex flex-col items-center justify-center'>
              <ReactSVG src='/assets/icons/outlined/Translation.svg' />
              <p className='pt-4 text-L/Medium text-grey-800'>
                번역할 키워드를 입력해주세요.
              </p>
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
