import { Default as Layout } from '@/common/layouts';
import { Selector } from '@/report/keyword/elements/Selector';
import Pagination from '@/components/Pagination/Pagination';
import { ProductsTable } from '@/category/elements/ProductsTable';

import { useState } from 'react';
import { CATEGORY_STATE } from '@/category';

import { convertCountryIconPath } from '@/utils/convertEnum';
import { updateCategoryPayload, updatePagination } from '@/category/container';

import { convertCountry } from '@/utils/convertEnum';

import { COUNTRY } from '@/search/constants';
import { CATEGORIES } from '@/category/constants';

const Category = () => {
  const [searchState, setSearchState] = useState<TCategorySearchType>(CATEGORY_STATE);
  const [pagination, setPagination] = useState<TPagination>({ bundle: 10, page: 1 });

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
                  selectStyle={'h-[60px] items-center flex'}
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
                  value={searchState.category}
                  isUseIcon={false}
                  options={CATEGORIES}
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
            <ProductsTable />
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
                updatePagination('bundle', value as number, pagination, setPagination)
              }
            />
            <Pagination
              total={100}
              page={pagination.page}
              limit={pagination.bundle}
              setParams={(value: number) =>
                updatePagination('page', value, pagination, setPagination)
              }
            />
            <p>최신 업데이트 : 2023.09.23</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
