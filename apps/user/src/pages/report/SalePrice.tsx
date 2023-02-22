import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { TITLE } from '@/types/enum.code';
import { SalePriceChart } from './SalePriceChart';
import { openBrowser } from '@/containers/report';

export const SalePrice = () => {
  return (
    <section className='col-span-full'>
      <h1 id={TITLE.SALE_PRICE} className='detailReport-h1-header'>
        판매 가격
      </h1>
      <div className='pt-6'>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='col-span-2 '>
            <div className='flex bg-grey-100'>
              <div className='py-2.5 pl-5 '>
                <p className='text-S/Medium text-grey-900'>판매가 정보</p>
              </div>
              <ReactSVG
                id='anchor-market-evaluation'
                src='/assets/icons/outlined/QuestionCircle.svg'
                className='pl-[5px]'
              />
              <Tooltip
                anchorId='anchor-market-evaluation'
                place='right'
                style={{ background: 'none', opacity: 1 }}
                clickable={true}
                delayHide={1300}
              ></Tooltip>
            </div>
            <div className='flex flex-col space-x-5'>
              <div className='flex flex-col py-9 pl-5'>
                <p className=' text-S/Medium text-grey-800'>최저가</p>
                <div className='flex items-center pt-[11px]'>
                  <p className='text-2XL/Bold text-orange-500'>24,634</p>
                  <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                </div>
              </div>
            </div>
            <div className='mx-5 flex flex-col border-t-[1px] border-b-[1px] border-dashed py-9'>
              <p className='text-S/Medium text-grey-800'>평균 판매가</p>
              <div className='flex items-center pt-[11px]'>
                <p className='text-2XL/Bold text-grey-900'>44,634</p>
                <span className='pl-1 text-L/Medium text-grey-800'>원</span>
              </div>
            </div>
            <div className='mx-5 flex flex-col py-9'>
              <p className='text-S/Medium text-grey-800'>최고가</p>
              <div className='flex items-center pt-[11px]'>
                <p className='text-2XL/Regular text-grey-900'>88,634</p>
                <span className='pl-1 text-L/Medium text-grey-800'>원</span>
              </div>
            </div>
          </div>
          <div className='col-span-8 col-start-3 h-full border-l-[1px] border-grey-300'>
            <div className='flex bg-grey-100'>
              <div className='py-2.5 pl-5 '>
                <p className='text-S/Medium text-grey-900'>판매가 분포 차트</p>
              </div>
              <ReactSVG
                id='anchor-market-evaluation'
                src='/assets/icons/outlined/QuestionCircle.svg'
                className='pl-[5px]'
              />
              <Tooltip
                anchorId='anchor-market-evaluation'
                place='right'
                style={{ background: 'none', opacity: 1 }}
                clickable={true}
                delayHide={1300}
              ></Tooltip>
            </div>
            <div className='flex h-full  items-center justify-center'>
              <div className='w-full max-w-[680px]'>
                <SalePriceChart />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[30px] flex w-fit rounded-[8px] bg-grey-200'>
          <div className='flex space-x-2 px-1 py-1'>
            <div className='cursor-pointer rounded bg-white'>
              <p className='px-2 py-2 text-S/Bold'>
                가격경쟁력 높은 상품 <span className='text-orange-500'>{' 10'}</span>
              </p>
            </div>
            <div className='cursor-pointer rounded bg-white'>
              <p className='px-2 py-2 text-S/Bold'>
                가격경쟁력 보통 상품 <span className='text-orange-500'>{' 30'}</span>
              </p>
            </div>
            <div className='cursor-pointer rounded bg-white'>
              <p className='px-2 py-2 text-S/Bold'>
                가격경쟁력 낮은 상품 <span className='text-orange-500'>{' 10'}</span>
              </p>
            </div>
          </div>
        </div>

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
      </div>
    </section>
  );
};
