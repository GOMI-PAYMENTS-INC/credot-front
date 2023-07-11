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
import { HOME_QNA } from '@/common/constants';
const Intro = () => {
  const IMG_PATH = '/assets/images';

  return (
    <main>
      <Header />
      <EcommerceMargin imagePath={IMG_PATH} />
      <InsightFunctions imagePath={IMG_PATH} />
      <Partner imagePath={IMG_PATH} />
      <Efficient imagePath={IMG_PATH} />
      <Promotion imagePath={IMG_PATH} />
      <FAQ list={HOME_QNA} />
    </main>
  );
};
export default Intro;
