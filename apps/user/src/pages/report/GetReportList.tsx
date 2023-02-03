import '@/pages/report/getReportList.css';
import { Fragment } from 'react';
import { ReportContainer } from '@/containers/report/report.container';

const GetReportList = () => {
  const IMG_PATH = '../../assets/images';
  return (
    <div className='col-span-12 w-[1180px]'>
      <div className='col-span-6 mx-[px] mt-[3px] flex h-[84px] items-center border border-gray-300'>
        <h1 className='break-keep text-L/Bold lg:text-2XL/Bold'>리포트 조회</h1>
        <h1 className='break-keep pl-[12px] text-S/Bold text-gray-500 lg:text-2XL/Bold'>
          조회할 키워드 리포트를 선택해주세요.
        </h1>
      </div>
      {/* 테이블 */}
      <div className='col-span-12 mt-[24px] h-[670px] rounded border border-gray-300'>
        <div className='flex h-[68px] items-center justify-between border border-sky-300'>
          <h1 className='ml-[16px] break-keep text-M/Medium lg:text-2XL/Bold'>총 0개</h1>
          <button className='btn-square btn mr-[16px] h-[30px] w-[72px] border-none bg-gray-300 text-M/Regular text-gray-500'>
            선택 삭제
          </button>
        </div>
        <table className='col-span-12 w-full border border-gray-300 bg-white'>
          <thead className='h-[40px] text-XS/Medium'>
            <tr>
              <th colSpan={1}>체크박스</th>
              <th colSpan={2}>검색어</th>
              <th colSpan={1}>데이터 수집 상태</th>
              <th colSpan={1}>국가</th>
              <th colSpan={1}>쇼핑몰</th>
              <th colSpan={1}>리포트 생성일</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={7}>
                <div>
                  <img src={`${IMG_PATH}/EmptyBox.png`} />
                  <div className='mt-[16px]  text-L/Medium'>
                    <h1>조회 가능한 리포트가 없어요.</h1>
                    <h1>키워드를 검색하여 리포트를 생성해보세요.</h1>
                  </div>
                  <button>키워드 검색하기</button>
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

export default GetReportList;
