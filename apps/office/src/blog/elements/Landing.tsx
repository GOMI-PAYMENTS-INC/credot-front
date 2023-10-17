import { Card, CardList } from '@/blog/elements';
import { CONTENT_LIST } from '@/blog/constants';
import { useMemo } from 'react';

export const Landing = () => {
  const [main] = CONTENT_LIST;

  const { insightList, productList } = useMemo(() => {
    const insightList = CONTENT_LIST.filter((content) => content.category === 'insight');
    const productList = CONTENT_LIST.filter((content) => content.category === 'product');
    return { insightList, productList };
  }, []);
  return (
    <div id='landing_frame' className='flex flex-col gap-[100px]'>
      <Card content={main} type='main' />
      <CardList contents={insightList} title='insight' />
      <CardList contents={productList} title='product' />
      {/* <CardList title='news' />  */}
    </div>
  );
};
