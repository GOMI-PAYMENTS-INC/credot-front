import { Default as Layout } from '@/common/layouts';
import { Selector } from '@/report/keyword/elements/Selector';
import Pagination from '@/components/pagination';
import { ProductsTable } from '@/category/elements/ProductsTable';

import { useState } from 'react';
import { CATEGORY_STATE } from '@/category';

import { convertCountryIconPath } from '@/utils/convertEnum';
import { updateCategoryPayload } from '@/category/container';

import { convertCountry } from '@/utils/convertEnum';

import { COUNTRY } from '@/search/constants';
import { CATEGORIES } from '@/category/constants';

const Category = () => {
  const [searchState, setSearchState] = useState<TCategorySearchType>(CATEGORY_STATE);

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
                  onClickOption={(value) => {
                    return updateCategoryPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'country',
                      params: value as TSearchCountry,
                      calledByEvent: true,
                    });
                  }}
                />
                <Selector
                  minWidth={436}
                  value={searchState.category}
                  isUseIcon={false}
                  options={CATEGORIES}
                  onClickOption={(value) => {
                    return updateCategoryPayload({
                      _state: searchState,
                      _dispatch: setSearchState,
                      key: 'category',
                      params: value as string,
                      calledByEvent: true,
                    });
                  }}
                />
              </div>
              <p className='self-end text-S/Medium'>
                <span className=' text-orange-400'>‘키워드'</span>를 클릭하여 보다 자세한
                리포트를 확인하세요.
              </p>
            </div>
          </section>
          <main className='h-fit'>
            <ProductsTable />
          </main>
          <div id='pagination' className='flex items-center justify-between'>
            <Selector
              minWidth={133}
              value={`${10}개씩`}
              isUseIcon={false}
              options={[10, 30, 50, 100].map((num) => ({
                value: num,
                text: `${num}개씩`,
              }))}
              onClickOption={(value) => {
                console.log(value, 'value');
              }}
            />
            <Pagination
              total={100}
              page={1}
              limit={10}
              _dispatch={() => {}}
              setParams={() => {}}
            />
            <p>최신 업데이트 : 2023.09.23</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
