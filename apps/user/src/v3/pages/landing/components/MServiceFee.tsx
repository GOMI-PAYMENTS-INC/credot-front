export const MServiceFee = () => {
  return (
    <div className='py-[87px]'>
      <div className='mx-auto text-center'>
        <div className='text-2XL/Bold leading-[46px]'>
          요일별 선정산 일자 및 <br />{' '}
          <span className='text-purple-600'>서비스 수수료</span> 안내
        </div>
        <div className='mt-[30px] text-M/Regular leading-[32px] text-grey-900'>
          하단 자료는 일반 회원 등급 기준으로 작성되었으며, <br />
          서비스 수수료 및 카드사별 <br />
          정산 주기는 가맹점에 따라 달라질 수 있습니다.
        </div>

        <div className='mt-[80px] overflow-x-auto px-[16px]'>
          <table className='w-[1120px]'>
            <thead>
              <tr className='text-S/Bold text-grey-800'>
                <th className='w-[140px] rounded-tl-[8px] bg-purple-100 py-[15px]'>
                  매출 발생일
                </th>
                <th className='border-l border-white bg-purple-100 py-[15px]'>월</th>
                <th className='border-l border-white bg-purple-100 py-[15px]'>화</th>
                <th className='border-l border-white bg-purple-100 py-[15px]'>수</th>
                <th className='border-l border-white bg-purple-100 py-[15px]'>목</th>
                <th className='border-l border-white bg-purple-100 py-[15px]'>금</th>
                <th className='border-l border-white bg-purple-100 py-[15px]'>토</th>
                <th className='rounded-tr-[8px] border-l border-white bg-purple-100 py-[15px]'>
                  일
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-r border-grey-200 text-grey-800 text-grey-800'>
                <td className='w-[140px] bg-grey-100 py-[15px] text-M/Bold text-S/Bold'>
                  기존 정산일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px]'>3일 후</td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px]'>3일 후</td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px]'>5일 후</td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px]'>5일 후</td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px]'>5일 후</td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px]'>4일 후</td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px]'>3일 후</td>
              </tr>
              <tr className='border-b border-r border-grey-200 text-grey-800'>
                <td className='w-[140px] border-l border-grey-200 py-[15px] text-S/Bold'>
                  선정산일
                </td>
                <td className='border-l border-grey-200 py-[15px] text-S/Bold text-purple-600'>
                  1일 후
                </td>
                <td className='border-l border-grey-200 py-[15px] text-S/Bold text-purple-600'>
                  1일 후
                </td>
                <td className='border-l border-grey-200 py-[15px] text-S/Bold text-purple-600'>
                  1일 후
                </td>
                <td className='border-l border-grey-200 py-[15px] text-S/Bold text-purple-600'>
                  1일 후
                </td>
                <td className='border-l border-grey-200 py-[15px] text-S/Bold text-purple-600'>
                  1일 후
                </td>
                <td className='border-l border-grey-200 py-[15px] text-S/Bold text-purple-600'>
                  1일 후
                </td>
                <td className='border-l border-grey-200 py-[15px] text-S/Bold text-purple-600'>
                  1일 후
                </td>
              </tr>
              <tr className='border-r border-grey-200 text-grey-800 text-grey-800'>
                <td className='w-[140px] bg-grey-100 py-[15px] text-S/Bold'>
                  기존 단축일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px] text-purple-600'>
                  -2일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px] text-purple-600'>
                  -2일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px] text-purple-600'>
                  -4일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px] text-purple-600'>
                  -4일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px] text-purple-600'>
                  -4일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px] text-purple-600'>
                  -3일
                </td>
                <td className='border-l border-grey-200 bg-grey-100 py-[15px] text-purple-600'>
                  -2일
                </td>
              </tr>
              <tr className='border-b border-r border-grey-200 text-grey-800'>
                <td className='w-[140px] rounded-bl-[8px] border-l border-grey-200 py-[15px] text-S/Bold'>
                  서비스 수수료
                </td>
                <td
                  className='rounded-br-[8px] border-l border-grey-200 py-[15px] text-purple-600'
                  colSpan={7}
                >
                  카드사 정산금 x 정산 단축일 x 0.1%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
