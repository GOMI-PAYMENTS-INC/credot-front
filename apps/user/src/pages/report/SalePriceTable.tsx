import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { TITLE } from '@/types/enum.code';
import { SalePriceChart } from './SalePriceChart';
import { openBrowser } from '@/containers/report';
import { formatNumber } from '@/utils/formatNumber';
import { convertExachangeRate, roundNumber } from '@/containers/report';

interface ISalePriceTable {
  salePriceTableProps: TSalePriceData;
}

export const SalePriceTable = (props: ISalePriceTable) => {
  return (
    <table className=' col-span-full mt-[27px] h-full w-full  table-auto bg-white'>
      <thead className='h-[54px] border-t-[1px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
        <tr>
          <th className='w-[424px] text-left' colSpan={1}>
            <p className=' pl-3 text-XS/Medium'>상품</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='px-4  text-XS/Medium'>판매가</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='px-4  text-XS/Medium'>최근 30일 매출</p>
          </th>
          <th className='w-[120px] text-right' colSpan={1}>
            <p className='px-[13px] text-XS/Medium'>최근 30일 판매량</p>
          </th>
          <th className='w-[100px] text-right' colSpan={1}>
            <p className='px-1 text-XS/Medium'>노출 순위</p>
          </th>
          <th className='w-[80px] text-right' colSpan={1}></th>
        </tr>
      </thead>
      <tbody className=''>
        <tr className='border-[1px] border-grey-300 text-right'>
          <td>
            <div className='flex items-center '>
              <div className='ml-4 h-14 w-14 bg-grey-500'></div>
              <div className=' py-4'>
                <p className=' pl-[11px] text-left text-S/Regular text-grey-900'>
                  Kem Nâng Tông Greyground Moisture Whitening Cream
                </p>
              </div>
            </div>
          </td>
          <td></td>
          <td>
            <div className='flex justify-end'>
              <p>44,634</p>
              <span>원</span>
            </div>
          </td>

          <td>
            <div className='flex justify-end'>
              <p>1,234</p>
              <span>개</span>
            </div>
          </td>
          <td>
            <div className='flex justify-end'>
              <p>24</p>
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
      </tbody>
    </table>
  );
};
