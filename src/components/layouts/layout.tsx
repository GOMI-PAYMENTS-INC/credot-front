import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { AuthContainer } from '@/containers/auth/auth.container';
import { Paths } from '@/router/paths';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLogin } = AuthContainer();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin && [Paths.signUp, Paths.signIn].includes(pathname)) {
      navigate(Paths.home);
    }
  }, [isLogin]);

  return (
    <>
      <Header />
      <main className='mt-[-5rem]'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
