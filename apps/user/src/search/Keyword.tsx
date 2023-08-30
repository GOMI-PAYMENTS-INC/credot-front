import { NSearchKeywords } from './NSearchKeywords';
import SearchKeywords from '@/search/SearchKeywords';
import { useRecoilValue } from 'recoil';
import { HackleAtom } from '@/atom/common/hackle.atom';

const Keyword = () => {
  const hackleState = useRecoilValue(HackleAtom);

  return hackleState.hackleId === 'A' ? <SearchKeywords /> : <NSearchKeywords />;
  // return <SearchKeywords />;
};
export default Keyword;
