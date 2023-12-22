import { isMobile } from 'react-device-detect';

import { Default } from '@/v3/layouts';
import { MHome } from '@/v3/pages/home/MHome';
import { PCHome } from '@/v3/pages/home/PCHome';

export const Home = () => {
  return <Default>{!isMobile ? <PCHome /> : <MHome />}</Default>;
};
