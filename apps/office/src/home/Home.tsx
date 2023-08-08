import 'swiper/swiper.min.css';
import { FAQ } from '@/common';
import { HackleExperiment, useVariation, HackleVariation } from '@hackler/react-sdk';

import {
  Header,
  Promotion,
  Efficient,
  Partner,
  EcommerceMargin,
  InsightFunctions,
} from '@/home/elements';
import { _introPageIntroPageViewed } from '@/amplitude/amplitude.service';
import { PAGE_CATEGORY } from '@/amplitude/amplitude.enum';
import { HOME_QNA } from '@/common/constants';
import { useEffect } from 'react';

const Intro = () => {
  const IMG_PATH = '/assets/images';

  useEffect(() => {
    _introPageIntroPageViewed(PAGE_CATEGORY.MAIN, window.location.href);
  }, []);

  const varidation = Math.floor(Math.random() * 1000) % 2 === 0 ? 'A' : 'B';

  return (
    <HackleExperiment experimentKey={5}>
      <HackleVariation variation={'A'}>
        <main>
          <Header varidation={varidation} />
          <EcommerceMargin imagePath={IMG_PATH} />
          <InsightFunctions varidation={varidation} imagePath={IMG_PATH} />
          <Partner imagePath={IMG_PATH} />
          <Efficient imagePath={IMG_PATH} />
          <Promotion imagePath={IMG_PATH} />
          <FAQ list={HOME_QNA} />
        </main>
      </HackleVariation>

      <HackleVariation variation={'B'}>
        <main>
          <Header varidation={varidation} />
          <EcommerceMargin imagePath={IMG_PATH} />
          <InsightFunctions varidation={varidation} imagePath={IMG_PATH} />
          <Partner imagePath={IMG_PATH} />
          <Efficient imagePath={IMG_PATH} />
          <Promotion imagePath={IMG_PATH} />
          <FAQ list={HOME_QNA} />
        </main>
      </HackleVariation>
    </HackleExperiment>
  );
};
export default Intro;
