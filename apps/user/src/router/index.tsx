import { Route, Routes, useLocation } from 'react-router-dom';

import HomePage from '@/pages/home/home.page';
import SearchResultPage from '@/pages/search/search-result.page';
import { Paths } from '@/router/paths';

import Account from './account';

export const Router = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path={Paths.home} element={<HomePage />} />
      <Route path={Paths.account} element={<Account location={location} />} />
      <Route path={Paths.searchResult} element={<SearchResultPage />} />
    </Routes>
  );
};
