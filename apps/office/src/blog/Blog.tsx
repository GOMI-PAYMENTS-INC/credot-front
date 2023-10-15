import { KeywordContent } from '@/common';

import { CATEGORY_LIST } from '@/blog/constants';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getPath } from '@/blog/container';
import { checkUserDevice } from '@/utils/checkUserDevice';

const Blog = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDevice = checkUserDevice();

  return (
    <section id='blog_frame' className='flex w-full flex-col items-center justify-center'>
      <div
        id='category_gnb'
        className='sticky top-20 z-30 w-full gap-x-[25px] border-b-[1px] bg-white pl-[300px] text-start text-M/Medium md:hidden'
      >
        {
          <div className='w-[1300px] pl-[300px] lg:w-[] sm:w-[300px] sm:pl-0'>
            {
              // (pathname.includes('content') || isDevice) &&
              CATEGORY_LIST.map((category) => {
                const underLine = pathname.includes(category.path)
                  ? 'border-b-orange-400 '
                  : 'border-b-white';
                return (
                  <button
                    key={category.path}
                    onClick={() => {
                      const path = getPath(pathname, category.path);
                      navigate(path);
                    }}
                  >
                    <p
                      key={category.path}
                      className={`w-[140px] cursor-pointer border-b-[2px] pt-[14px] pb-3 ${underLine}`}
                    >
                      {category.text}
                    </p>
                  </button>
                );
              })
            }
          </div>
        }
      </div>
      <div
        id='blog_background'
        className=' absolute top-10 h-[400px] w-full bg-gradient-to-b from-orange-100 to-white'
      />
      <div className='relative mt-[60px] flex w-[1144px] flex-col gap-[120px] md:w-auto'>
        <Outlet />
      </div>
      <div className='mt-[100px] w-full'>
        <KeywordContent />
      </div>
    </section>
  );
};
export default Blog;
