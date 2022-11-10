import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '@/pages/home/home.page';
import SearchResultPage from '@/pages/search-result/search-result.page';
import SignInPage from '@/pages/sign-in/sign-in.page';
import { Paths } from '@/router/paths';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Paths.home} element={<HomePage />} />
      <Route path={Paths.signIn} element={<SignInPage />} />
      <Route path={Paths.searchResult} element={<SearchResultPage />} />
    </Routes>
  </BrowserRouter>
);
