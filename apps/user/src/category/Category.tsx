import { Default as Layout } from '@/common/layouts';
import { Selector } from '@/report/keyword/elements/Selector';
import Pagination from '@/components/Pagination/Pagination';
import { ProductsTable } from '@/category/elements/ProductsTable';

import { useEffect, useState } from 'react';

import { convertCountryIconPath } from '@/utils/convertEnum';
import {
  updateCategoryPayload,
  _getCategoryProducts,
  _setSearchState,
  updateTable,
  getBaseDate,
} from '@/category/container';

import { convertCountry } from '@/utils/convertEnum';
import { COUNTRY } from '@/search/constants';
import { CATEGORY_STATE } from '@/category/constants';

const Category = () => {
  const [searchState, setSearchState] = useState<TCategorySearchType>(CATEGORY_STATE);
  const [pagination, setPagination] = useState<TPagination>({ bundle: 10, page: 1 });
  const [tableData, setTableData] = useState<TCategoryTableData>({
    tableData: [],
    printTable: [],
  });

  useEffect(() => {
    if (searchState.category.code === '') _setSearchState(setSearchState);

    _getCategoryProducts(searchState, pagination, setTableData);
  }, [searchState.category.code, searchState.country]);

  const updatedAt = getBaseDate(searchState);

  return (
    <Layout useGap={true}>
      <div className='flex w-full justify-center'>
        <div className='w-[1320px]'>
          <section id='category_filter' className='mt-10'>
            <div className='flex justify-between'>
              <div className='flex gap-2.5 bg-grey-50 px-5 py-[14px]'>
                <Selector
                  minWidth={133}
                  value={convertCountry(searchState.country)}
                  isUseIcon={true}
                  iconPath={convertCountryIconPath(searchState.country)}
                  options={COUNTRY}
                  onClickOption={(value) =>
                    updateCategoryPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'country',
                      params: value as TSearchCountry,
                      calledByEvent: true,
                    })
                  }
                />
                <Selector
                  minWidth={436}
                  value={searchState.category.value}
                  isUseIcon={false}
                  options={searchState.categories}
                  onClickOption={(value) =>
                    updateCategoryPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'category',
                      params: value as string,
                      calledByEvent: true,
                    })
                  }
                />
              </div>
            </div>
          </section>
          <main className='h-fit'>
            <ProductsTable printTable={tableData.printTable} />
          </main>

          <div id='pagination' className='flex items-center justify-between'>
            <Selector
              minWidth={133}
              value={`${pagination.bundle}개씩`}
              isUseIcon={false}
              options={[10, 30, 50, 100].map((num) => ({
                value: num,
                text: `${num}개씩`,
              }))}
              onClickOption={(value) =>
                updateTable(
                  'bundle',
                  value as number,
                  pagination,
                  setPagination,
                  tableData,
                  setTableData,
                )
              }
            />
            <Pagination
              total={tableData.tableData.length}
              page={pagination.page}
              limit={pagination.bundle}
              setParams={(value: number) =>
                updateTable(
                  'page',
                  value as number,
                  pagination,
                  setPagination,
                  tableData,
                  setTableData,
                )
              }
            />
            <p>최신 업데이트 : {updatedAt}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
