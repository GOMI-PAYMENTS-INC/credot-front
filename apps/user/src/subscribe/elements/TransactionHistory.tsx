import { DATA } from '@/subscribe/container';
import { isFalsy } from '@/utils/isFalsy';
import { formatNumber } from '@/utils/formatNumber';

export const TransactionHistory = () => {
  return (
    <div className='mt-[60px] w-full'>
      <p className='text-2XL/Bold'>결제 내역</p>
      <table className='mt-5 w-full table-auto rounded-t-xl border-y-[2px] border-x-[1px] border-grey-300'>
        <thead className='h-[52px] divide-x-2 bg-grey-200'>
          <tr id='table-header' className='text-M/Bold text-grey-800'>
            <th>결제일시</th>
            <th>사용기간</th>
            <th>결제수단</th>
            <th>결제항목</th>
            <th>상태</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {isFalsy(DATA) ? (
            <tr>
              <th colSpan={6}>
                <p className='py-[14px] text-M/Regular text-grey-800'>
                  결제 내역이 없습니다.
                </p>
              </th>
            </tr>
          ) : (
            DATA.map((data, index) => {
              return (
                <tr key={index} className='h-[52px] text-center'>
                  <td>{data.createdAt}</td>
                  <td>{data.subscribeDate}</td>
                  <td>{data.creditCard}</td>
                  <td>{data.plan}</td>
                  <td>
                    {data.status ? (
                      <p>결제완료</p>
                    ) : (
                      <p className='text-red-600'>결제실패</p>
                    )}
                  </td>
                  <td>{formatNumber(data.price)} 원</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
