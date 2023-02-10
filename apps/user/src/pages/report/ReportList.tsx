import '@/pages/report/reportList.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getReportList } from '@/containers/report/report.container';
import { PATH } from '@/router/routeList';

const ReportList = () => {
  useEffect(() => {
    getReportList();
  }, []);

  const IMG_PATH = '../../assets/images';
  const navigate = useNavigate();
  return (
    <div className='col-span-12'>
      <div className='col-span-6 mx-[px] mt-[3px] flex h-[84px] items-center '>
        <h1 className='break-keep text-L/Bold lg:text-2XL/Bold'>리포트 조회</h1>
        <h1 className='break-keep pl-[12px] text-S/Bold text-grey-500 lg:text-2XL/Bold'>
          조회할 키워드 리포트를 선택해주세요.
        </h1>
      </div>
      {/* 테이블 */}
      <div className='col-span-12 mt-[24px] flex h-[670px] flex-col rounded border border-grey-300'>
        <div className='flex h-[68px] items-center justify-between '>
          <h1 className='ml-[16px] break-keep text-M/Medium lg:text-2XL/Bold'>총 0개</h1>
          <button className='mr-[16px] h-[40px] w-[72px] rounded-md border-none bg-grey-300 text-M/Medium text-grey-500'>
            선택 삭제
          </button>
        </div>
        <table className='col-span-12 h-full w-full bg-white'>
          <thead className='h-[40px] border-t border-b border-grey-300 text-left text-XS/Medium'>
            <tr>
              <th className='w-[56px] text-center' colSpan={1}>
                <input type='checkbox' />
              </th>
              <th className='w-[556px]' colSpan={2}>
                검색어
              </th>
              <th className='w-[128px]' colSpan={1}>
                데이터 수집 상태
              </th>
              <th className='w-[128px]' colSpan={1}>
                국가
              </th>
              <th className='w-[128px]' colSpan={1}>
                쇼핑몰
              </th>
              <th className='w-[128px]' colSpan={1}>
                리포트 생성일
              </th>
              <th className='w-[56px]' colSpan={1} />
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={8} className='h-[100%]'>
                <div className='grid justify-items-center text-center'>
                  <img src={`${IMG_PATH}/EmptyBox.png`} />
                  <div className='mt-[16px] text-L/Medium leading-7'>
                    <h1>조회 가능한 리포트가 없어요.</h1>
                    <h1>키워드를 검색하여 리포트를 생성해보세요.</h1>
                  </div>
                  <button
                    onClick={() => navigate(PATH.SEARCH_PRODUCTS)}
                    className='mt-[40px] h-[48px] w-[160px] rounded-md border border-[#FF5100] text-S/Bold text-[#FF5100]'
                  >
                    키워드 검색하기
                  </button>
                </div>
              </td>
              {/* <td>1 row</td>
              <td colSpan={2}>검색어 입니다. 길이가</td>
              <td>4 row</td>
              <td>5 row</td>
              <td>6 row</td>
              <td>7 row</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportList;
