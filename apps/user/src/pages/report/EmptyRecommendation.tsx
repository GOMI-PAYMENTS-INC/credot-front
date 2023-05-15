export const EmptyRecommendation = () => {
  return (
    <tr className='border-[1px] border-grey-300'>
      <td>
        <div className='ml-3 flex w-[114px] justify-center self-center bg-grey-200'>
          <p className='flex h-5 items-center text-XS/Medium text-grey-900'>
            추천 키워드가 없어요.
          </p>
        </div>
      </td>
      <th>
        <div className='flex justify-center'>
          <div className='bordered h-5 w-[58px] rounded-sm bg-grey-200'></div>
        </div>
      </th>
      <th>
        <div className='flex justify-center'>
          <div className='bordered h-5 w-[58px] rounded-sm bg-grey-200'></div>
        </div>
      </th>
      <th>
        <div className='flex justify-center'>
          <div className='bordered h-5 w-[58px] rounded-sm bg-grey-200'></div>
        </div>
      </th>
      <th className='bg-grey-100'>
        <div className='flex justify-center'>
          <div className='bordered h-5 w-[43px] rounded-sm bg-grey-300'></div>
        </div>
      </th>
      <th>
        <div className='flex flex-col flex-wrap-reverse py-3 pr-3'>
          <div className='bordered h-5 w-[58px] rounded-sm bg-grey-200'></div>
          <hr className='my-[3px] ml-[62px] border-grey-300' />
          <div className='bordered h-5 w-[58px] rounded-sm bg-grey-200'></div>
        </div>
      </th>
      <th className='bg-grey-100'>
        <div className='flex justify-center'>
          <div className='bordered h-5 w-[43px] rounded-sm bg-grey-300'></div>
        </div>
      </th>
      <th>
        <div className='flex flex-col flex-wrap-reverse py-3 pr-3'>
          <div className='bordered h-5 w-[58px] rounded-sm bg-grey-200'></div>
          <hr className='my-[3px] ml-[62px] border-grey-300' />
          <div className='bordered h-5 w-[58px] rounded-sm bg-grey-200'></div>
        </div>
      </th>
      <th>
        <div className='flex justify-center'>
          <div className='bordered h-5 w-5 rounded-sm bg-grey-200'></div>
        </div>
      </th>
      <th>
        <div className='flex justify-center'>
          <div className='bordered h-5 w-5 rounded-sm bg-grey-200'></div>
        </div>
      </th>
    </tr>
  );
};
