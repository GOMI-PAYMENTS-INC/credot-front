import { Default as Layout } from '@/common/layouts';
import { Keyword, NoneKeyword, SearchObject } from '@/search/newSearch/elements';
import { getQueryResult } from '@/search/api';

import { useForm } from 'react-hook-form';
import { CountryType, SORTING_TYPE } from '@/search/newSearch/constants';

import { SearchTooltips } from '@/search/elements/Tooltip';

export const NSearchKeywords = () => {
  const { Search } = SearchTooltips();
  const { register, getValues, setValue, watch } = useForm<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      country: CountryType.VN,
      sortBy: SORTING_TYPE[1].value,
    },
  });

  return (
    <Layout>
      <div className='flex h-full w-full flex-col items-center bg-grey-50'>
        <div className='absolute right-0 bottom-0 block '>
          <img src='/assets/images/NBackground.png' />
        </div>
        <section className='mx-[192px] h-full max-w-[1060px] overflow-hidden pt-[128px]'>
          <SearchObject tooltip={Search} register={register} />

          <div id='result' className='mt-[30px] flex w-full'>
            <NoneKeyword />
          </div>
        </section>
      </div>
    </Layout>
  );
};
