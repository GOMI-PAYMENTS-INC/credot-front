import { Fragment, ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import { Footer, Header } from '@/layouts/elements';

interface LayoutProps {
  children?: ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <Fragment>
    <Header />
    <div className='mt-20'>{children}</div>
    <Footer />
    <button
      className='fixed right-[60px] bottom-[100px] flex h-11 w-11 items-center justify-center rounded-[40px] border-[1px] border-grey-300 bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)]'
      onClick={() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }}
    >
      <ReactSVG src='/assets/icons/ToTop.svg' />
    </button>
  </Fragment>
);
export default Layout;
