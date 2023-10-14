import { Card, CardList } from '@/blog/elements';

export const Landing = () => {
  return (
    <div id='landing_frame' className='flex flex-col gap-[100px]'>
      <Card type='main' />
      <CardList title='insight' />
      <CardList title='product' />
      <CardList title='news' />
    </div>
  );
};
