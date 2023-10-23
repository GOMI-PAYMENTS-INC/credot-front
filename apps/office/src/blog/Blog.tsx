import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { _blogContentViewed } from '@/amplitude/amplitude.service';
import { getPath } from '@/blog/container';
import { getBreadcrumb } from '@/blog/container';
import { KeywordContent } from '@/common';
import { PATH } from '@/common/constants';

const Blog = () => {
  // const navigate = useNavigate();
  const { pathname } = useLocation();
  const bgStyle = pathname.includes('serp') ? 'bg-grey-100' : 'bg-white';
  const isContentPage = pathname.includes('insight/') ? getBreadcrumb(pathname) : false;

  useEffect(() => {
    if (isContentPage) {
      const payload = {
        text: isContentPage.text,
        contentId: isContentPage.id,
        category: isContentPage.category as TCategory,
      };
      _blogContentViewed(payload);
    }
  }, [pathname]);

  return (
    <section id='blog_frame' className='flex w-full flex-col items-center justify-center'>
      <div
        id='category_gnb'
        className={`sticky top-20 z-30 w-full gap-x-[25px] border-b-[1px] ${bgStyle} pl-[300px] text-start text-M/Medium md:hidden`}
      >
        {isContentPage !== false && (
          <div className='w-[1300px] py-2 pl-[300px] sm:w-[300px] sm:pl-0'>
            <div className='flex items-center text-center text-S/Medium'>
              <Link to={PATH.BLOG}>
                <p className='text-grey-700'>블로그</p>
              </Link>
              <ReactSVG
                src='/assets/icons/ArrowRightSmall.svg'
                beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-600')}
              />
              {/* <Link to={`${PATH.BLOG}/apply/${isContentPage?.apply}`}>
                <p className='text-grey-700'>인사이트</p>
              </Link>
              <ReactSVG
                src='/assets/icons/ArrowRightSmall.svg'
                beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-600')}
              /> */}
              <p className={`text-orange-400`}>{isContentPage?.text}</p>
            </div>
          </div>
        )}
      </div>
      {/* <div className='w-[1300px] py-2 pl-[300px] sm:w-[300px] sm:pl-0'>
             {CONTENT_LIST.map((content) => {
               return (
                 <div
                   key={content.text}
                   className='flex items-center text-center text-S/Medium'
                 >
                   <Link to={PATH.BLOG}>
                     <p className='text-grey-700'>블로그</p>
                   </Link>
                   <ReactSVG
                     src='/assets/icons/ArrowRightSmall.svg'
                     beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-600')}
                   />
                   <Link to={`${PATH.BLOG}/apply/${content.apply}`}>
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
             {CATEGORY_LIST.map((apply) => {
               const underLine = pathname.includes(apply.path)
                 ? 'border-b-orange-400 '
                 : 'border-b-white';
               return (
                 <button
                   key={apply.path}
                   onClick={() => {
                     const path = getPath(pathname, apply.path);
                     navigate(path);
                   }}
                 >
                   <p
                     key={apply.path}
                     className={`w-[140px] cursor-pointer border-b-[2px] pt-[14px] pb-3 ${underLine}`}
                   >
                     {apply.text}
                   </p>
                 </button>
               );
             })}
           </div>
         )}
       </div> */}

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
