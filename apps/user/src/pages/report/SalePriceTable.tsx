import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { TITLE } from '@/types/enum.code';
import { SalePriceChart } from './SalePriceChart';
import { openBrowser } from '@/containers/report';
import { formatNumber } from '@/utils/formatNumber';
import { convertExachangeRate, roundNumber } from '@/containers/report';

interface ISalePriceTable {
  salePriceItemList: TSalePriceItems[];
}

export const SalePriceTable = (props: ISalePriceTable) => {
  const { salePriceItemList } = props;
  return (
    <table
      id='scrollbar'
      className='col-span-full mt-[27px] block h-[436px] w-full overflow-y-auto bg-white'
    >
      <thead className='h-[54px] border-t-[1px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
        <tr>
          <th className='w-[424px] text-left' colSpan={1}>
            <p className=' pl-3 text-XS/Medium'>상품</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='px-4  text-XS/Medium'>판매가</p>
          </th>
          <th className='w-[128px] text-center' colSpan={1}>
            <p className='px-4  text-XS/Medium'>월 추정 매출</p>
          </th>
          <th className='w-[120px] text-center' colSpan={1}>
            <p className='px-[13px] text-XS/Medium'>월 판매량</p>
          </th>
          <th className='w-[100px] text-center' colSpan={1}>
            <p className='px-1 text-XS/Medium'>노출 순위</p>
          </th>
          <th className='w-[80px] text-right' colSpan={1}></th>
        </tr>
      </thead>
      <tbody>
        {salePriceItemList.map((item, idx) => {
          return (
            <tr
              className='border-[1px] border-grey-300 text-right'
              key={`${item.id}_${idx}`}
            >
              <td>
                <div className='flex items-center '>
                  <div className='my-2 ml-4 h-14 w-14 bg-grey-500'></div>
                  <div className=' py-4'>
                    <p className=' pl-[11px] text-left text-S/Regular text-grey-900'>
                      {item.itemName}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div className='flex flex-col flex-wrap-reverse py-3 pr-3'>
                  <div className='bordered flex h-5 w-[58px] justify-end '>
                    <p className='pl-0.5 text-XS/Medium'>
                      {formatNumber(item.itemPriceMin)}
                    </p>
                    <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                  </div>
                  <hr className='my-[3px] ml-[62px] border-grey-300' />
                  <div className='bordered flex h-5 w-[58px] justify-end '>
                    <p className='pl-0.5 text-XS/Medium'>
                      {formatNumber(item.itemPriceMax)}
                    </p>
                    <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                  </div>
                </div>
              </td>
              <td>
                <div className='flex justify-center'>
                  <p>{formatNumber(item.itemSales)}</p>
                  <span>원</span>
                </div>
              </td>

              <td>
                <div className='flex justify-center'>
                  <p>{item.item30daysSold}</p>
                  <span>개</span>
                </div>
              </td>
              <td>
                <div className='flex justify-center'>
                  <p>{item.rank}</p>
                  <span>위</span>
                </div>
              </td>
              <td>
                <div className='flex justify-center'>
                  <div
                    className='flex h-5 w-5 cursor-pointer items-center'
                    onClick={() => openBrowser(`https://shopee.vn/search?keyword=`)}
                  >
                    <ReactSVG className='' src='/assets/icons/outlined/Linkout.svg' />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
