import { CardList } from '@/blog/elements';
import { useParams } from 'react-router-dom';

export const BlogCategory = () => {
  const { id } = useParams();

  return (
    <section className='w-full overflow-x-hidden'>
      <div className='flex flex-col'>
        {/* <CardList listType='extend' title={id as TCategory} /> */}
      </div>
    </section>
  );
};
