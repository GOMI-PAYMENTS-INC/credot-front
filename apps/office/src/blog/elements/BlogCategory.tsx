import { CardList } from '@/blog/elements';
import { useParams } from 'react-router-dom';

export const BlogCategory = () => {
  const { id } = useParams();

  return (
    <section>
      <CardList listType='extend' title={id as TCategory} />
    </section>
  );
};
