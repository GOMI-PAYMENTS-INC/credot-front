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
      <FAQ />
    </main>
  );
};
export default Intro;
