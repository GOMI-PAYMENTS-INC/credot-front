import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchResultContainer } from '@/containers/search/search-result.container';
import { Paths } from '@/router/paths';

const SearchForm = () => {
  const { keywordParam } = SearchResultContainer();
  const [keyword, setKeyword] = useState(keywordParam);
  const navigate = useNavigate();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const onKeyPress = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }
    navigate(`${Paths.searchResult}?keyword=${keyword}`);
  };

  return (
    <div className='flex w-full min-w-[40rem] gap-2 '>
      <div className='h-[4.5rem] w-[10.5rem] shrink-0'>
        <select className='h-full w-full rounded border border-grey-400 px-3'>
          <option>베트남</option>
        </select>
      </div>
      <div className='h-[4.5rem] w-[10.5rem] shrink-0'>
        <select className='h-full w-full rounded border border-grey-400 px-3'>
          <option>쇼피</option>
        </select>
      </div>
      <div className='h-[4.5rem] w-full'>
        <input
          className='h-full w-full rounded border border-grey-400 px-3'
          placeholder='비타민'
          onKeyUp={(e) => onKeyPress(e)}
          onChange={onChangeInput}
          value={String(keyword)}
        />
      </div>
    </div>
  );
};
export default SearchForm;
