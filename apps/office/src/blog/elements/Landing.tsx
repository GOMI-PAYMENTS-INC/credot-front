import { Card, CardList } from '@/blog/elements';

export const Landing = () => {
  return (
    <div id='landing_frame' className='flex flex-col gap-[100px]'>
      <Card type='main' />
      <CardList title='인사이트' />
      <CardList title='제품' />
      <CardList title='소식' />
    </div>
  );
};
