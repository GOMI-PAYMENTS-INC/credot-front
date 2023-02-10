import React, { Fragment } from 'react';
import '@/pages/report/reportList.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getReportList } from '@/containers/report/report.container';
import { PATH } from '@/router/routeList';
import { formatNumber } from '@/utils/formatNumber';

const ReportList = () => {
  useEffect(() => {
    getReportList();
  }, []);

  const IMG_PATH = '../../assets/images';
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className='absolute w-full px-[30px]'>
        <div className='flex h-[84px] items-center border border-t-0 border-b-gray-200 bg-white  px-6'>
          <div className='shrink-0'>
            <h1 className='text-XL/Medium text-grey-900'>리포트 조회</h1>
          </div>
          <div className='shrink-0'>
            <span className='pl-[12px] text-S/Medium text-grey-800'>
              조회할 키워드 리포트를 선택해주세요.
            </span>
          </div>
        </div>
      </div>
      <div className='col-span-full mt-[84px]'>
        {/* 테이블 */}
        <div className='col-span-full mt-[24px] flex h-[670px] flex-col rounded border border-grey-300'>
          <div className='flex h-[68px] items-center justify-between p-4'>
            <h1 className='text-M/Regular text-grey-800'>총 {formatNumber(0)}개</h1>
            <button
              className='button-filled-normal-medium-grey-false-false-true'
              disabled
            >
              선택 삭제
            </button>
          </div>
          <table className='col-span-full h-full w-full bg-white'>
            <thead className='h-[40px] border-t border-b border-grey-300 text-left'>
              <tr>
                <th className='w-[56px] text-center text-XS/Medium' colSpan={1}>
                  <input type='checkbox' id='allAgree' className='checkboxCustom peer' />
                  <label
                    htmlFor='allAgree'
                    className='checkboxCustom-label  bg-[length:20px_20px] bg-[left_50%_top_50%] text-transparent'
                  >
                    전체 선택
                  </label>
                </th>
                <th className='w-[556px]' colSpan={2}>
                  <div className='px-4 py-3 text-XS/Medium'>검색어</div>
                </th>
                <th className='w-[128px]' colSpan={1}>
                  <div className='px-4 py-3 text-XS/Medium'>데이터 수집 상태</div>
                </th>
                <th className='w-[128px]' colSpan={1}>
                  <div className='px-4 py-3 text-XS/Medium'>국가</div>
                </th>
                <th className='w-[128px]' colSpan={1}>
                  <div className='px-4 py-3 text-XS/Medium'>쇼핑몰</div>
                </th>
                <th className='w-[128px]' colSpan={1}>
                  <div className='px-4 py-3 text-XS/Medium'>리포트 생성일</div>
                </th>
                <th className='w-[56px]' colSpan={1}>
                  <div className='px-4 py-3 text-XS/Medium'></div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={8} className='h-[100%]'>
                  <div className='grid justify-items-center text-center'>
                    <img src={`${IMG_PATH}/EmptyBox.png`} alt='검색 결과 없음 아이콘' />
                    <div className='mt-4 text-L/Medium'>
                      <p>조회 가능한 리포트가 없어요.</p>
                      <p>키워드를 검색하여 리포트를 생성해보세요.</p>
                    </div>
                    <div className='mt-10'>
                      <button
                        onClick={() => navigate(PATH.SEARCH_PRODUCTS)}
                        className='button-outlined-normal-large-primary-false-false-true'
                      >
                        키워드 검색하기
                      </button>
                    </div>
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
    </Fragment>
  );
};

export default ReportList;
