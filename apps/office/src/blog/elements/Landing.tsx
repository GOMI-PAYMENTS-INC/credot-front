import { Card, CardList } from '@/blog/elements';
import { CONTENT_LIST } from '@/blog/constants';

export const Landing = () => {
  const [main] = CONTENT_LIST;
  return (
    <div id='landing_frame' className='flex flex-col gap-[100px]'>
      <Card content={main} type='main' />
      <CardList contents={CONTENT_LIST} listType='extend' title='insight' />
      {/* <CardList title='product' />
      <CardList title='news' /> */}
    </div>
  );
};
