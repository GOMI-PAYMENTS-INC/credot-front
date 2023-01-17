import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layouts/layout';
import HomePage from '@/pages/home/home.page';
import { Paths } from '@/router/paths';

export const Router = () => (
  <>
    <Layout>
      <Routes>
        <Route path={Paths.home} element={<HomePage />} />
      </Routes>
    </Layout>
  </>
);
