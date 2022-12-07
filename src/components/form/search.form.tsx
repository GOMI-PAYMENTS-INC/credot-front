const SearchForm = () => (
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
      />
    </div>
  </div>
);

export default SearchForm;
