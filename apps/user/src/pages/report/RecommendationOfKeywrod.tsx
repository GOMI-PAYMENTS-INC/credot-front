import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

export const RecommendationOfKeyword = () => {
  return (
    <section>
      <h1 className='text-XL/Bold text-black'>
        추천 키워드
        <ReactSVG
          id='anchor-recommandation-keyword'
          src='/assets/icons/outlined/QuestionCircle.svg'
          className='inline-block pl-[7px]'
        />
        <Tooltip
          anchorId='anchor-recommandation-keyword'
          html='채워넣어보자구 : ).'
          place='right'
          className='text-XS/Regular text-grey-800'
        />
      </h1>

      <table className=' col-span-full mt-6 h-full w-full  table-auto bg-white'>
        <thead className='h-[54px] border-t-[1px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
          <tr>
            <th className='w-[302px] text-left' colSpan={1}>
              <p className=' pl-3 text-XS/Medium'>키워드</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-4  text-XS/Medium'>검색량</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-4  text-XS/Medium'>노출 경쟁</p>
            </th>
            <th className='w-[82px] ' colSpan={1}>
              <p className='px-[13px] text-XS/Medium'>CPC 경쟁</p>
            </th>
            <th className='w-[72px]' colSpan={1}>
              <p className='px-1 text-XS/Medium'>노출 경쟁률</p>
            </th>
            <th className='w-[104px]' colSpan={1}>
              <div className='px-3 text-right text-XS/Medium'>
                <p>검색량</p>
                <hr className='ml-[62px] border-grey-300' />
                <p>경쟁상품 수</p>
              </div>
            </th>
            <th className='w-[72px]' colSpan={1}>
              <p className='px-[10px] text-XS/Medium'>CPC 비율</p>
            </th>
            <th className='w-[104px]' colSpan={1}>
              <div className='px-3 text-right text-XS/Medium'>
                <p>CPC</p>
                <hr className='ml-[62px] border-grey-300' />
                <p>평균 판매가</p>
              </div>
            </th>
            <th className='w-[40px]' colSpan={1}></th>
            <th className='w-[40px]' colSpan={1}></th>
          </tr>
        </thead>

        <tbody>
          <tr className='border-[1px] border-grey-300'>
            <td>
              <div className='flex'>
                <ReactSVG
                  src='/assets/icons/filled/EmptyBox.svg'
                  className='ml-3 mr-[10px] flex h-10 w-10 items-center justify-center bg-grey-200'
                />
                <div className='flex w-[114px] justify-center self-center bg-grey-200'>
                  <p className='flex h-5 items-center text-XS/Medium text-grey-900'>
                    추천 키워드가 없어요.
                  </p>
                </div>
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
        </tbody>
      </table>
    </section>
  );
};
