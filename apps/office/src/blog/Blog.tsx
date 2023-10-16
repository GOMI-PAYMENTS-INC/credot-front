import { KeywordContent } from '@/common';

import { CATEGORY_LIST, CONTENT_LIST } from '@/blog/constants';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { getPath } from '@/blog/container';
import { PATH } from '@/common/constants';
import { ReactSVG } from 'react-svg';

const Blog = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const bgStyle = pathname.includes('serp') ? 'bg-grey-100' : 'bg-white';
  return (
    <section id='blog_frame' className='flex w-full flex-col items-center justify-center'>
      <div
        id='category_gnb'
        className={`sticky top-20 z-30 w-full gap-x-[25px] border-b-[1px] ${bgStyle} pl-[300px] text-start text-M/Medium md:hidden`}
      >
        {pathname.includes('serp') ? (
          <div className='w-[1300px] py-2 pl-[300px] sm:w-[300px] sm:pl-0'>
            {CONTENT_LIST.map((content) => {
              return (
                <div className='flex items-center text-center text-S/Medium'>
                  <Link to={PATH.BLOG}>
                    <p className='text-grey-700'>블로그</p>
                  </Link>
                  <ReactSVG
                    src='/assets/icons/ArrowRightSmall.svg'
                    beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-600')}
                  />
                  <Link to={`${PATH.BLOG}/category/${content.category}`}>
                    <p className='text-grey-700'>인사이트</p>
                  </Link>
                  <ReactSVG
                    src='/assets/icons/ArrowRightSmall.svg'
                    beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-600')}
                  />
                  <p key={content.path} className={`text-orange-400`}>
                    {content.text}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='w-[1300px] pl-[300px] sm:w-[300px] sm:pl-0'>
            {CATEGORY_LIST.map((category) => {
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
            })}
          </div>
        )}
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
