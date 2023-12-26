import { isMobile } from 'react-device-detect';

import { Default } from '@/v3/layouts';
import { MHistory } from '@/v3/pages/history/MHistory';
import { PCHistory } from '@/v3/pages/history/PCHistory';

export const History = () => {
  return <Default>{isMobile ? <MHistory /> : <PCHistory />}</Default>;
};
