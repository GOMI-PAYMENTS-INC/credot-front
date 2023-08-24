import { NSearchKeywords } from './NSearchKeywords';
import SearchKeywords from '@/search/SearchKeywords';
import { useRecoilValue } from 'recoil';
import { HackleId } from '@/atom/common/hackle.atom';

const Keyword = () => {
  const hackleId = useRecoilValue(HackleId);
  return hackleId === 'A' ? <SearchKeywords /> : <NSearchKeywords />;
};
export default Keyword;
