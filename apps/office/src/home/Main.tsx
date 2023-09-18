import 'swiper/swiper.min.css';
import { FAQ } from '@/common';

import {
  Header,
  Promotion,
  Efficient,
  Partner,
  EcommerceMargin,
  InsightFunctions,
} from '@/home/elements';

import { _introPageIntroPageViewed } from '@/amplitude/amplitude.service';
import { useLocation } from 'react-router-dom';
import { HOME_QNA } from '@/common/constants';
import { useEffect } from 'react';

const Main = () => {
  const { pathname } = useLocation();
  const IMG_PATH = '/assets/images';

  useEffect(() => {
    _introPageIntroPageViewed(pathname, window.location.href);
  }, []);

  return (
    <main>
      <Header />
      <EcommerceMargin imagePath={IMG_PATH} />
      <InsightFunctions imagePath={IMG_PATH} />
      <Partner imagePath={IMG_PATH} />
      <Efficient imagePath={IMG_PATH} />
      {/* <Promotion imagePath={IMG_PATH} /> */}
      <FAQ list={HOME_QNA} />
    </main>
  );
};
export default Main;
