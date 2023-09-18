import { isFalsy } from '@/utils/isFalsy';
import { formatNumber } from '@/utils/formatNumber';

import { useEffect, useState } from 'react';
import { insertDash, _getPayments } from '@/subscribe/container';
import { convertPlan } from '@/common/container';
import { convertTime, addTime } from '@/utils/parsingTimezone';
import { ReactSVG } from 'react-svg';
import { openBrowser } from '@/utils/openBrowser';

export const TransactionHistory = () => {
  const [bills, setBills] = useState<TPayments[]>([]);

  useEffect(() => {
    _getPayments(setBills);
    return () => {};
  }, []);

  return (
    <div className='mt-[60px] w-full'>
      <p className='text-2XL/Bold'>결제 내역</p>
      <table className='mt-5 block max-h-[416px] w-full table-auto overflow-hidden rounded-t-xl border-y-[2px] border-x-[1px] border-grey-300'>
        <thead className='h-[52px] divide-x-2 bg-grey-200'>
          <tr id='table-header' className='text-M/Bold text-grey-800'>
            <th className='w-[200px]'>결제일시</th>
            <th className='w-[200px]'>사용기간</th>
            <th className='w-[230px]'>결제수단</th>
            <th className='w-[162px]'>결제항목</th>
            <th className='w-[124px]'>상태</th>
            <th className='w-[124px]'>금액</th>
            <th className='w-[108px]'>영수증 보기</th>
          </tr>
        </thead>
        <tbody id='scrollbar' className='block max-h-[364px] w-full overflow-y-auto'>
          {isFalsy(bills) ? (
            <tr>
              <th colSpan={7} className='w-[1164px]'>
                <p className='py-[14px] text-M/Regular text-grey-800'>
                  결제 내역이 존재하지 않아요.
                </p>
              </th>
            </tr>
          ) : (
            bills.map((bill, index) => {
              return (
                <tr key={index} className='h-[52px] w-full border-b-[1px] text-center'>
                  <td className='w-[200px]'>
                    {convertTime(bill.paidAt, 'YYYY.MM.DD HH:mm:ss')}
                  </td>
                  <td className='w-[200px]'>
                    {`${convertTime(bill.paidAt, 'YYYY.MM.DD')} ~ 
                    ${addTime(bill.paidAt, 30, 'YYYY.MM.DD')}`}
                  </td>
                  <td className='w-[230px]'>
                    {bill.cardName.replace('카드', '')} {insertDash(bill.cardNumber)}
                  </td>
                  <td className='w-[162px]'>
                    {convertPlan(bill.name as TPlanUniqueKey)}
                  </td>
                  <td className='w-[124px]'>
                    {bill.status === 'paid' ? (
                      <p>결제완료</p>
                    ) : (
                      <p className='text-red-600'>결제실패</p>
                    )}
                  </td>
                  <td className='w-[124px]'>{formatNumber(bill.amount)} 원</td>
                  <td className='flex h-[52px] w-[108px] items-center justify-center'>
                    <button onClick={() => openBrowser(bill.receiptUrl)}>
                      <ReactSVG src='/assets/icons/filled/Bill.svg' />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
