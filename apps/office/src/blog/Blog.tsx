import { KeywordContent } from '@/common';
import { Landing } from '@/blog/elements';
const Blog = () => {
  return (
    <section
      id='blog_frame'
      className='flex w-full flex-col items-center justify-center gap-[120px]'
    >
      <div className='mt-[60px] flex w-[1144px] flex-col'>
        <Landing />
      </div>
      <KeywordContent />
    </section>
  );
};
export default Blog;
